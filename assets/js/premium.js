(()=>{
  'use strict';
  document.querySelectorAll('[data-load-map]').forEach(button=>button.addEventListener('click',()=>{
    const frame=document.createElement('iframe');frame.src=button.dataset.loadMap;frame.title='Mapa: Ulrichovo náměstí 810, Hradec Králové';frame.referrerPolicy='no-referrer-when-downgrade';frame.allowFullscreen=true;button.closest('.map-facade').replaceWith(frame);
  }));
  // The approved D logo is now permanent; comparison remains in the separate gallery.
  document.querySelectorAll('.brand-review').forEach(panel=>panel.remove());
  document.querySelectorAll('.brand-symbol').forEach(mark=>{
    mark.dataset.mark='D';
    const img=mark.querySelector('img');
    if(img)img.src='assets/img/logo-2026-09-08/D.png';
  });
  // Make closed mobile navigation keyboard-inert, and support Escape without altering existing toggle logic.
  const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.mobile-nav');
  if(toggle&&nav){
    const sync=()=>{const opened=nav.classList.contains('open');nav.inert=!opened;toggle.setAttribute('aria-expanded',String(opened));};
    new MutationObserver(sync).observe(nav,{attributes:true,attributeFilter:['class']});sync();
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){toggle.click();toggle.focus();}});
  }
})();
