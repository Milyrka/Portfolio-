"use client";

import Image from "next/image";
import type {MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent} from "react";
import {useEffect,useRef,useState} from "react";

type Device="tablet"|"desktop"|"mobile";
type Project={title:string;description:string;tags:string;href:string;poster:string;video?:string;mobileVideo?:string;mobileFit?: "cover" | "height"};

const emitSound=(name:"ui-tap"|"process-whoosh"|"video-play"|"video-pause",currentTime=0)=>window.dispatchEvent(new CustomEvent(`portfolio-${name}`,{detail:{currentTime}}));

const projects:Project[]=[
  {title:"ALTERRA",description:"Cinematic journey для премиальной hotel collection — от большого экрана до мобильного ритма.",tags:"Next.js / GSAP / Motion storytelling",href:"https://alterra-project.vercel.app/",poster:"/projects/alterra-1.png",video:"/projects/alterra-project.mp4",mobileVideo:"/projects/alterra-mobile.mov",mobileFit:"height"},
  {title:"KASKAD",description:"Архитектура, природа и scroll-storytelling в единой адаптивной системе.",tags:"Interactive web / Architecture / GSAP",href:"https://kaskad-private-forest-residence.vercel.app/",poster:"/projects/kaskad-1.jpg",video:"/projects/kaskad-project.mp4",mobileVideo:"/projects/kaskad-mobile.mov",mobileFit:"height"},
  {title:"ГРАНЬ",description:"Luxury e-commerce с точной продуктовой подачей на каждом размере экрана.",tags:"E-commerce / Visual direction / UI",href:"https://www.behance.net/gallery/251495485/gran-internet-magazin-aromatov-dlja-doma-E-commerce",poster:"/projects/gran-hero.png",video:"/projects/gran-project.mp4",mobileVideo:"/projects/gran-mobile.mov"},
  {title:"AURA",description:"Айдентика кофейного бренда, переведённая в тактильную digital-композицию.",tags:"Brand identity / Packaging / Digital",href:"https://www.behance.net/gallery/250802733/AURA-Coffee-Brand-Identity-Packaging-Design",poster:"/projects/aura-hero.png",video:"/projects/aura-project.mp4",mobileVideo:"/projects/aura-mobile.mov"},
  {title:"LUXURY FURNITURE",description:"Editorial-опыт для премиальной мебели с отдельной режиссурой desktop и mobile.",tags:"Editorial / Luxury UI / Motion",href:"https://luxury-furniture-website-nu.vercel.app/",poster:"/projects/furniture-1.png",video:"/projects/furniture-project.mp4",mobileVideo:"/projects/furniture-mobile.mov",mobileFit:"height"},
];

function Screen({project,device,playing,savedTime,onStart,onStop}:{project:Project;device:Device;playing:boolean;savedTime:number;onStart:()=>void;onStop:(time:number)=>void}){
  const videoRef=useRef<HTMLVideoElement>(null);
  const stopLock=useRef(false);
  const videoSrc=device==="mobile"&&project.mobileVideo?project.mobileVideo:project.video;
  const mobileFitClass=device==="mobile"?` mobile-fit-${project.mobileFit??"cover"}`:"";
  const startPlayback=()=>{emitSound("ui-tap");emitSound("video-play",savedTime);onStart()};
  const stopPlayback=()=>{const video=videoRef.current;const time=video?.currentTime??savedTime;emitSound("video-pause",time);video?.pause();onStop(time)};
  const requestStop=(event?:ReactPointerEvent|ReactMouseEvent)=>{
    if(!playing)return;
    event?.preventDefault();
    event?.stopPropagation();
    if(stopLock.current)return;
    stopLock.current=true;
    stopPlayback();
    window.setTimeout(()=>{stopLock.current=false},180);
  };
  useEffect(()=>{const video=videoRef.current;if(!video)return;if(!playing){video.pause();return}const resume=()=>{const duration=Number.isFinite(video.duration)?video.duration:0;if(savedTime>0&&duration>0&&Math.abs(video.currentTime-savedTime)>.15)video.currentTime=Math.min(savedTime,Math.max(0,duration-.05));void video.play().catch(()=>undefined)};if(video.readyState>=2)resume();else video.addEventListener("canplay",resume,{once:true});return()=>video.removeEventListener("canplay",resume)},[playing,savedTime]);
  return <div className="device-screen" onPointerDown={requestStop} onClick={requestStop}>
    <span className="device-media-backdrop" style={{backgroundImage:`url(${project.poster})`}} aria-hidden="true"/>
    {videoSrc&&<video data-screen-video={device} className={`device-video video-${device}${playing?" is-playing":""}${mobileFitClass}`} ref={videoRef} src={videoSrc} poster={project.poster} muted loop playsInline preload="auto" onPlay={event=>emitSound("video-play",event.currentTarget.currentTime)}/>}
    {!playing&&<Image className={`device-poster${mobileFitClass}`} src={project.poster} alt="" fill sizes={device==="desktop"?"56vw":device==="tablet"?"25vw":"13vw"}/>} 
    <span className="screen-reflection"/>
    {videoSrc&&playing&&<button type="button" className="device-pause-layer" data-pause-device={device} onPointerDown={requestStop} onClick={requestStop} aria-label={`Остановить ${project.title} — ${device}`}/>}
    {videoSrc&&!playing&&<button type="button" className="device-play" data-play-device={device} onClick={event=>{event.preventDefault();event.stopPropagation();startPlayback()}} aria-label={`Воспроизвести ${project.title} — ${device}`}><i/>PLAY</button>}
    {videoSrc&&playing&&<span className="pause-hint">Нажмите, чтобы остановить</span>}
  </div>
}

function DeviceMockup({type,project,active,playing,savedTime,onStart,onStop}:{type:Device;project:Project;active:boolean;playing:boolean;savedTime:number;onStart:()=>void;onStop:(time:number)=>void}){
  const labels={tablet:"Tablet",desktop:"Desktop",mobile:"Mobile"};
  const deviceRef=useRef<HTMLDivElement>(null);
  const suppressNextClick=useRef(false);
  const captureStopLock=useRef(false);
  const stopDevicePlayback=()=>{const video=deviceRef.current?.querySelector<HTMLVideoElement>("video");const time=video?.currentTime??savedTime;emitSound("video-pause",time);video?.pause();onStop(time)};
  useEffect(()=>{
    const element=deviceRef.current;
    if(!element)return;
    const nativeStop=(event:Event)=>{
      if(!playing || !(event.target as HTMLElement).closest(".device-screen"))return;
      event.preventDefault();
      event.stopPropagation();
      if(captureStopLock.current)return;
      captureStopLock.current=true;
      suppressNextClick.current=true;
      stopDevicePlayback();
      window.setTimeout(()=>{captureStopLock.current=false},320);
    };
    element.addEventListener("pointerup",nativeStop,{capture:true});
    element.addEventListener("touchend",nativeStop,{capture:true,passive:false});
    element.addEventListener("click",nativeStop,{capture:true});
    return()=>{
      element.removeEventListener("pointerup",nativeStop,{capture:true});
      element.removeEventListener("touchend",nativeStop,{capture:true});
      element.removeEventListener("click",nativeStop,{capture:true});
    };
  },[playing,savedTime]);
  const stopFromScreen=(event:ReactPointerEvent<HTMLDivElement>|ReactMouseEvent<HTMLDivElement>)=>{
    if(!playing || !(event.target as HTMLElement).closest(".device-screen"))return;
    event.preventDefault();
    event.stopPropagation();
    if(captureStopLock.current)return;
    captureStopLock.current=true;
    suppressNextClick.current=true;
    stopDevicePlayback();
    window.setTimeout(()=>{captureStopLock.current=false},320);
  };
  const toggle=()=>{const hasVideo=type==="mobile"&&project.mobileVideo?project.mobileVideo:project.video;if(!hasVideo)return;if(playing){stopDevicePlayback();return}emitSound("ui-tap");emitSound("video-play",savedTime);onStart()};
  return <div ref={deviceRef} className={`device device-${type}${active?" is-active":""}`} data-device={type} role="button" tabIndex={0} aria-label={`${playing?"Остановить":"Воспроизвести"} ${project.title} — ${labels[type]}`} onPointerDownCapture={stopFromScreen} onPointerUpCapture={stopFromScreen} onMouseDownCapture={stopFromScreen} onClick={event=>{if(suppressNextClick.current){suppressNextClick.current=false;event.preventDefault();event.stopPropagation();return}if((event.target as HTMLElement).closest("button,a"))return;toggle()}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle()}}}>
    <div className="device-shell"><Screen project={project} device={type} playing={playing} savedTime={savedTime} onStart={onStart} onStop={onStop}/><span className="device-edge"/></div>
    {type==="desktop"&&<div className="monitor-base"><i/><b/></div>}
    <span className="device-label">{labels[type]}</span>
  </div>
}

function ProjectStage({project,index}:{project:Project;index:number}){
  const order:Device[]=["tablet","desktop","mobile"];
  const [active,setActive]=useState<Device>("desktop");
  const [playingDevice,setPlayingDevice]=useState<Device|null>(null);
  const [savedTimes,setSavedTimes]=useState<Record<Device,number>>({tablet:0,desktop:0,mobile:0});
  const wheelLock=useRef(0);
  const articleRef=useRef<HTMLElement>(null);
  useEffect(()=>{const element=articleRef.current;if(!element)return;const onWheel=(event:globalThis.WheelEvent)=>{
    const horizontal=Math.abs(event.deltaX)>16?event.deltaX:event.shiftKey&&Math.abs(event.deltaY)>16?event.deltaY:0;
    if(!horizontal)return;event.preventDefault();const now=Date.now();if(now-wheelLock.current<520)return;wheelLock.current=now;
    setActive(current=>{const position=order.indexOf(current);return order[(position+(horizontal>0?1:-1)+order.length)%order.length]});
  };element.addEventListener("wheel",onWheel,{passive:false});return()=>element.removeEventListener("wheel",onWheel)},[]);
  return <article ref={articleRef} className={`adaptive-project focus-${active}`} data-project-index={index}>
    <div className="exhibition" data-tilt>
      {order.map(type=><DeviceMockup key={type} type={type} project={project} active={active===type} playing={playingDevice===type} savedTime={savedTimes[type]} onStart={()=>setPlayingDevice(type)} onStop={time=>{setSavedTimes(current=>({...current,[type]:time}));setPlayingDevice(null)}}/>)}
      <div className="exhibition-floor"/>
    </div>
    <div className="project-position">{String(index+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</div>
    <div className="adaptive-info"><p>{project.tags}</p><h3>{project.title}</h3><span>{project.description}</span><a href={project.href} target="_blank" rel="noreferrer">Открыть проект <b>↗</b></a></div>
    <div className="device-nav" aria-label="Выбор устройства">{order.map(type=><button key={type} className={active===type?"is-current":""} onClick={()=>{emitSound("ui-tap");emitSound("process-whoosh");setActive(type)}}>{type}</button>)}</div>
  </article>
}

export function SelectedProjects(){return <section className="selected-projects" id="selected-works">
  <header className="selected-heading"><p className="label">Selected projects / responsive direction</p><div className="selected-title"><h2>Избранные</h2><div className="selected-word"><Image src="/selected/projects-word-user.png" alt="Проекты" fill sizes="(max-width:768px) 92vw, 58vw"/></div></div><a className="all-projects-link" href="https://drive.google.com/drive/folders/1ojF4PhnhW3XYTeDKTjSyHCLk2RBhBwBS?usp=drive_link" target="_blank" rel="noreferrer">Все проекты <span>↗</span></a><p className="selected-note">Смотреть полную коллекцию работ.</p></header>
  {projects.map((project,index)=><ProjectStage project={project} index={index} key={project.title}/>)}
</section>}
