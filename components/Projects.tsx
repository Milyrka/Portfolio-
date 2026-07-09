import { ProjectVisual } from "./ProjectVisual";

const projects = [
  { no: "01", name: "ALTERRA Collection", type: "alterra", description: "Cinematic scroll experience для премиальной сети отелей.", tags: "Motion · Web · GSAP · Storytelling", href: "https://alterra-project.vercel.app/" },
  { no: "02", name: "KASKAD", type: "kaskad", description: "Immersive web experience с архитектурой, природой и scroll-storytelling.", tags: "Concept · Web · Art direction", href: "https://kaskad-private-forest-residence.vercel.app/" },
  { no: "03", name: "ГРАНЬ", type: "gran", description: "Luxury product website для интерьерного аромата.", tags: "E-commerce · Motion · Visual concept", href: "https://www.behance.net/gallery/251495485/gran-internet-magazin-aromatov-dlja-doma-E-commerce" },
  { no: "04", name: "Dental Premium Card", type: "dental", description: "Motion website-визитка для стоматолога с мягкой клинической эстетикой.", tags: "Motion · Next.js · Identity", href: "#contact" },
];

export function Projects() {
  return (
    <section className="projects section-shell" id="projects">
      <div className="projects-heading">
        <p className="section-index reveal">02 — Избранные проекты</p>
        <h2 className="section-title reveal">Selected<br /><i>projects</i></h2>
        <p className="projects-note reveal">Каждый проект — отдельный визуальный мир со своим ритмом, светом и драматургией.</p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <a className="project-card reveal" href={project.href} key={project.name} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <ProjectVisual type={project.type} />
            <div className="project-meta"><span>{project.no}</span><h3>{project.name}</h3><p>{project.description}</p><small>{project.tags}</small><b>↗</b></div>
          </a>
        ))}
      </div>
    </section>
  );
}
