export function ProjectVisual({ type }: { type: string }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-noise" />
      <div className="visual-object" />
      <div className="visual-caption"><span>Visual study</span><span>2026</span></div>
    </div>
  );
}
