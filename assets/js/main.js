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

// Transparentní navigace (homepage): po scrollu přejde do bílé
var transparentHeader = document.querySelector('.site-header.transparent');
if (transparentHeader) {
  var onScroll = function () {
    transparentHeader.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
