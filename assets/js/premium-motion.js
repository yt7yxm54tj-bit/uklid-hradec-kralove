/* Focused motion: welcome, counting, illustrated benefits and the process timeline. */
(()=>{
 'use strict';
 if(!window.gsap||matchMedia('(prefers-reduced-motion: reduce)').matches||new URLSearchParams(location.search).has('noanim'))return;
 const timeline=gsap.timeline({defaults:{duration:.55,ease:'power2.out'}});
 const heading=document.querySelector('.hero h1,.uhero h1');
 if(heading)timeline.from(heading,{y:16,opacity:0,clearProps:'all'});
 const content=document.querySelectorAll('.hero-sub,.hero-btns,.uh-sub,.uh-text>.btn');
 if(content.length)timeline.from(content,{y:12,opacity:0,stagger:.07,clearProps:'all'},'-.3');
 if(window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.stat-num,.trust-bar .tb-num').forEach(node=>{
    const original=node.textContent, match=original.match(/\d+(?:[.,]\d+)?/);
    if(!match)return;
    const target=Number(match[0].replace(',','.')), decimals=(match[0].split(/[.,]/)[1]||'').length;
    const value={number:0}, number=document.createElement('span');
    const accessible=document.createElement('span');accessible.className='count-accessible';accessible.textContent=original;
    const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');
    visual.append(original.slice(0,match.index),number,original.slice(match.index+match[0].length));
    node.replaceChildren(accessible,visual);number.textContent='0';
    gsap.to(value,{number:target,duration:1.4,ease:'power2.out',
      scrollTrigger:{trigger:node,start:'top 94%',once:true},
      onUpdate:()=>{number.textContent=value.number.toFixed(decimals).replace('.',',');},
      onComplete:()=>{number.textContent=match[0];}
    });
  });
  document.querySelectorAll('#home-bento .fun-card').forEach(card=>{
    const objects=card.querySelectorAll('.fc-spray,.fc-mop,.fc-machine,.fc-seal');
    if(objects.length)gsap.from(objects,{y:24,rotation:-5,opacity:0,duration:.7,stagger:.12,
      ease:'power2.out',clearProps:'transform,opacity',
      scrollTrigger:{trigger:card,start:'top 84%',once:true}
    });
  });

  /* ---------- 3f. Vertikální „Jak to funguje" (HP) — scrub: tečky se aktivují, segmenty se plní ---------- */
  document.querySelectorAll(".howv").forEach(function (section) {
    var vDots = gsap.utils.toArray(section.querySelectorAll(".howv-dot"));
    var vSegs = gsap.utils.toArray(section.querySelectorAll(".howv-seg i"));
    if (!vDots.length) return;
    gsap.set(vDots, { backgroundColor: "#CBD5E1", scale: 0.85 });
    gsap.set(vSegs, { scaleY: 0, transformOrigin: "top center" });
    var vtl = gsap.timeline({
      scrollTrigger: {
        trigger: section.querySelector(".howv-track"),
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.6
      }
    });
    vDots.forEach(function (dot, i) {
      vtl.to(dot, { backgroundColor: "#177A8D", scale: 1, duration: 0.25, ease: "back.out(2)" });
      if (vSegs[i]) vtl.to(vSegs[i], { scaleY: 1, duration: 0.5, ease: "none" }, "<0.2");
    });
    // texty a fotky jedou once mimo scrub (při scrollu zpět nemizí)
    gsap.utils.toArray(section.querySelectorAll(".howv-step")).forEach(function (stp) {
      gsap.from(stp.querySelectorAll(".howv-text > *, .howv-media"), {
        opacity: 0, y: 18, duration: 0.5, stagger: 0.07, ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: stp, start: "top 96%", once: true }
      });
    });
  });


 }
})();
