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
    ".uhero .uh-eyebrow, .uhero h1, .uhero .uh-sub, .uhero .uh-text .btn, .uhero .uh-media"
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
  var isMobile = window.matchMedia("(max-width: 820px)").matches;
  document.body.classList.add("anim-on");
  gsap.utils.toArray(".grid-2, .grid-3, .grid-4, .stats-row, .faq-list, .bento, .t-layout").forEach(function (grid) {
    if (grid.closest(".how")) return; // „Jak to funguje" má vlastní scroll-scrub animaci
    var items = Array.prototype.filter.call(grid.children, function (c) { return c.nodeType === 1; });
    if (!items.length) return;
    if (isMobile) {
      // na mobilu jsou položky pod sebou — každá jede na vlastní trigger (jinak se to kouše)
      items.forEach(function (item) {
        gsap.from(item, {
          opacity: 0, y: 22, duration: 0.55, ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: item, start: "top 94%", once: true }
        });
      });
      return;
    }
    gsap.from(items, {
      opacity: 0, y: 28, duration: 0.7, stagger: 0.09, ease: "power2.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: grid, start: "top 88%", once: true }
    });
  });

  /* ---------- 3e. Bento pilulky — nalétnou s rotací (koncový stav = CSS transformy) ---------- */
  gsap.utils.toArray(".bento-pills").forEach(function (wrap) {
    var pills = gsap.utils.toArray(wrap.children);
    if (!pills.length) return;
    var rots = [-1.6, 1.2, -0.9];
    var xs = isMobile ? [0, 0, 0] : [0, 16, 0]; // mobil: bez posunu, ať pilulka nepřetéká
    gsap.fromTo(pills,
      { autoAlpha: 0, y: 30, rotation: 0, x: 0 },
      {
        autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.12,
        rotation: function (i) { return rots[i % 3]; },
        x: function (i) { return xs[i % 3]; },
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        // po doletu předat transform zpět CSS (nth-child rotace), ať funguje :hover
        onComplete: function () { gsap.set(pills, { clearProps: "transform,visibility,opacity" }); }
      });
  });

  /* ---------- 3d. Služby na mobilu — text karty se odkrývá, když je karta ve viewportu ---------- */
  if (isMobile) {
    gsap.utils.toArray(".service-card").forEach(function (card) {
      ScrollTrigger.create({
        trigger: card,
        start: "top 62%",
        end: "bottom 30%",
        toggleClass: { targets: card, className: "in-view" }
      });
    });
  }

  /* ---------- 3b. Načítací lišta mezi kroky — každá sekce .how se .step dětmi ---------- */
  document.querySelectorAll(".how").forEach(function (section) {
    var steps = gsap.utils.toArray(section.querySelectorAll(".step"));
    if (!steps.length) return;
    var container = steps[0].parentElement;
    var cs = getComputedStyle(container);
    var cols = cs.display.indexOf("grid") > -1
      ? cs.gridTemplateColumns.split(" ").length
      : steps.length;
    // na mobilu VŽDY svislá lišta (kroky jdou pod sebe, lišta nesmí přes text)
    var vertical = cols === 1 || window.matchMedia("(max-width: 820px)").matches;
    var segFills = [];
    if (vertical || cols === steps.length) {
      steps.slice(0, -1).forEach(function (step) {
        var track = document.createElement("div");
        track.className = "how-seg" + (vertical ? " how-seg--v" : "");
        var fill = document.createElement("div");
        fill.className = "how-seg-fill";
        track.appendChild(fill);
        step.appendChild(track);
        segFills.push(fill);
      });
    }
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: vertical ? "bottom 60%" : "center 38%",
        scrub: 0.6
      }
    });
    steps.forEach(function (step, i) {
      var num = step.querySelector(".step-num");
      var rest = [step.querySelector("h3"), step.querySelector("p")].filter(Boolean);
      if (num) {
        gsap.set(num, { backgroundColor: "#CBD5E1", scale: 0.85 });
        tl.to(num, { backgroundColor: "#177A8D", scale: 1, duration: 0.25, ease: "back.out(2)" });
      }
      tl.from(rest, { opacity: 0, y: 14, duration: 0.3, stagger: 0.06 }, "<0.05");
      if (segFills[i]) {
        tl.to(segFills[i], vertical
          ? { scaleY: 1, duration: 0.5, ease: "none" }
          : { scaleX: 1, duration: 0.5, ease: "none" });
      }
    });
  });

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
