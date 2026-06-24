import { Logo } from "./Logo";
import { Button } from "./Button";
import { DOCS_URL, LOGIN_URL } from "@/lib/links";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="container-max border-x border-line px-6">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <a href="#hero" className="shrink-0">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="font-mono text-sm text-muted transition-colors hover:text-white"
            >
              Features
            </a>
            <a
              href="#how"
              className="font-mono text-sm text-muted transition-colors hover:text-white"
            >
              How it works
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted transition-colors hover:text-white"
            >
              Docs
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-sm text-muted transition-colors hover:text-white sm:inline"
            >
              Login
            </a>
            <Button href={LOGIN_URL} external>
              Get Access
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
