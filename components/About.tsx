const directions = [
  ["01", "Visual concept", "Идея, образ и визуальный язык, который невозможно спутать с другим."],
  ["02", "Motion direction", "Ритм, переходы и сценарий движения как часть смысла."],
  ["03", "Interactive experience", "Интерактив, который вовлекает, а не отвлекает от истории."],
];

export function About() {
  return (
    <section className="about section-shell" id="approach">
      <p className="section-index reveal">01 — Подход</p>
      <div className="about-intro">
        <h2 className="section-title reveal">Не просто дизайн.<br /><i>Визуальная история.</i></h2>
        <p className="about-text reveal">Я соединяю идею, визуальный стиль, motion и веб-интерактив, чтобы сайт ощущался не как страница, а как маленький цифровой фильм.</p>
      </div>
      <div className="directions">
        {directions.map(([number, title, text]) => (
          <article className="direction reveal" key={title}>
            <span>{number}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">↗</i>
          </article>
        ))}
      </div>
    </section>
  );
}
