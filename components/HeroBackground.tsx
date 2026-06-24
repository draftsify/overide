/* Animated hero backdrop: a faded line grid with slow, drifting blue
   glows. Pure CSS (see globals.css), respects prefers-reduced-motion. */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-glow hero-glow--1" />
      <div className="hero-glow hero-glow--2" />
      <div className="hero-glow hero-glow--3" />
      {/* fade the bottom into the section border */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, #0a0a0a, transparent)",
        }}
      />
    </div>
  );
}
