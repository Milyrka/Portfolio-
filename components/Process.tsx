const steps = [
  ["01", "Idea", "Нахожу центральную мысль и формулирую, что зритель должен почувствовать."],
  ["02", "Visual direction", "Собираю материальность, цвет, типографику и визуальные правила мира."],
  ["03", "Motion scenario", "Режиссирую движение: где пауза, где напряжение, где главный кадр."],
  ["04", "Interactive prototype", "Проверяю историю в прототипе — на скролле, касании и разных экранах."],
  ["05", "Final website", "Собираю чистый, адаптивный сайт и довожу ощущения до финального ритма."],
];

export function Process() {
  return (
    <section className="process" id="process">
      <div className="process-sticky">
        <p className="section-index reveal">03 — Процесс</p>
        <h2 className="section-title reveal">Как я создаю<br /><i>проект</i></h2>
        <div className="process-orb" aria-hidden="true"><span /></div>
      </div>
      <div className="timeline">
        {steps.map(([number, title, text]) => (
          <article className="timeline-step reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>
        ))}
      </div>
    </section>
  );
}
