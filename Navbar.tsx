import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#projekty', label: 'Projekty' },
  { href: '#uslugi', label: 'Usługi' },
  { href: '#podejscie', label: 'Podejście' },
  { href: '#o-mnie', label: 'O mnie' },
];

const LOGO_SRC = '/assets/aistudio/Minimalistyczne_logo_MR_z_czerwon__kropk__02bd2e3c.png';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            aria-label="Maciej Rogaczewski — strona główna"
            className="inline-flex items-center shrink-0 py-1"
          >
            {!logoError ? (
              <img
                src={LOGO_SRC}
                alt="Logo MR — Maciej Rogaczewski"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
            ) : (
              <span className="font-display text-lg font-bold tracking-tight text-ink whitespace-nowrap">
                Maciej Rogaczewski
              </span>
            )}
          </a>

          <nav
            aria-label="Nawigacja główna"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-muted"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 text-muted transition-colors duration-150 hover:text-ink whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#kontakt"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-canvas transition-colors duration-150 hover:bg-accent whitespace-nowrap shrink-0"
            >
              Porozmawiajmy
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji'}
              className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-ink transition-colors hover:bg-stone"
            >
              {mobileOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
              <span>{mobileOpen ? 'Zamknij' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobilne"
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between bg-canvas px-6 py-8 md:hidden"
        >
          <nav aria-label="Nawigacja mobilna" className="flex flex-col divide-y divide-border">
            {NAV_LINKS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between py-5 font-display text-2xl font-semibold text-ink transition-colors hover:text-accent"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs tabular-nums text-muted">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-4 border-t border-border pt-6">
            <p className="text-sm text-muted">
              Masz pomysł na produkt cyfrowy lub stronę, która wymaga odświeżenia?
            </p>
            <a
              href="#kontakt"
              onClick={handleLinkClick}
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Rozpocznij rozmowę
            </a>
          </div>
        </div>
      )}
    </>
  );
}
