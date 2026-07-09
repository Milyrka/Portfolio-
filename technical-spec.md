# Technical spec

- Next.js App Router, React 19, TypeScript, GSAP 3.15 + ScrollTrigger.
- Tier A: CSS/GSAP depth; real 3D is unnecessary for the plaster-film metaphor.
- Hot paths animate transform and opacity only.
- Desktop max active depth layers: 3; mobile: 1.
- Responsive breakpoints: 1100px / 760px.
- Reduced motion: all timeline choreography disabled; static composition stays complete.
