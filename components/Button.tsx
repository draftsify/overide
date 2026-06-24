import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function Button({ href, children, variant = "primary", external }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-[2px] px-4 py-3 font-mono text-[0.8125rem] font-semibold uppercase tracking-tight transition-colors";
  const styles =
    variant === "primary"
      ? "bg-white text-[#0a0a0a] hover:bg-white/85"
      : "bg-white/10 text-white hover:bg-white/15";

  const cls = `${base} ${styles}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
