/* Custom card visuals — built in SVG/CSS, in the same dark, bordered,
   blue-accent language as the rest of the site. */

/* 1 — Low-latency execution: a rising throughput curve on a faint grid
   with a floating "filled" latency chip. */
export function LatencyVisual() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-px w-full bg-white/[0.06]" />
        ))}
      </div>
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2270ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2270ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 172 C 60 164 92 124 140 112 S 232 64 320 28 L320 200 L0 200 Z"
          fill="url(#lat)"
        />
        <path
          d="M0 172 C 60 164 92 124 140 112 S 232 64 320 28"
          fill="none"
          stroke="#2270ff"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-[2px] border border-line bg-bg/90 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-xs text-white">12 ms · filled</span>
      </div>
    </div>
  );
}

/* 2 — Private infrastructure: a stack of session rows, masked top/bottom. */
const SESSION_ROWS = [
  { t: "Wallet connected", s: "Multi-wallet session", time: "local", icon: "check" },
  { t: "Session secured", s: "Local-first model", time: "now", icon: "lock" },
  { t: "Routing tuned", s: "10+ landing services", time: "live", icon: "bolt" },
] as const;

function RowIcon({ name }: { name: "check" | "lock" | "bolt" }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none" as const };
  if (name === "lock")
    return (
      <svg {...common} aria-hidden="true">
        <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  if (name === "bolt")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden="true">
      <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SessionStack() {
  const mask =
    "linear-gradient(180deg, transparent 0%, #000 24%, #000 76%, transparent 100%)";
  return (
    <div
      className="relative h-full w-full overflow-hidden p-5"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="flex flex-col gap-3">
        {SESSION_ROWS.map((r, i) => (
          <div
            key={r.t}
            className="flex items-center gap-3 rounded-[3px] border border-line bg-bg px-3.5 py-3"
            style={{ transform: i % 2 ? "rotate(1.1deg)" : "rotate(-1deg)" }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-[2px] bg-accent/15 text-accent">
              <RowIcon name={r.icon} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{r.t}</p>
              <p className="truncate text-[0.7rem] text-muted">{r.s}</p>
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-tight text-faint">
              {r.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3 — Fee optimization: a big savings stat with comparison bars. */
export function FeeVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-6 p-7">
      <div className="flex items-end gap-3">
        <span className="font-mono text-[3.25rem] font-semibold leading-none tracking-tight text-white">
          −42%
        </span>
        <span className="pb-1 font-mono text-[0.65rem] uppercase tracking-tight text-muted">
          avg. fees
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="mb-1 flex justify-between font-mono text-[0.65rem] uppercase tracking-tight text-faint">
            <span>Standard</span>
            <span>100%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/[0.07]">
            <div className="h-full w-full rounded-full bg-white/15" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between font-mono text-[0.65rem] uppercase tracking-tight text-faint">
            <span>With Overide</span>
            <span>58%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/[0.07]">
            <div className="h-full rounded-full bg-accent" style={{ width: "58%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
