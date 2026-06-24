import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { LatencyVisual, SessionStack, FeeVisual } from "@/components/visuals";
import { DOCS_URL, LOGIN_URL } from "@/lib/links";

/* ── small primitives ─────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/* ── content ──────────────────────────────────────────────────── */

const FEATURES = [
  {
    visual: <LatencyVisual />,
    title: "Low-latency execution",
    body: "Dedicated servers and optimized routing across 10+ landing services so your orders hit the market first.",
  },
  {
    visual: <SessionStack />,
    title: "Private infrastructure",
    body: "Exclusive access to tools built for serious traders — not the public. Provisioned and tuned for you.",
  },
  {
    visual: <FeeVisual />,
    title: "Fee optimization",
    body: "Save more on every transaction with intelligent fee reduction that compounds across your volume.",
  },
];

const STANDARDS = [
  "Optimized for Axiom traders",
  "Multi-wallet session control",
  "Local-first security model",
  "No third-party data sharing",
];

const STEPS = [
  {
    n: "01",
    title: "Request access",
    body: "Apply for a private account. We verify and provision a dedicated environment built around how you trade.",
  },
  {
    n: "02",
    title: "Connect your wallets",
    body: "Multi-wallet session control with a local-first security model. Your keys and data stay yours — nothing is shared with third parties.",
  },
  {
    n: "03",
    title: "Trade with an edge",
    body: "Low-latency execution and optimized routing across 10+ landing services, with fees reduced on every transaction.",
  },
];

const FAQ = [
  {
    q: "Who is Overide for?",
    a: "Serious, high-volume market participants who need private infrastructure, lower fees, and faster execution than public tooling can offer.",
  },
  {
    q: "How is execution faster?",
    a: "Dedicated servers and optimized routing across 10+ landing services reduce the path between your intent and the market — the milliseconds that decide outcomes.",
  },
  {
    q: "How is my data handled?",
    a: "Overide uses a local-first security model with multi-wallet session control and no third-party data sharing. Private tools require private standards.",
  },
  {
    q: "How do I get access?",
    a: "Access is private. Request an account and, once verified, we provision your environment so you can connect your wallets and start trading.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* HERO */}
        <section id="hero" className="border-b border-line">
          <div className="container-max border-x border-line">
            <div className="relative overflow-hidden">
              <HeroBackground />
              <div className="relative flex min-h-[78vh] flex-col items-center justify-center gap-8 px-6 py-28 text-center">
                <Reveal delay={0}>
                  <Eyebrow>Private trading infrastructure</Eyebrow>
                </Reveal>
                <Reveal delay={0.08}>
                  <h1 className="display max-w-4xl text-[clamp(2.75rem,7vw,5rem)]">
                    Private tools for advanced traders
                  </h1>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="max-w-xl text-lg leading-relaxed text-muted">
                    Lower fees. Faster execution. Dedicated infrastructure built
                    for serious market participants.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button href={LOGIN_URL} external>
                      Get Access
                    </Button>
                    <Button href={DOCS_URL} variant="secondary" external>
                      Read the docs
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.32}>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-tight text-faint">
                    <span>10+ landing services</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Low-latency routing</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Local-first security</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="border-b border-line">
          <div className="container-max border-x border-line px-6 py-24">
            <Reveal>
              <p className="mx-auto max-w-3xl text-center text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-muted">
                When milliseconds matter,{" "}
                <span className="text-white">infrastructure decides outcomes.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="border-b border-line">
          <div className="container-max border-x border-line">
            <Reveal>
              <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
                <Eyebrow>Built for edge</Eyebrow>
                <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
                  What you get
                </h2>
                <p className="max-w-xl text-muted">
                  We handle the technical layer so you can focus on the trade.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 border-t border-line md:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={i * 0.1}
                  className={`group flex flex-col bg-card transition-colors hover:bg-elevated ${
                    i < FEATURES.length - 1
                      ? "border-b border-line md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <div className="grid-dots relative h-[200px] overflow-hidden border-b border-line">
                    {f.visual}
                  </div>
                  <div className="flex flex-col gap-3 p-8">
                    <h3 className="display text-xl">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* STANDARDS */}
        <section className="border-b border-line">
          <div className="container-max border-x border-line">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <Reveal className="flex flex-col justify-center gap-5 border-line p-8 md:p-14 lg:border-r">
                <Eyebrow>Trusted by serious traders</Eyebrow>
                <h2 className="display text-[clamp(2rem,4vw,3rem)]">
                  Private tools require private standards
                </h2>
                <p className="max-w-md text-muted">
                  Overide is closed by design. Every layer — from session control
                  to data handling — is built so your edge stays yours.
                </p>
                <div className="mt-2">
                  <Button href={LOGIN_URL} external>
                    Get Access
                  </Button>
                </div>
              </Reveal>

              <ul className="grid grid-cols-1 sm:grid-cols-2">
                {STANDARDS.map((s, i) => (
                  <li
                    key={s}
                    className={`flex items-start gap-3 p-8 md:p-10 ${
                      i % 2 === 0 ? "sm:border-r border-line" : ""
                    } ${i < 2 ? "border-b border-line" : ""}`}
                  >
                    <Reveal delay={i * 0.08} className="flex items-start gap-3">
                      <span className="mt-1 text-accent">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-white">{s}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="border-b border-line">
          <div className="container-max border-x border-line">
            <Reveal>
              <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
                <Eyebrow>How it works</Eyebrow>
                <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
                  From access to edge
                </h2>
                <p className="max-w-xl text-muted">
                  A short, private onboarding — then you trade faster and save more.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 border-t border-line md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal
                  key={s.n}
                  delay={i * 0.1}
                  className={`flex flex-col gap-5 p-8 md:p-10 ${
                    i < STEPS.length - 1
                      ? "border-b border-line md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <span className="font-mono text-sm text-accent">{s.n}</span>
                  <h3 className="display text-xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b border-line">
          <div className="container-max border-x border-line">
            <Reveal>
              <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
                  Common questions
                </h2>
              </div>
            </Reveal>

            <div className="border-t border-line">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.06}>
                  <details className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 md:px-10">
                      <span className="display text-lg">{item.q}</span>
                      <span className="text-muted transition-transform group-open:rotate-45">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-7 md:px-10">
                      <p className="max-w-2xl text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-line">
          <div className="container-max border-x border-line">
            <div className="relative overflow-hidden">
              <div className="grid-dots pointer-events-none absolute inset-0 opacity-50" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(100% 100% at 50% 120%, rgba(34,112,255,0.22), transparent 60%)",
                }}
              />
              <div className="relative flex flex-col items-center gap-7 px-6 py-28 text-center">
                <Reveal>
                  <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)]">
                    Join traders who move faster and save more
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="max-w-lg text-muted">
                    Access is private. Request an account and put dedicated
                    infrastructure behind every order.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button href={LOGIN_URL} external>
                      Get Access
                    </Button>
                    <Button href={DOCS_URL} variant="secondary" external>
                      Read the docs
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
