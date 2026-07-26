// FAQ akordeon — zavřený stav = 1:1 s wireframem, klik rozbalí odpověď
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var answer = item.querySelector('.faq-a');
    var isOpen = item.classList.contains('open');
    // zavřít ostatní v rámci stejného seznamu
    item.parentElement.querySelectorAll('.faq-item.open').forEach(function (other) {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Mobilní menu — tři čárky ↔ X, zavření po kliku na odkaz
var toggle = document.querySelector('.nav-toggle');
var mobileNav = document.querySelector('.mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', function () {
    var open = mobileNav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
}

// Poptávkový formulář → /api/lead (Telegram notifikace)
var leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = leadForm.querySelector('.form-status');
    var submitBtn = leadForm.querySelector('button[type="submit"]');
    var data = Object.fromEntries(new FormData(leadForm));
    if (!data.name || !data.name.trim() || !data.email || data.email.indexOf('@') === -1) {
      status.hidden = false;
      status.className = 'form-status err';
      status.textContent = 'Vyplňte prosím jméno a platný e-mail.';
      return;
    }
    if (!leadForm.querySelector('[name="consent"]').checked) {
      status.hidden = false;
      status.className = 'form-status err';
      status.textContent = 'Potvrďte prosím souhlas se zpracováním osobních údajů.';
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Odesílám…';
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        status.hidden = false;
        if (res.ok) {
          status.className = 'form-status ok';
          status.textContent = 'Děkujeme! Poptávka odeslána — ozveme se do 24 hodin.';
          leadForm.reset();
          submitBtn.textContent = 'Odesláno ✓';
        } else {
          throw new Error(res.j && res.j.error);
        }
      })
      .catch(function (err) {
        status.hidden = false;
        status.className = 'form-status err';
        status.textContent = (err && err.message) || 'Odeslání se nepovedlo. Zavolejte nám prosím.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Odeslat poptávku';
      });
  });
}

// Statický režim (QA screenshoty / reduced motion): dekorativní tahy dokreslené bez animace
if (/[?&]noanim/.test(location.search) ||
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
  document.documentElement.classList.add('no-anim');
}

// Brand dekor: bubliny do hero sekcí a patičky
function addBubbles(el, specs) {
  if (!el) return;
  el.classList.add('has-bubs');
  specs.forEach(function (s) {
    var b = document.createElement('div');
    b.className = 'bub' + (s.light ? ' bub--light' : '');
    b.style.width = s.size + 'px';
    b.style.height = s.size + 'px';
    for (var k in s.pos) b.style[k] = s.pos[k];
    if (s.delay) b.style.animationDelay = s.delay + 's';
    el.appendChild(b);
  });
}
addBubbles(document.querySelector('.hero'), [
  { size: 88, pos: { top: '18%', right: '12%' }, light: true },
  { size: 40, pos: { top: '38%', right: '6%' }, light: true, delay: 1.6 },
  { size: 26, pos: { top: '14%', right: '28%' }, light: true, delay: 3 },
  { size: 56, pos: { bottom: '20%', right: '20%' }, light: true, delay: .8 }
]);
addBubbles(document.querySelector('.uhero'), [
  { size: 84, pos: { top: '14%', right: '8%' } },
  { size: 38, pos: { bottom: '18%', right: '3%' }, delay: 1.4 },
  { size: 22, pos: { top: '58%', right: '16%' }, delay: 2.6 },
  { size: 30, pos: { top: '20%', left: '4%' }, delay: 2 }
]);
addBubbles(document.querySelector('.site-footer'), [
  { size: 110, pos: { top: '72px', right: '-24px' }, light: true },
  { size: 48, pos: { bottom: '14%', right: '12%' }, light: true, delay: 2 }
]);
// další sekce — decentně po krajích
addBubbles(document.querySelector('.features'), [
  { size: 54, pos: { top: '10%', right: '-14px' }, delay: 1 },
  { size: 26, pos: { bottom: '16%', left: '-6px' }, delay: 2.4 }
]);
addBubbles(document.querySelector('.faq-section'), [
  { size: 44, pos: { top: '22%', left: '-10px' }, delay: .6 },
  { size: 28, pos: { bottom: '10%', right: '-6px' }, delay: 2 }
]);
document.querySelectorAll('.cta-final .container').forEach(function (card) {
  addBubbles(card, [
    { size: 96, pos: { top: '-26px', left: '-28px' }, light: true },
    { size: 42, pos: { bottom: '12%', right: '6%' }, light: true, delay: 1.5 },
    { size: 24, pos: { top: '30%', right: '14%' }, light: true, delay: 3 }
  ]);
});
document.querySelectorAll('.stats-section').forEach(function (sec) {
  addBubbles(sec, [
    { size: 70, pos: { top: '12%', right: '4%' }, light: true },
    { size: 30, pos: { bottom: '18%', left: '6%' }, light: true, delay: 1.8 }
  ]);
});
addBubbles(document.querySelector('.bento-hero'), [
  { size: 120, pos: { bottom: '-38px', left: '40%' }, light: true },
  { size: 44, pos: { top: '-14px', left: '52%' }, light: true, delay: 1.8 }
]);

// Tah štětcem pod klíčovými nadpisy (poslední slovo / fráze), kreslí se až ve viewportu
var BRUSH_SVG = '<svg viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true"><path d="M4,12 C80,5 240,3 316,9"/></svg>';
function brushify(el, phrase) {
  if (!el || el.querySelector('.brush')) return;
  var html = el.innerHTML;
  var target = phrase && html.indexOf(phrase) > -1
    ? phrase
    : html.trim().split(/\s+/).slice(-1)[0];
  var idx = html.lastIndexOf(target);
  if (idx === -1) return;
  el.innerHTML = html.slice(0, idx)
    + '<span class="brush">' + target + BRUSH_SVG + '</span>'
    + html.slice(idx + target.length);
}
brushify(document.querySelector('.features .section-head h2'), 'Hradecký úklid');
brushify(document.querySelector('.stats-section h2'), 'v číslech');
document.querySelectorAll('.cta-final h2').forEach(function (h) { brushify(h, 'ještě dnes'); });
brushify(document.querySelector('.uhero h1'));
// kreslení až když je vidět
if ('IntersectionObserver' in window) {
  var brushIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('go'); brushIO.unobserve(e.target); }
    });
  }, { threshold: .6 });
  document.querySelectorAll('.brush').forEach(function (b) { brushIO.observe(b); });
  // doodle tahy (šipka k CTA, kroužek ceny) — kreslí se až ve viewportu
  var doodleIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('go'); doodleIO.unobserve(e.target); }
    });
  }, { threshold: .4 });
  document.querySelectorAll('.doodle').forEach(function (d) { doodleIO.observe(d); });
} else {
  document.querySelectorAll('.brush').forEach(function (b) { b.classList.add('go'); });
  document.querySelectorAll('.doodle').forEach(function (d) { d.classList.add('go'); });
}

// Vlnité okraje tmavé sekce „v číslech" (barvy dle sousedních sekcí)
document.querySelectorAll('.stats-section').forEach(function (sec) {
  var svgNS = 'http://www.w3.org/2000/svg';
  function bgOf(el) {
    var b = el ? getComputedStyle(el).backgroundColor : '';
    return (!b || b === 'rgba(0, 0, 0, 0)') ? '#ffffff' : b;
  }
  sec.classList.add('has-bubs');
  [{ cls: 'sec-wave sec-wave--top', fill: bgOf(sec.previousElementSibling) },
   { cls: 'sec-wave sec-wave--bottom', fill: bgOf(sec.nextElementSibling) }].forEach(function (w) {
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', w.cls);
    svg.setAttribute('viewBox', '0 0 1440 34');
    svg.setAttribute('preserveAspectRatio', 'none');
    var p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', 'M0,14 C240,34 480,2 720,12 C960,22 1200,32 1440,10 L1440,0 L0,0 Z');
    p.setAttribute('fill', w.fill);
    svg.appendChild(p);
    sec.appendChild(svg);
  });
});

// Patička: obal v barvě předchozí sekce + vlnitý horní okraj
var siteFooter = document.querySelector('.site-footer');
if (siteFooter) {
  var prevSection = siteFooter.previousElementSibling;
  var aboveBg = prevSection ? getComputedStyle(prevSection).backgroundColor : '#ffffff';
  if (!aboveBg || aboveBg === 'rgba(0, 0, 0, 0)') aboveBg = '#ffffff';
  var roundWrap = document.createElement('div');
  roundWrap.className = 'footer-round-wrap';
  // barvu předchozí sekce natíráme jen v horní zóně vlny — celoplošné pozadí
  // vykukovalo na iOS jako bílá vlasová linka pod patičkou
  roundWrap.style.background = 'linear-gradient(' + aboveBg + ', ' + aboveBg + ') top / 100% 64px no-repeat';
  siteFooter.parentNode.insertBefore(roundWrap, siteFooter);
  roundWrap.appendChild(siteFooter);
  var waveNS = 'http://www.w3.org/2000/svg';
  var wave = document.createElementNS(waveNS, 'svg');
  wave.setAttribute('class', 'foot-wave');
  wave.setAttribute('viewBox', '0 0 1440 64');
  wave.setAttribute('preserveAspectRatio', 'none');
  var path = document.createElementNS(waveNS, 'path');
  // jeden tvar: u krajů vlna plynule klesá dolů (působí jako zaoblené rohy), uprostřed vlní
  path.setAttribute('d', 'M0,64 C0,26 60,12 160,14 C400,18 520,44 740,32 C960,20 1120,46 1300,16 C1370,5 1440,28 1440,64 L1440,0 L0,0 Z');
  path.setAttribute('fill', aboveBg);
  wave.appendChild(path);
  siteFooter.insertBefore(wave, siteFooter.firstChild);
}

// Transparentní navigace (homepage): po scrollu přejde do bílé
var transparentHeader = document.querySelector('.site-header.transparent');
if (transparentHeader) {
  var onScroll = function () {
    transparentHeader.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
