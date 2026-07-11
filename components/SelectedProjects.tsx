"use client";

import Image from "next/image";
import type {TouchEvent as ReactTouchEvent} from "react";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/LanguageProvider";

type Device="tablet"|"desktop"|"mobile";
type Project={title:string;description:{ru:string;en:string};tags:string;href:string;poster:string;video?:string;mobileVideo?:string;mobileFit?: "cover" | "height"};

const emitSound=(name:"ui-tap"|"process-whoosh"|"video-play"|"video-pause",currentTime=0)=>window.dispatchEvent(new CustomEvent(`portfolio-${name}`,{detail:{currentTime}}));

const projects:Project[]=[
  {title:"ALTERRA",description:{ru:"Cinematic journey для премиальной hotel collection — от большого экрана до мобильного ритма.",en:"A cinematic journey for a premium hotel collection — from the large screen to the mobile rhythm."},tags:"Next.js / GSAP / Motion storytelling",href:"https://alterra-project.vercel.app/",poster:"/projects/alterra-1.png",video:"/projects/alterra-project.mp4",mobileVideo:"/projects/alterra-mobile.mov",mobileFit:"height"},
  {title:"KASKAD",description:{ru:"Архитектура, природа и scroll-storytelling в единой адаптивной системе.",en:"Architecture, nature and scroll storytelling in one adaptive system."},tags:"Interactive web / Architecture / GSAP",href:"https://kaskad-private-forest-residence.vercel.app/",poster:"/projects/kaskad-1.jpg",video:"/projects/kaskad-project.mp4",mobileVideo:"/projects/kaskad-mobile.mov",mobileFit:"height"},
  {title:"ГРАНЬ",description:{ru:"Luxury e-commerce с точной продуктовой подачей на каждом размере экрана.",en:"Luxury e-commerce with precise product storytelling at every screen size."},tags:"E-commerce / Visual direction / UI",href:"https://www.behance.net/gallery/251495485/gran-internet-magazin-aromatov-dlja-doma-E-commerce",poster:"/projects/gran-hero.png",video:"/projects/gran-project.mp4",mobileVideo:"/projects/gran-mobile.mov"},
  {title:"AURA",description:{ru:"Айдентика кофейного бренда, переведённая в тактильную digital-композицию.",en:"Coffee-brand identity translated into a tactile digital composition."},tags:"Brand identity / Packaging / Digital",href:"https://www.behance.net/gallery/250802733/AURA-Coffee-Brand-Identity-Packaging-Design",poster:"/projects/aura-hero.png",video:"/projects/aura-project.mp4",mobileVideo:"/projects/aura-mobile.mov"},
  {title:"LUXURY FURNITURE",description:{ru:"Editorial-опыт для премиальной мебели с отдельной режиссурой desktop и mobile.",en:"An editorial experience for premium furniture with dedicated desktop and mobile direction."},tags:"Editorial / Luxury UI / Motion",href:"https://luxury-furniture-website-nu.vercel.app/",poster:"/projects/furniture-1.png",video:"/projects/furniture-project.mp4",mobileVideo:"/projects/furniture-mobile.mov",mobileFit:"height"},
];

function Screen({project,device,playing,savedTime,onStart,onStop}:{project:Project;device:Device;playing:boolean;savedTime:number;onStart:()=>void;onStop:(time:number)=>void}){const {language}=useLanguage();const labels=language==="en"?{play:"Play",stop:"Stop",pause:"Tap to pause"}:{play:"Воспроизвести",stop:"Остановить",pause:"Нажмите, чтобы остановить"};
  const videoRef=useRef<HTMLVideoElement>(null);
  const videoSrc=device==="mobile"&&project.mobileVideo?project.mobileVideo:project.video;
  const mobileFitClass=device==="mobile"?` mobile-fit-${project.mobileFit??"cover"}`:"";
  const startPlayback=()=>{const video=videoRef.current;if(video){video.muted=true;void video.play().catch(()=>undefined)}emitSound("ui-tap");emitSound("video-play",savedTime);onStart()};
  const stopPlayback=()=>{const video=videoRef.current;const time=video?.currentTime??savedTime;emitSound("video-pause",time);video?.pause();onStop(time)};
  useEffect(()=>{const video=videoRef.current;if(!video)return;if(!playing){video.pause();return}const resume=()=>{const duration=Number.isFinite(video.duration)?video.duration:0;if(savedTime>0&&duration>0&&Math.abs(video.currentTime-savedTime)>.15)video.currentTime=Math.min(savedTime,Math.max(0,duration-.05));void video.play().catch(()=>undefined)};if(video.readyState>=2)resume();else video.addEventListener("canplay",resume,{once:true});return()=>video.removeEventListener("canplay",resume)},[playing,savedTime]);
  return <div className="device-screen" onClick={event=>{if(!playing)return;event.stopPropagation();stopPlayback()}}>
    <span className="device-media-backdrop" style={{backgroundImage:`url(${project.poster})`}} aria-hidden="true"/>
    {videoSrc&&<video data-screen-video={device} className={`device-video video-${device}${playing?" is-playing":""}${mobileFitClass}`} ref={videoRef} src={videoSrc} poster={project.poster} muted loop playsInline preload="auto" onPlay={event=>emitSound("video-play",event.currentTarget.currentTime)}/>}
    {!playing&&<Image className={`device-poster${mobileFitClass}`} src={project.poster} alt="" fill sizes={device==="desktop"?"56vw":device==="tablet"?"25vw":"13vw"}/>} 
    <span className="screen-reflection"/>
    {videoSrc&&playing&&<button type="button" className="device-pause-layer" data-pause-device={device} onClick={event=>{event.preventDefault();event.stopPropagation();stopPlayback()}} aria-label={`${labels.stop} ${project.title} — ${device}`}/>}
    {videoSrc&&!playing&&<button type="button" className="device-play" data-play-device={device} onClick={event=>{event.preventDefault();event.stopPropagation();startPlayback()}} aria-label={`${labels.play} ${project.title} — ${device}`}><i/>PLAY</button>}
    {videoSrc&&playing&&<span className="pause-hint">{labels.pause}</span>}
  </div>
}

function DeviceMockup({type,project,active,playing,savedTime,onStart,onStop}:{type:Device;project:Project;active:boolean;playing:boolean;savedTime:number;onStart:()=>void;onStop:(time:number)=>void}){const {language}=useLanguage();
  const labels={tablet:"Tablet",desktop:"Desktop",mobile:"Mobile"};
  const toggle=()=>{const hasVideo=type==="mobile"&&project.mobileVideo?project.mobileVideo:project.video;if(!hasVideo)return;if(playing){onStop(savedTime);return}emitSound("ui-tap");emitSound("video-play",savedTime);onStart()};
  return <div className={`device device-${type}${active?" is-active":""}`} data-device={type} role="button" tabIndex={0} aria-label={`${playing?(language==="en"?"Stop":"Остановить"):(language==="en"?"Play":"Воспроизвести")} ${project.title} — ${labels[type]}`} onClick={event=>{if((event.target as HTMLElement).closest("button,a"))return;toggle()}} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle()}}}>
    <div className="device-shell"><Screen project={project} device={type} playing={playing} savedTime={savedTime} onStart={onStart} onStop={onStop}/><span className="device-edge"/></div>
    {type==="desktop"&&<div className="monitor-base"><i/><b/></div>}
    <span className="device-label">{labels[type]}</span>
  </div>
}

function ProjectStage({project,index}:{project:Project;index:number}){const {language}=useLanguage();const copy=language==="en"?{open:"Open project",devices:"Device selection"}:{open:"Открыть проект",devices:"Выбор устройства"};
  const order:Device[]=["tablet","desktop","mobile"];
  const [active,setActive]=useState<Device>("desktop");
  const [playingDevice,setPlayingDevice]=useState<Device|null>(null);
  const [savedTimes,setSavedTimes]=useState<Record<Device,number>>({tablet:0,desktop:0,mobile:0});
  const wheelLock=useRef(0);
  const touchStart=useRef<{x:number;y:number}|null>(null);
  const articleRef=useRef<HTMLElement>(null);
  const changeDevice=(direction:1|-1)=>setActive(current=>{const position=order.indexOf(current);return order[(position+direction+order.length)%order.length]});
  useEffect(()=>{const element=articleRef.current;if(!element)return;const onWheel=(event:globalThis.WheelEvent)=>{
    const horizontal=Math.abs(event.deltaX)>16?event.deltaX:event.shiftKey&&Math.abs(event.deltaY)>16?event.deltaY:0;
    if(!horizontal)return;event.preventDefault();const now=Date.now();if(now-wheelLock.current<520)return;wheelLock.current=now;
    changeDevice(horizontal>0?1:-1);
  };element.addEventListener("wheel",onWheel,{passive:false});return()=>element.removeEventListener("wheel",onWheel)},[]);
  const onTouchStart=(event:ReactTouchEvent<HTMLElement>)=>{const touch=event.touches[0];if(touch)touchStart.current={x:touch.clientX,y:touch.clientY}};
  const onTouchEnd=(event:ReactTouchEvent<HTMLElement>)=>{const start=touchStart.current,touch=event.changedTouches[0];touchStart.current=null;if(!start||!touch)return;const deltaX=touch.clientX-start.x,deltaY=touch.clientY-start.y;if(Math.abs(deltaX)<48||Math.abs(deltaX)<=Math.abs(deltaY))return;changeDevice(deltaX<0?1:-1)};
  return <article ref={articleRef} className={`adaptive-project focus-${active}`} data-project-index={index} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="exhibition" data-tilt>
      {order.map(type=><DeviceMockup key={type} type={type} project={project} active={active===type} playing={playingDevice===type} savedTime={savedTimes[type]} onStart={()=>setPlayingDevice(type)} onStop={time=>{setSavedTimes(current=>({...current,[type]:time}));setPlayingDevice(null)}}/>)}
      <div className="exhibition-floor"/>
    </div>
    <div className="project-position">{String(index+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</div>
    <div className="adaptive-info"><p>{project.tags}</p><h3>{project.title}</h3><span>{project.description[language]}</span><a href={project.href} target="_blank" rel="noreferrer">{copy.open} <b>↗</b></a></div>
    <div className="device-nav" aria-label={copy.devices}>{order.map(type=><button key={type} className={active===type?"is-current":""} onClick={()=>{emitSound("ui-tap");emitSound("process-whoosh");setActive(type)}}>{type}</button>)}</div>
  </article>
}

export function SelectedProjects(){const {language}=useLanguage();const copy=language==="en"?{heading:"Selected",word:"Projects",all:"All projects",note:"See the complete collection of work."}:{heading:"Избранные",word:"Проекты",all:"Все проекты",note:"Смотреть полную коллекцию работ."};return <section className="selected-projects" id="selected-works">
  <header className="selected-heading"><p className="label">Selected projects / responsive direction</p><div className="selected-title"><h2>{copy.heading}</h2><div className={`selected-word${language==="en"?" is-english":""}`}>{language==="en"?<Image src="/selected/projects-word-en.png" alt={copy.word} fill sizes="(max-width:768px) 92vw, 58vw"/>:<Image src="/selected/projects-word-user.png" alt={copy.word} fill sizes="(max-width:768px) 92vw, 58vw"/>}</div></div><a className="all-projects-link" href="https://drive.google.com/drive/folders/1ojF4PhnhW3XYTeDKTjSyHCLk2RBhBwBS?usp=drive_link" target="_blank" rel="noreferrer">{copy.all} <span>↗</span></a><p className="selected-note">{copy.note}</p></header>
  {projects.map((project,index)=><ProjectStage project={project} index={index} key={project.title}/>)}
</section>}
