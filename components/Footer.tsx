import { Logo } from "./Logo";
import { DOCS_URL, LOGIN_URL, TWITTER_URL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-max border-x border-line">
        <div className="grid grid-cols-1 gap-y-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted">
              Private tools for advanced traders. Lower fees, faster execution,
              dedicated infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-muted">Product</span>
            <a href="#features" className="text-sm text-muted hover:text-white">
              Features
            </a>
            <a href="#how" className="text-sm text-muted hover:text-white">
              How it works
            </a>
            <a href="#faq" className="text-sm text-muted hover:text-white">
              FAQ
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-muted">Links</span>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-white"
            >
              Docs
            </a>
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-white"
            >
              Login
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-white"
            >
              Twitter / X
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line px-6 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Overide. Private tools for advanced traders.</span>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            @overidexyz
          </a>
        </div>
      </div>
    </footer>
  );
}
