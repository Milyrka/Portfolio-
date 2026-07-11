"use client";
import {ReactNode,useEffect} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export function Experience({children}:{children:ReactNode}){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;let raf=0,tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,rx=tx,ry=ty;
  const soundButton=document.querySelector<HTMLButtonElement>(".sound-toggle");
  const soundTracks={scene1:document.querySelector<HTMLAudioElement>("#sound-scene-1"),scene2:document.querySelector<HTMLAudioElement>("#sound-scene-2")};
  const processWhoosh=document.querySelector<HTMLAudioElement>("#sound-process");
  const toolsSwoosh=document.querySelector<HTMLAudioElement>("#sound-tools-swoosh");
  const uiTap=document.querySelector<HTMLAudioElement>("#sound-ui-tap");
  let soundEnabled=false,currentSound: keyof typeof soundTracks | null=null;
  Object.values(soundTracks).forEach(track=>{if(track)track.volume=.34});
  if(processWhoosh)processWhoosh.volume=.52;
  if(toolsSwoosh)toolsSwoosh.volume=.42;
  if(uiTap)uiTap.volume=.5;
  const pauseBackground=()=>Object.values(soundTracks).forEach(track=>track?.pause());
  const stopSounds=()=>{pauseBackground();processWhoosh?.pause();toolsSwoosh?.pause();uiTap?.pause()};
  const playProcessWhoosh=()=>{if(!soundEnabled||!processWhoosh)return;processWhoosh.pause();processWhoosh.currentTime=0;void processWhoosh.play().catch(()=>undefined)};
  const playToolsSwoosh=()=>{if(!soundEnabled||!toolsSwoosh)return;toolsSwoosh.pause();toolsSwoosh.currentTime=0;void toolsSwoosh.play().catch(()=>undefined)};
  const playUiTap=()=>{if(!uiTap)return;uiTap.pause();uiTap.currentTime=0;void uiTap.play().catch(()=>undefined)};
  const activateSound=(name:keyof typeof soundTracks|null)=>{if(currentSound===name&&(!name||!soundEnabled||!soundTracks[name]?.paused))return;currentSound=name;pauseBackground();if(soundEnabled&&name){void soundTracks[name]?.play().catch(()=>undefined)}};
  const primeMobileAudio=()=>Object.values(soundTracks).forEach(track=>{if(!track)return;track.muted=true;void track.play().then(()=>{track.pause();track.currentTime=0;track.muted=false}).catch(()=>{track.muted=false})});
  const toggleSound=()=>{soundEnabled=!soundEnabled;soundButton?.setAttribute("aria-pressed",String(soundEnabled));if(soundEnabled){primeMobileAudio();if(currentSound)void soundTracks[currentSound]?.play().catch(()=>undefined)}else stopSounds()};
  soundButton?.addEventListener("click",toggleSound);
  const onUiTap=()=>playUiTap();
  const onProcessWhoosh=()=>playProcessWhoosh();
  const onVideoPlay=(event:Event)=>{if(!soundEnabled)return;const time=(event as CustomEvent<{currentTime:number}>).detail?.currentTime??0;const track=soundTracks.scene2;currentSound="scene2";pauseBackground();if(track){const start=()=>{if(Number.isFinite(track.duration)&&track.duration>0)track.currentTime=time%track.duration;void track.play().catch(()=>undefined)};if(track.readyState>=1)start();else track.addEventListener("loadedmetadata",start,{once:true})}};
  const onVideoPause=()=>{if(currentSound==="scene2"){soundTracks.scene2?.pause();currentSound=null}};
  addEventListener("portfolio-ui-tap",onUiTap);addEventListener("portfolio-process-whoosh",onProcessWhoosh);addEventListener("portfolio-video-play",onVideoPlay);addEventListener("portfolio-video-pause",onVideoPause);
  if(fine&&!reduced){document.body.classList.add("has-cursor");const dot=document.querySelector<HTMLElement>(".cursor-dot"),ring=document.querySelector<HTMLElement>(".cursor-ring");const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY;document.documentElement.style.setProperty("--mx",`${(tx/innerWidth-.5).toFixed(3)}`);document.documentElement.style.setProperty("--my",`${(ty/innerHeight-.5).toFixed(3)}`)};const tick=()=>{cx+=(tx-cx)*.28;cy+=(ty-cy)*.28;rx+=(tx-rx)*.1;ry+=(ty-ry)*.1;if(dot)dot.style.transform=`translate3d(${cx}px,${cy}px,0)`;if(ring)ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;raf=requestAnimationFrame(tick)};addEventListener("pointermove",move,{passive:true});tick();
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el=>{const on=(e:PointerEvent)=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;gsap.to(el,{x:x*.18,y:y*.18,duration:.5,ease:"power3.out"})};const off=()=>gsap.to(el,{x:0,y:0,duration:.8,ease:"elastic.out(1,.45)"});el.addEventListener("pointermove",on);el.addEventListener("pointerleave",off)});
  }
  const ctx=gsap.context(()=>{if(reduced)return;
    // Opening shot: a restrained vertical curtain reveals the portrait, then typography finds focus.
    if(document.querySelector(".hero-video-frame"))gsap.timeline({defaults:{ease:"power4.out"}}).fromTo(".hero-video-frame",{clipPath:"inset(48% 0 48% 0 round 1.4rem)"},{clipPath:"inset(0% 0 0% 0 round 1.4rem)",duration:1.45}).from(".hero-scroll-video",{scale:1.08,filter:"saturate(.7) contrast(.9) brightness(.75)",duration:1.8},0).from(".hero-title-relief span",{yPercent:112,duration:1.05,stagger:.09},.34).from(".hero-name,.hero-role,.hero-copy,.hero-actions",{y:18,opacity:0,duration:.8,stagger:.045},.68);
    mm.add("(min-width:901px)",()=>{
      // Slow lateral drift: the composed hero leaves frame intact instead of zooming through the face.
      const heroVideo=document.querySelector<HTMLVideoElement>(".hero-scroll-video");
      if(heroVideo){const seekHeroVideo=(progress:number)=>{if(!Number.isFinite(heroVideo.duration)||heroVideo.duration<=0)return;heroVideo.currentTime=Math.min(heroVideo.duration-.04,heroVideo.duration*progress)};
      const hero=gsap.timeline({scrollTrigger:{trigger:".hero",start:"top top",end:"+=190%",pin:true,scrub:.85,onUpdate:self=>seekHeroVideo(self.progress)}});hero.to(".hero-scroll-video",{scale:1.045,ease:"none"},0).fromTo(".hero-title-ray",{clipPath:"polygon(-28% 0,-12% 0,-27% 100%,-43% 100%)"},{clipPath:"polygon(143% 0,159% 0,144% 100%,128% 100%)",ease:"none",duration:.78},.04).to(".hero-title-stack",{yPercent:-6,opacity:.22,ease:"none"},.72).to(".hero-copy,.hero-actions,.hero-name,.hero-role",{y:-24,opacity:0,ease:"none"},.72);}
      // Manifesto: the whole viewport is a spatial field; no card or artboard is introduced.
      const man=gsap.timeline({scrollTrigger:{trigger:".manifesto",start:"top top",end:"+=560%",pin:true,scrub:.9}});
      man.set(".manifesto-lens",{left:0,right:0,top:0,width:"100vw",height:"100vh",xPercent:0,scale:1,opacity:1})
        .set(".manifesto-lines,.manifesto-copy,.manifesto .label,.stage-room,.depth-plane,.scene-frame,.scene-axis,.scene-points i,.scene-portal,.stage-light",{opacity:0})
        .fromTo(".manifesto-scene",{rotateX:58,rotateY:0,rotateZ:-3,z:-280,xPercent:0,scale:.76,transformPerspective:1500},{rotateX:10,rotateY:-27,rotateZ:0,z:-20,xPercent:4,scale:.98,duration:.56,ease:"power2.inOut"},.02)
        .to(".manifesto-scene",{rotateX:0,rotateY:0,z:70,xPercent:0,scale:1.075,duration:.26,ease:"power2.inOut"},.58)
        .fromTo(".room-floor",{rotateX:84,opacity:0},{rotateX:68,opacity:.52,duration:.22,ease:"sine.out"},.02)
        .fromTo(".room-horizon",{scaleX:0,opacity:0},{scaleX:1,opacity:.42,duration:.2,ease:"power2.out"},.08)
        .fromTo(".stage-room",{opacity:0,scale:.96},{opacity:1,scale:1,duration:.2,ease:"sine.out"},.08)
        .fromTo(".scene-axis",{scaleX:0,opacity:0},{scaleX:1,opacity:.2,duration:.18,stagger:.035,ease:"power2.out"},.12)
        .fromTo(".depth-plane,.scene-frame",{opacity:0,z:-170,y:18},{opacity:.22,z:0,y:0,duration:.28,stagger:.045,ease:"power3.out"},.16)
        .fromTo(".scene-points i",{opacity:0,scale:0},{opacity:.55,scale:1,duration:.15,stagger:.025,ease:"back.out(1.4)"},.2)
        .fromTo(".stage-light",{opacity:0,scale:.8},{opacity:.5,scale:1,duration:.28,ease:"sine.out"},.22)
        .fromTo(".scene-portal",{opacity:0,scale:.55,z:-260,rotateY:-8},{opacity:1,scale:1,z:80,rotateY:0,duration:.34,ease:"power3.out"},.24)
        .fromTo(".manifesto .label",{opacity:0,y:-8},{opacity:1,y:0,duration:.07,ease:"power2.out"},.25)
        .fromTo(".manifesto-lines",{opacity:0,y:24},{opacity:1,y:0,duration:.09,ease:"power3.out"},.27)
        .fromTo(".manifesto-copy",{opacity:0,y:14},{opacity:1,y:0,duration:.08,ease:"power2.out"},.34)
        .to(".depth-a",{xPercent:-7,yPercent:-3,duration:.48,ease:"none"},.35)
        .to(".depth-b",{xPercent:8,yPercent:4,duration:.48,ease:"none"},.35)
        .to(".sf-a",{xPercent:-5,yPercent:5,duration:.48,ease:"none"},.35)
        .to(".sf-b",{xPercent:6,yPercent:-4,duration:.48,ease:"none"},.35)
        .to(".pr-1",{rotate:205,duration:.5,ease:"none"},.3)
        .to(".pr-2",{rotate:-165,duration:.5,ease:"none"},.3)
        .to(".pr-3",{rotate:125,duration:.5,ease:"none"},.3)
        .to(".scene-portal",{scale:8.6,z:1180,rotateZ:.35,duration:.38,ease:"power3.in"},.54)
        .to(".manifesto-lines,.manifesto-copy,.manifesto .label",{opacity:0,y:-24,duration:.08,ease:"power2.inOut"},.8)
        .to(".manifesto-scene",{opacity:0,duration:.055,ease:"sine.in"},.86)
        .set(".portfolio-screen",{opacity:1,scale:1,clipPath:"inset(1.2vh 1vw 1.2vh 1vw round 1.4rem)"},.9)
        .set(".reel-flash",{opacity:.94},.9);
      man.call(()=>{document.querySelectorAll<HTMLVideoElement>(".reel-project video").forEach(video=>{video.currentTime=0;void video.play().catch(()=>undefined)})});
      document.querySelectorAll<HTMLElement>(".reel-project").forEach((slide,index)=>{
        if(index===0)man.set(slide,{opacity:1,scale:1},"<").to(".reel-flash",{opacity:0,duration:.08,ease:"power2.out"},"<");
        else man.fromTo(slide,{opacity:0,scale:1.035},{opacity:1,scale:1,duration:.11,ease:"power2.out"},"+=0");
        man.to(slide,{opacity:1,duration:.22});
        if(index<document.querySelectorAll(".reel-project").length-1){
          man.to(".reel-flash",{opacity:.92,duration:.035,ease:"power2.in"},"-=.025")
            .to(slide,{opacity:0,scale:.985,duration:.07,ease:"power2.in"},"<")
            .to(".reel-flash",{opacity:0,duration:.07,ease:"power2.out"});
        }
      });
      man.scrollTrigger?.kill();
      ScrollTrigger.create({trigger:".manifesto",start:"top top",end:"+=820%",pin:true,scrub:.82,animation:man});
      ScrollTrigger.create({trigger:".manifesto",start:"top top",end:"+=820%",onEnter:()=>activateSound("scene1"),onEnterBack:()=>activateSound("scene2"),onUpdate:self=>activateSound(self.progress<.9?"scene1":"scene2"),onLeave:()=>activateSound(null),onLeaveBack:()=>activateSound(null)});
      document.querySelectorAll<HTMLElement>("[data-project]").forEach((scene,index)=>{const world=scene.querySelector(".project-world"),main=scene.querySelector(".artifact-main"),back=scene.querySelector(".artifact-back"),front=scene.querySelector(".artifact-front"),info=scene.querySelector(".project-info");
        // Chapter tracking shot: the camera crosses three physical planes per project.
        gsap.timeline({scrollTrigger:{trigger:scene,start:"top top",end:"+=190%",pin:true,scrub:.75}}).fromTo(world,{scale:.62,rotateX:7},{scale:1.1,rotateX:0,ease:"none"},0).fromTo(back,{z:-160,rotate:-8},{z:40,rotate:5,ease:"none"},0).fromTo(main,{z:-40,yPercent:14},{z:150,yPercent:-8,ease:"none"},0).fromTo(front,{z:120,xPercent:18},{z:280,xPercent:-14,ease:"none"},0).fromTo(info,{yPercent:18,opacity:0},{yPercent:-5,opacity:1,ease:"power2.out"},.12).to(info,{yPercent:-28,opacity:.16,ease:"none"},.72).to(scene,{"--phase":1,duration:1,ease:"none"},0);
      });
      // Five visual states share one frame, so the process reads as a single evolving system.
      const processNames=["01 / ИМПУЛЬС","02 / СЕТКА","03 / ВИЗУАЛЬНАЯ СИСТЕМА","04 / ЖИВОЙ ОПЫТ","05 / ИНТЕРАКТИВНЫЕ РЕАКЦИИ"];
      let lastProcessFrame=-1;
      const processTl=gsap.timeline({scrollTrigger:{trigger:".process",start:"top top",end:"bottom bottom",scrub:.75,onUpdate:self=>{const frame=Math.min(3,Math.max(0,Math.floor(self.progress*4)));if(frame!==lastProcessFrame){lastProcessFrame=frame;playProcessWhoosh()}},onLeave:()=>{lastProcessFrame=-1},onLeaveBack:()=>{lastProcessFrame=-1}}});
      processTl.set(".process-frame",{opacity:0,scale:1.035}).set(".pf-1",{opacity:1,scale:1});
      for(let index=0;index<3;index++){
        processTl.to(`.pf-${index+1}`,{opacity:0,scale:1.025,filter:"blur(3px)",duration:.26,ease:"sine.inOut"})
          .to(".process-caption",{opacity:0,y:-8,duration:.08},"<")
          .set(".process-caption",{textContent:processNames[index+1],y:8})
          .fromTo(`.pf-${index+2}`,{opacity:0,scale:1.035,filter:"blur(3px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:.32,ease:"sine.inOut"},"<+.05")
          .to(".process-caption",{opacity:1,y:0,duration:.16},"<+.08");
      }
      processTl.to(".process-caption",{opacity:0,y:-8,duration:.08})
        .set(".process-caption",{textContent:processNames[4],y:8})
        .to(".pf-4",{scale:1.025,duration:.34,ease:"sine.inOut"},"<")
        .to(".process-caption",{opacity:1,y:0,duration:.16},"<+.08");
      const processScope=document.querySelector<HTMLElement>(".process-scope");
      const reactToPointer=(event:PointerEvent)=>{if(!processScope)return;const rect=processScope.getBoundingClientRect();processScope.style.setProperty("--process-x",`${((event.clientX-rect.left)/rect.width-.5)*2}`);processScope.style.setProperty("--process-y",`${((event.clientY-rect.top)/rect.height-.5)*2}`)};
      const settleProcess=()=>{processScope?.style.setProperty("--process-x","0");processScope?.style.setProperty("--process-y","0")};
      processScope?.addEventListener("pointermove",reactToPointer,{passive:true});processScope?.addEventListener("pointerleave",settleProcess);
      return()=>{processScope?.removeEventListener("pointermove",reactToPointer);processScope?.removeEventListener("pointerleave",settleProcess)};
    });
    mm.add("(max-width:900px)",()=>{
      const playMobileReel=()=>document.querySelectorAll<HTMLVideoElement>(".reel-project video").forEach(video=>{video.currentTime=0;void video.play().catch(()=>undefined)});
      const manifestoMobile=gsap.timeline({scrollTrigger:{trigger:".manifesto",start:"top top",end:"+=280%",pin:true,scrub:.7}});
      manifestoMobile
        .set(".manifesto .portfolio-screen",{display:"block",opacity:0})
        .to(".manifesto .manifesto-rendered-title,.manifesto .manifesto-copy,.manifesto .label",{y:-28,opacity:0,duration:.18,ease:"power2.in"},.08)
        .fromTo(".manifesto-scene",{scale:.82,yPercent:12,opacity:.1},{scale:1,yPercent:0,opacity:1,duration:.34,ease:"power3.out"},.2)
        .fromTo(".manifesto .stage-room",{opacity:0,scale:.88},{opacity:1,scale:1,duration:.18,ease:"sine.out"},.28)
        .fromTo(".manifesto .depth-a,.manifesto .depth-b,.manifesto .sf-a",{opacity:0,y:24},{opacity:.72,y:0,duration:.22,stagger:.05,ease:"power3.out"},.34)
        .fromTo(".manifesto .scene-portal",{scale:.42,rotateZ:-18,opacity:0},{scale:1,rotateZ:0,opacity:1,duration:.28,ease:"back.out(1.4)"},.42)
        .to(".manifesto .pr-1",{rotate:180,duration:.32,ease:"none"},.47)
        .to(".manifesto .pr-2",{rotate:-150,duration:.32,ease:"none"},.47)
        .to(".manifesto .pr-3",{rotate:110,duration:.32,ease:"none"},.47)
        .to(".manifesto-scene",{scale:1.18,opacity:0,duration:.2,ease:"power3.in"},.68)
        .set(".manifesto .portfolio-screen",{opacity:1},.82)
        .call(playMobileReel,[],.82)
        .fromTo(".reel-1",{opacity:0,scale:1.06},{opacity:1,scale:1,duration:.12,ease:"power2.out"},.82)
        .to(".reel-1",{opacity:1,duration:.18},.94)
        .to(".reel-1",{opacity:0,scale:.98,duration:.1,ease:"power2.in"},1.12)
        .fromTo(".reel-2",{opacity:0,scale:1.06},{opacity:1,scale:1,duration:.14,ease:"power2.out"},1.2);
      ScrollTrigger.create({trigger:".manifesto",start:"top top",end:"+=280%",onEnter:()=>activateSound("scene1"),onEnterBack:()=>activateSound("scene2"),onUpdate:self=>activateSound(self.progress<.82?"scene1":"scene2"),onLeave:()=>activateSound(null),onLeaveBack:()=>activateSound(null)});
      document.querySelectorAll<HTMLElement>(".artifact-main").forEach(el=>gsap.fromTo(el,{yPercent:12,scale:.92},{yPercent:-12,scale:1.05,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:.65}}));
    });
    gsap.utils.toArray<HTMLElement>(".step").forEach(el=>gsap.from(el,{x:80,opacity:0,duration:1,ease:"power4.out",scrollTrigger:{trigger:el,start:"top 84%",once:true}}));
    gsap.utils.toArray<HTMLElement>(".adaptive-project").forEach(scene=>{
      gsap.timeline({scrollTrigger:{trigger:scene,start:"top 78%",end:"top 28%",scrub:.65}})
        .fromTo(scene.querySelector(".device-desktop"),{y:90,scale:.86,opacity:0},{y:0,scale:1,opacity:1,ease:"power3.out"},0)
        .fromTo(scene.querySelector(".device-tablet"),{x:-80,y:45,opacity:0},{x:0,y:0,opacity:1,ease:"power3.out"},.08)
        .fromTo(scene.querySelector(".device-mobile"),{x:70,y:35,opacity:0},{x:0,y:0,opacity:1,ease:"power3.out"},.12)
        .fromTo(scene.querySelector(".adaptive-info"),{y:36,opacity:0},{y:0,opacity:1,ease:"power2.out"},.2);
    });
    let lastToolsPass=-1;
    gsap.timeline({scrollTrigger:{trigger:".tools",start:"top top",end:"+=220%",pin:true,scrub:.85,onUpdate:self=>{const pass=Math.floor(self.progress*5);if(pass!==lastToolsPass){lastToolsPass=pass;playToolsSwoosh()}},onLeave:()=>{lastToolsPass=-1},onLeaveBack:()=>{lastToolsPass=-1}}})
      .fromTo(".m1",{xPercent:0},{xPercent:-18,duration:1,ease:"none"},0)
      .fromTo(".m2",{xPercent:-18},{xPercent:0,duration:1,ease:"none"},0);
  });
  return()=>{cancelAnimationFrame(raf);soundButton?.removeEventListener("click",toggleSound);removeEventListener("portfolio-ui-tap",onUiTap);removeEventListener("portfolio-process-whoosh",onProcessWhoosh);removeEventListener("portfolio-video-play",onVideoPlay);removeEventListener("portfolio-video-pause",onVideoPause);stopSounds();document.body.classList.remove("has-cursor");mm.revert();ctx.revert()};},[children]);return <>{children}</>}
