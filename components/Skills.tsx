const skills = ["Figma", "After Effects", "GSAP", "Next.js", "Webflow / Wix / Builder.io", "AI image & video generation", "Art direction", "Motion storytelling"];

export function Skills() {
  return (
    <section className="skills section-shell">
      <p className="section-index reveal">04 — Инструменты и практика</p>
      <div className="skills-grid">
        <h2 className="section-title reveal">Среда, где идея<br /><i>становится опытом</i></h2>
        <div className="skill-list">{skills.map((skill, index) => <div className="skill reveal" key={skill}><span>{String(index + 1).padStart(2, "0")}</span><p>{skill}</p></div>)}</div>
      </div>
    </section>
  );
}
