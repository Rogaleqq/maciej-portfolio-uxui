import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const FOOTER_LOGO_SRC = '/assets/aistudio/Minimalistyczne_logo_MR_na_czarnym_tle_76cd4796.png';

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="border-t border-white/15 bg-black py-12 text-white">
      <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-end sm:px-6 lg:px-10">
        <div className="space-y-4">
          {!logoError ? (
            <a
              href="#top"
              aria-label="Maciej Rogaczewski — wróć na górę strony"
              className="block h-16 w-48 overflow-hidden sm:h-20 sm:w-56"
            >
              <img
                src={FOOTER_LOGO_SRC}
                alt="Logo MR — Maciej Rogaczewski"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="h-full w-full scale-[1.25] object-cover object-center -translate-x-6 mix-blend-lighten"
              />
            </a>
          ) : (
            <p className="font-display text-base font-bold text-white">Maciej Rogaczewski</p>
          )}
          <p className="text-xs text-white/65">
            © 2026 Maciej Rogaczewski · UX/UI Designer & Web Designer · Polska
          </p>
        </div>

        <nav aria-label="Nawigacja w stopce" className="flex flex-wrap items-center gap-6 text-sm">
          <a href="#projekty" className="text-white/70 transition-colors hover:text-white">
            Projekty
          </a>
          <a href="#uslugi" className="text-white/70 transition-colors hover:text-white">
            Usługi
          </a>
          <a href="#podejscie" className="text-white/70 transition-colors hover:text-white">
            Podejście
          </a>
          <a href="#o-mnie" className="text-white/70 transition-colors hover:text-white">
            O mnie
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-[#ff6b52]"
          >
            <span>Na górę</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
