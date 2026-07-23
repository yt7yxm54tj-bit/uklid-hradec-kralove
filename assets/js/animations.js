/* ============================================================
   Úklid Hradec Králové — animační vrstva (GSAP)
   Vzory převzaté ze šablony makléře (sablona-makler/app.js):
   hero stagger, line-mask reveal nadpisů, fade+slideUp karet,
   count-up čísel (trust bar + stats). Vše once, s fallbackem.
   ============================================================ */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ?noanim + navigator.webdriver: QA/automatizace → statický render bez animací
  var noAnim = /[?&]noanim/.test(location.search);
  var forceAnim = /[?&]forceanim/.test(location.search); // pro CDP ověření animací
  if (typeof gsap === "undefined" || ((reducedMotion || navigator.webdriver || noAnim) && !forceAnim)) return;

  gsap.registerPlugin(ScrollTrigger);
  var hasSplit = typeof SplitText !== "undefined";
  if (hasSplit) gsap.registerPlugin(SplitText);

  /* ---------- 1. Hero entrance — stagger badge → h1 → sub → CTA ---------- */
  var heroItems = gsap.utils.toArray(
    ".hero .hero-badge, .hero h1, .hero .hero-sub, .hero .hero-btns, " +
    ".page-hero .hero-badge, .page-hero h1, .page-hero .sub, .page-hero .hero-btns, " +
    ".page-hero .breadcrumbs, .page-hero p"
  );
  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0, y: 26, duration: 0.85, stagger: 0.13, ease: "power2.out",
      clearProps: "all"
    });
  }

  /* ---------- 2. Line-mask reveal nadpisů sekcí (SplitText) ---------- */
  function lineReveal() {
    var headings = gsap.utils.toArray(
      ".section-head h2, .cta-final h2, .stats-section h2, .dark-section h2"
    ).filter(function (h) { return !h.closest(".hero, .page-hero"); });
    headings.forEach(function (elm) {
      var split = new SplitText(elm, { type: "lines", linesClass: "reveal-line-inner" });
      split.lines.forEach(function (line) {
        var wrap = document.createElement("div");
        wrap.className = "reveal-line";
        line.parentNode.replaceChild(wrap, line);
        wrap.appendChild(line);
      });
      gsap.from(split.lines, {
        yPercent: 110, duration: 1, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: elm, start: "top 88%", once: true }
      });
    });
  }
  if (hasSplit) {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(lineReveal);
    else lineReveal();
  }

  /* ---------- 3. Karty a grid položky — fade + slideUp se staggerem ---------- */
  gsap.utils.toArray(".grid-2, .grid-3, .grid-4, .stats-row, .faq-list").forEach(function (grid) {
    if (grid.closest(".how")) return; // „Jak to funguje" má vlastní scroll-scrub animaci
    var items = Array.prototype.filter.call(grid.children, function (c) { return c.nodeType === 1; });
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0, y: 28, duration: 0.7, stagger: 0.09, ease: "power2.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: grid, start: "top 88%", once: true }
    });
  });

  /* ---------- 3b. „Jak to funguje" — načítací lišta mezi kroky (scrub) ---------- */
  var howGrid = document.querySelector(".how .grid-4");
  var howSteps = gsap.utils.toArray(".how .step");
  if (howGrid && howSteps.length) {
    var howCols = getComputedStyle(howGrid).gridTemplateColumns.split(" ").length;
    var howVertical = howCols === 1;
    var segFills = [];
    if (howVertical || howCols === howSteps.length) {
      howSteps.slice(0, -1).forEach(function (step) {
        var track = document.createElement("div");
        track.className = "how-seg" + (howVertical ? " how-seg--v" : "");
        var fill = document.createElement("div");
        fill.className = "how-seg-fill";
        track.appendChild(fill);
        step.appendChild(track);
        segFills.push(fill);
      });
    }
    var howTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".how",
        start: "top 72%",
        end: howVertical ? "bottom 60%" : "center 38%",
        scrub: 0.6
      }
    });
    howSteps.forEach(function (step, i) {
      var num = step.querySelector(".step-num");
      var rest = [step.querySelector("h3"), step.querySelector("p")].filter(Boolean);
      if (num) {
        gsap.set(num, { backgroundColor: "#CBD5E1", scale: 0.85 });
        howTl.to(num, { backgroundColor: "#3B82F6", scale: 1, duration: 0.25, ease: "back.out(2)" });
      }
      howTl.from(rest, { opacity: 0, y: 14, duration: 0.3, stagger: 0.06 }, "<0.05");
      if (segFills[i]) {
        howTl.to(segFills[i], howVertical
          ? { scaleY: 1, duration: 0.5, ease: "none" }
          : { scaleX: 1, duration: 0.5, ease: "none" });
      }
    });
  }

  /* ---------- 3c. Srovnávací tabulka — vystoupení ze stránky ---------- */
  gsap.utils.toArray(".compare-table").forEach(function (table) {
    gsap.from(table, {
      opacity: 0, y: 44, scale: 0.96, duration: 0.9, ease: "power2.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: table, start: "top 85%", once: true }
    });
  });

  /* ---------- 4. Trust bar — postupné naskakování položek ---------- */
  var trustItems = gsap.utils.toArray(".trust-bar span");
  if (trustItems.length) {
    gsap.from(trustItems, {
      opacity: 0, y: 14, duration: 0.55, stagger: 0.12, ease: "power2.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: ".trust-bar", start: "top 92%", once: true }
    });
  }

  /* ---------- 5. Count-up čísel (trust bar + stat-num) ---------- */
  // Najde první číslo v textu (i desetinné s tečkou/čárkou) a napočítá ho od 0.
  function countUp(node) {
    var text = node.textContent;
    var m = text.match(/(\d+(?:[.,]\d+)?)/);
    if (!m) return;
    var raw = m[1];
    var decimals = (raw.match(/[.,](\d+)/) || [, ""])[1].length;
    var target = parseFloat(raw.replace(",", "."));
    var before = text.slice(0, m.index);
    var after = text.slice(m.index + raw.length);
    var span = document.createElement("span");
    span.textContent = raw;
    node.textContent = "";
    node.appendChild(document.createTextNode(before));
    node.appendChild(span);
    node.appendChild(document.createTextNode(after));
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.6, ease: "power1.out",
      scrollTrigger: { trigger: node, start: "top 92%", once: true },
      onUpdate: function () {
        var v = decimals ? obj.val.toFixed(decimals) : Math.round(obj.val);
        span.textContent = String(v).replace(".", raw.indexOf(",") > -1 ? "," : ".");
      }
    });
  }
  gsap.utils.toArray(".stat-num, .trust-bar span").forEach(countUp);

  /* ---------- 6. Fotky v obsahových sekcích — jemný fade ---------- */
  gsap.utils.toArray(".split-media img, .about-photo img, .map-photo img, .story-photo img").forEach(function (img) {
    gsap.from(img, {
      opacity: 0, scale: 1.04, duration: 0.9, ease: "power2.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: img, start: "top 90%", once: true }
    });
  });
})();
