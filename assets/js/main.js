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

// Brand dekor: bubliny do hero sekcí a patičky
function addBubbles(el, specs) {
  if (!el) return;
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
  { size: 22, pos: { top: '58%', right: '16%' }, delay: 2.6 }
]);
addBubbles(document.querySelector('.site-footer'), [
  { size: 110, pos: { top: '-30px', right: '-24px' }, light: true },
  { size: 48, pos: { bottom: '14%', right: '12%' }, light: true, delay: 2 }
]);

// Patička: obal v barvě předchozí sekce + vlnitý horní okraj
var siteFooter = document.querySelector('.site-footer');
if (siteFooter) {
  var prevSection = siteFooter.previousElementSibling;
  var aboveBg = prevSection ? getComputedStyle(prevSection).backgroundColor : '#ffffff';
  if (!aboveBg || aboveBg === 'rgba(0, 0, 0, 0)') aboveBg = '#ffffff';
  var roundWrap = document.createElement('div');
  roundWrap.className = 'footer-round-wrap';
  roundWrap.style.background = aboveBg;
  siteFooter.parentNode.insertBefore(roundWrap, siteFooter);
  roundWrap.appendChild(siteFooter);
  var waveNS = 'http://www.w3.org/2000/svg';
  var wave = document.createElementNS(waveNS, 'svg');
  wave.setAttribute('class', 'foot-wave');
  wave.setAttribute('viewBox', '0 0 1440 38');
  wave.setAttribute('preserveAspectRatio', 'none');
  var path = document.createElementNS(waveNS, 'path');
  path.setAttribute('d', 'M0,16 C240,38 480,0 720,12 C960,24 1200,36 1440,12 L1440,0 L0,0 Z');
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
