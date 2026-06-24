export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-[6px] bg-white">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="#0a0a0a" strokeWidth="1.6" />
          <path d="M4.4 7h5.2" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-mono text-[1.05rem] font-semibold uppercase tracking-tight">
        Overide
      </span>
    </span>
  );
}
