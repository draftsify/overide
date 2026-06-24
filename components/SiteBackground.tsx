/* Site-wide animated backdrop: a fixed layer of slow-drifting blue glows
   behind all content. Subtle so text stays readable. Pure CSS, freezes for
   prefers-reduced-motion. */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="site-glow site-glow--a" />
      <div className="site-glow site-glow--b" />
      <div className="site-glow site-glow--c" />
    </div>
  );
}
