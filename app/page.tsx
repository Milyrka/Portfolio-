"use client";

import Image from "next/image";
import { Experience } from "@/components/Experience";
import { MotionField } from "@/components/MotionField";
import { SelectedProjects } from "@/components/SelectedProjects";
import {LanguageProvider,useLanguage} from "@/components/LanguageProvider";

const projects = [
  { no:"01", code:"Г", title:"ГРАНЬ", kind:"gran", images:["/projects/gran-hero.png","/projects/gran-hero.png"], text:"Luxury e-commerce для бренда интерьерных ароматов. Премиальная визуальная система, продуктовая подача и editorial-композиция.", tags:"E-commerce / Visual Direction / UI / Product", href:"https://www.behance.net/gallery/251495485/gran-internet-magazin-aromatov-dlja-doma-E-commerce" },
  { no:"02", code:"A", title:"AURA", kind:"aura", images:["/projects/aura-hero.png","/projects/aura-hero.png"], text:"Айдентика и упаковка кофейного бренда. Визуальная система, построенная на настроении, цвете и тактильности продукта.", tags:"Brand Identity / Packaging / Visual System", href:"https://www.behance.net/gallery/250802733/AURA-Coffee-Brand-Identity-Packaging-Design" },
  { no:"03", code:"K", title:"KASKAD", kind:"kaskad", images:["/projects/kaskad-1.jpg","/projects/kaskad-2.jpg"], text:"Cinematic web experience для private forest residence. Архитектура, природа и scroll-storytelling объединены в одно движение камеры.", tags:"Motion Web / GSAP / Scroll Storytelling / Architecture", href:"https://kaskad-private-forest-residence.vercel.app/" },
  { no:"04", code:"A", title:"ALTERRA", kind:"alterra", images:["/projects/alterra-1.png","/projects/alterra-2.png"], video:"/projects/alterra-project.mp4", text:"Интерактивное путешествие по премиальной hotel collection. Сайт построен как cinematic journey через локации, свет и атмосферу.", tags:"Cinematic Experience / Motion / GSAP / Storytelling", href:"https://alterra-project.vercel.app/" },
  { no:"05", code:"L", title:"LUXURY FURNITURE", kind:"furniture", images:["/projects/furniture-1.png","/projects/furniture-2.png"], video:"/projects/furniture-project.mp4", text:"Премиальный сайт мебели с акцентом на editorial layout, крупную типографику и luxury-визуал.", tags:"Web Design / Editorial / Luxury UI", href:"https://luxury-furniture-website-nu.vercel.app/" },
];
const reelProjects = [{...projects[3],video:"/projects/manifesto-video-1.mp4"},{...projects[4],video:"/projects/manifesto-video-2.mp4"}];
const projectsDriveUrl = "https://drive.google.com/drive/folders/1ojF4PhnhW3XYTeDKTjSyHCLk2RBhBwBS?usp=drive_link";
const telegramUrl = "https://t.me/Kate_0385";

function Portfolio(){const {language,toggleLanguage}=useLanguage();const en=language==="en";const copy=en?{
  discussIdea:"Discuss an idea in Telegram",discussProject:"Discuss a project",viewProjects:"View projects",sound:"Sound",manifesto:"Motion manifesto / 01",manifestoTitle:"A website is not a page. It is a scene.",manifestoCopy:"I think of a digital project as a small film: it has rhythm, pauses, light, camera movement and a moment that stays with you.",openProject:"Open project",process:"Process as motion / 03",from:"From the impulse",to:"to a living experience.",frames:["Starting point of the visual system","Figma grid","Relief visual concept","Live final experience"],steps:[["01","Impulse","I find the visual metaphor and the central emotional image of the project."],["02","Grid","I turn the impulse into rhythm, guides and a clear compositional structure."],["03","Visual system","I bring together colour, typography, light and motion into one visual language."],["04","Living experience","I assemble the states into a whole space that breathes and unfolds over time."],["05","Interactive reactions","I add a response to scroll, cursor and presence — softly and deliberately."]],toolsNote:"Tools change. The way of thinking does not. I combine motion, visual language and technology into one experience.",contact:"Contact / 05",contactTitle:"Let’s create a digital story.",contactCopy:"If a brand needs a site that does more than present information — one that creates an impression — I can turn an idea into a motion-driven digital experience.",write:"Write to me",back:"Back to top"}:{discussIdea:"Обсудить идею в Telegram",discussProject:"Обсудить проект",viewProjects:"Смотреть проекты",sound:"Звук",manifesto:"Motion manifesto / 01",manifestoTitle:"Сайт — это не страница. Это сцена.",manifestoCopy:"Я думаю о цифровом проекте как о маленьком фильме: у него есть ритм, паузы, свет, движение камеры и момент, который остается в памяти.",openProject:"Открыть проект",process:"Process as motion / 03",from:"От импульса",to:"до живого опыта.",frames:["Начальный фон визуальной системы","Сетка из Figma","Барельефная визуальная концепция","Живой финальный опыт"],steps:[["01","Импульс","Нахожу визуальную метафору и главный эмоциональный образ проекта."],["02","Сетка","Превращаю импульс в ритм, направляющие и ясную композиционную структуру."],["03","Визуальная система","Соединяю цвет, типографику, свет и движение в единый визуальный язык."],["04","Живой опыт","Собираю состояния в цельное пространство, которое дышит и развивается во времени."],["05","Интерактивные реакции","Добавляю отклик на скролл, курсор и присутствие человека — мягко и осмысленно."]],toolsNote:"Инструменты меняются. Способ мышления — нет. Я собираю движение, визуал и технологию в одну систему впечатления.",contact:"Contact / 05",contactTitle:"Давайте создадим цифровую историю.",contactCopy:"Если бренду нужен сайт, который не просто показывает информацию, а создает впечатление, я могу превратить идею в motion-driven digital experience.",write:"Написать мне",back:"Наверх ↑"};return <Experience>
  <MotionField />
  <div className="noise" aria-hidden="true"/><div className="cursor-dot"/><div className="cursor-ring"/>
  <main data-language={language}>
    <section className="hero hero-static" id="hero" data-scene>
      <img className="hero-static-media hero-static-media-desktop" src="/hero/hero-final-clean.png" alt="Катя Иванушкина — cinematic digital experiences"/>
      <img className="hero-static-media hero-static-media-mobile" src="/hero/hero-mobile-final.png" alt="Катя Иванушкина — cinematic digital experiences"/>
      <img className="hero-static-media hero-static-media-en-desktop" src="/hero/hero-en-desktop.png" alt="Katya Ivanushkina — cinematic digital experiences"/>
      <img className="hero-static-media hero-static-media-en-mobile" src="/hero/hero-en-mobile.png" alt="Katya Ivanushkina — cinematic digital experiences"/>
      <div className="hero-cleanup" aria-hidden="true"/>
      <a className="hero-static-hit hero-static-hit-discuss-top" href={telegramUrl} target="_blank" rel="noreferrer" aria-label={copy.discussIdea}/>
      <a className="hero-static-hit hero-static-hit-discuss-bottom" href={telegramUrl} target="_blank" rel="noreferrer" aria-label={copy.discussProject}/>
      <a className="hero-static-hit hero-static-hit-projects" href={projectsDriveUrl} target="_blank" rel="noreferrer" aria-label={copy.viewProjects}/>
      <button className="sound-toggle" type="button" aria-pressed="false"><span className="sound-icon"/>{copy.sound}</button><button className="language-toggle" type="button" onClick={toggleLanguage} aria-label="Change language">{language==="ru"?"EN":"RU"}</button>
    </section>

    <audio id="sound-scene-1" src="/audio/scene-1.mp3" preload="auto" loop/>
    <audio id="sound-scene-2" src="/audio/scene-2.mp3" preload="auto" loop/>
    <audio id="sound-process" src="/audio/process-whoosh.mp3" preload="auto"/>
    <audio id="sound-tools-swoosh" src="/audio/tools-swoosh.mp3" preload="auto"/>
    <audio id="sound-ui-tap" src="/audio/ui-tap.mp3" preload="auto"/>

    <section className="manifesto" id="works" data-scene>
      <div className="manifesto-stage">
        <p className="label">{copy.manifesto}</p>
        <div className={`manifesto-lines manifesto-rendered-title${en?" is-english":""}`}>{en?<Image src="/manifesto/manifesto-title-en.png" alt={copy.manifestoTitle} fill sizes="(max-width:768px) 92vw, 48vw"/>:<Image src="/manifesto/manifesto-title-exact.png" alt={copy.manifestoTitle} fill sizes="(max-width:768px) 90vw, 48vw"/>}</div>
        <p className="manifesto-copy">{copy.manifestoCopy}</p>
        <div className="manifesto-lens" data-tilt>
          <div className="manifesto-scene" aria-hidden="true">
            <div className="stage-room"><div className="room-back"/><div className="room-floor"/><div className="room-side"/><div className="room-horizon"/></div>
            <div className="depth-plane depth-a"><span>IDEA / 01</span></div><div className="depth-plane depth-b"><span>MOTION / 02</span></div><div className="depth-plane depth-c"><span>SCENE / 03</span></div>
            <div className="scene-frame sf-a"><span>FRAME</span></div><div className="scene-frame sf-b"><span>DEPTH</span></div>
            <div className="scene-axis axis-a"/><div className="scene-axis axis-b"/><div className="scene-axis axis-c"/>
            <div className="scene-points"><i/><i/><i/><i/><i/><i/></div>
            <div className="scene-portal"><div className="portal-plane"><b className="portal-ring pr-1"/><b className="portal-ring pr-2"/><b className="portal-ring pr-3"/><i/><i/><span>SCENE / ENTRY</span></div><div className="portal-core"/></div>
            <div className="stage-light"/>
          </div>
          <div className="portfolio-screen">
            {reelProjects.map((project,index)=><article className={`reel-project reel-${index+1}`} key={project.title}>
              <div className="reel-media">{project.video?<video src={project.video} poster={project.images[0]} muted loop playsInline preload="auto"/>:<Image src={project.images[0]} alt={`Проект ${project.title}`} fill sizes="100vw"/>}</div>
              <div className="reel-shade"/><div className="reel-index">{String(index+1).padStart(2,"0")} / 02</div>
              <div className="reel-copy"><p>{project.tags}</p><a href={project.href} target="_blank" rel="noreferrer">{copy.openProject} <span>↗</span></a></div>
            </article>)}
            <div className="reel-flash" aria-hidden="true"/>
          </div>
        </div>
      </div>
    </section>

    <SelectedProjects />

    <section className="process" data-scene>
      <div className="process-camera"><p className="label">{copy.process}</p><h2 className={`process-rendered-title${en?" is-english":""}`}>{en?<span className="process-lead process-lead-english"><Image src="/process/process-title-en.png" alt={copy.from} fill sizes="62vw"/></span>:<span className="process-lead"><span className="sr-only">{copy.from}</span><Image src="/process/process-lead-20260709.png" alt="" fill sizes="62vw"/></span>}{en?null:<>до <i><span className="living-word">живого</span><br/><span className="process-experience">опыта.</span></i></>}</h2><div className="process-scope" data-tilt>
        {copy.frames.map((alt,index)=><div className={`process-frame pf-${index+1}`} key={alt}><img src={`/process/0${index+1}-${["background.png","grid.png","relief.png","live.png"][index]}`} alt={alt}/></div>)}
        <span className="process-caption">01 / ИМПУЛЬС</span>
      </div></div>
      <div className="steps">{copy.steps.map(s=><article className="step" key={s[0]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div>
    </section>

    <section className="tools" data-scene><p className="label">Tools in motion / 04</p><div className="marquee m1"><div>Figma · After Effects · GSAP · ScrollTrigger · Next.js · Webflow ·&nbsp;</div><div>Figma · After Effects · GSAP · ScrollTrigger · Next.js · Webflow ·&nbsp;</div></div><div className="marquee m2"><div>AI Image · AI Video · Art Direction · Motion Storytelling · Wix · Builder.io ·&nbsp;</div><div>AI Image · AI Video · Art Direction · Motion Storytelling · Wix · Builder.io ·&nbsp;</div></div><p className="tools-note">{copy.toolsNote}</p></section>

    <footer className="contact" id="contact" data-scene><div className="contact-orbit" data-tilt><i/><i/></div><div className="contact-video"><video src="/projects/hero-scroll.mp4" muted autoPlay loop playsInline preload="metadata"/><span>Motion portrait / 05</span></div><p className="label">{copy.contact}</p><h2 className={`contact-clay-title${en?" is-english":""}`}><span className="sr-only">{copy.contactTitle}</span>{en?<Image src="/contact/contact-title-en.png" alt="" fill sizes="50vw"/>:<Image src="/contact/contact-title-user.png" alt="" fill sizes="50vw"/>}</h2><p>{copy.contactCopy}</p><div className="contact-actions"><a href={telegramUrl} target="_blank" rel="noreferrer" data-magnetic>{copy.write} <span>↗</span></a><a href={projectsDriveUrl} target="_blank" rel="noreferrer" data-magnetic>{copy.viewProjects} <span>↑</span></a></div><div className="footer-line"><span>Dubai / Worldwide</span><span>© 2026 Катя Иванушкина</span><a href="#hero">{copy.back}</a></div></footer>
  </main>
</Experience>}

export default function Home(){return <LanguageProvider><Portfolio/></LanguageProvider>}
