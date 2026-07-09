export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-orbit" aria-hidden="true">
        <div className="relief relief-a" />
        <div className="relief relief-b" />
        <div className="glass-frame"><span>IDEA</span><i /><span>MOTION</span></div>
      </div>
      <div className="hero-copy">
        <p className="eyebrow reveal">Независимый motion / digital designer</p>
        <h1 className="display kinetic" aria-label="Motion & Digital Design">
          <span>Motion <em>&amp;</em></span>
          <span>Digital Design</span>
        </h1>
        <div className="hero-bottom reveal">
          <p className="hero-en">Cinematic websites, visual concepts<br />and interactive brand stories.</p>
          <p className="hero-ru">Я создаю визуальные идеи, motion-концепции и интерактивные digital-истории для брендов, продуктов и премиальных веб-проектов.</p>
        </div>
      </div>
      <div className="scroll-mark" aria-hidden="true"><span>scroll</span><i /></div>
    </section>
  );
}
