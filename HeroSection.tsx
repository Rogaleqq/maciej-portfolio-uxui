import { useState, type MouseEvent } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data/portfolioData';

interface HeroSectionProps {
  onSelectServicePillar: (serviceId: string) => void;
}

const PILLARS = [
  {
    index: '01',
    serviceId: 'ux-ui-design',
    title: 'UX/UI Design',
    note: 'Architektura ścieżek i przejrzyste interfejsy',
  },
  {
    index: '02',
    serviceId: 'web-design',
    title: 'Web Design',
    note: 'Strony z autorską typografią i rytmem',
  },
  {
    index: '03',
    serviceId: 'webflow-dev',
    title: 'Webflow Development',
    note: 'Responsywne wdrożenia gotowe do edycji',
  },
  {
    index: '04',
    serviceId: 'ux-audit',
    title: 'Audyt UX',
    note: 'Diagnoza barier i konkretny plan poprawek',
  },
];

export function HeroSection({ onSelectServicePillar }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    setPointerPos({ x, y });
  };

  return (
    <section
      id="top"
      className="mx-auto max-w-[1360px] px-4 pt-10 pb-14 sm:px-6 lg:px-10 lg:pt-14 lg:pb-20"
    >
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between lg:col-span-7"
        >
          <div className="space-y-6">
            <p className="font-mono text-xs font-medium tracking-wider text-muted">
              UX/UI Designer · Web Designer · Polska
            </p>

            <h1 className="font-display text-[clamp(2.35rem,4.5vw,4.15rem)] font-bold leading-[1.04] tracking-tight text-ink">
              Projektuję cyfrowe produkty, które prowadzą użytkownika bez zbędnego tarcia.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Łączę analityczne podejście UX z precyzyjną typografią, spójnym ruchem i wdrożeniem w
              Webflow. Pomagam firmom, startupom oraz markom osobistym porządkować przekazy i
              tworzyć czytelne doświadczenia cyfrowe.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 pt-4">
            <a
              href="#projekty"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover whitespace-nowrap shrink-0"
            >
              <span>Zobacz projekty koncepcyjne</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#uslugi"
              className="inline-flex min-h-[44px] items-center gap-2 border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition-colors duration-150 hover:border-accent hover:text-accent whitespace-nowrap shrink-0"
            >
              <span>Poznaj zakres usług</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPointerPos(null)}
            className="group relative h-[340px] overflow-hidden rounded-2xl border border-border bg-stone sm:h-[420px] lg:h-full lg:min-h-[460px]"
          >
            {!imageError ? (
              <img
                src={HERO_IMAGE}
                alt="Stanowisko pracy projektanta UX/UI Macieja Rogaczewskiego z makietami w szkicowniku"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full flex-col justify-between bg-stone p-8">
                <span className="font-mono text-xs text-muted">Szkicownik · Siatka 12-kolumnowa</span>
                <p className="font-display text-2xl font-bold text-ink">
                  Od makiety na papierze po działający interfejs.
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

            {pointerPos && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute hidden lg:block h-px w-full bg-white/25 transition-opacity duration-150"
                style={{ top: `${pointerPos.y}%` }}
              />
            )}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
              <div>
                <p className="font-mono text-xs text-white/80">
                  Pracownia cyfrowa · Polska
                </p>
                <p className="mt-1 font-display text-base font-semibold">
                  Od architektury informacji po wdrożenie w Webflow
                </p>
              </div>
              {pointerPos && (
                <span
                  aria-hidden="true"
                  className="hidden sm:inline font-mono text-xs tabular-nums text-white/80"
                >
                  {String(pointerPos.x).padStart(2, '0')} / {String(pointerPos.y).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <a
            key={pillar.index}
            href="#uslugi"
            onClick={() => onSelectServicePillar(pillar.serviceId)}
            className="group flex flex-col bg-surface p-6 transition-colors duration-150 hover:bg-stone/60"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-medium tabular-nums text-accent">
                {pillar.index}
              </span>
              <ArrowRight
                className="h-4 w-4 text-muted transition-transform duration-150 group-hover:translate-x-1 group-hover:text-ink"
                aria-hidden="true"
              />
            </div>
            <div className="mt-4">
              <h2 className="font-display text-lg font-semibold text-ink">{pillar.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{pillar.note}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
