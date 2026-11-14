import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { PortfolioProject } from '../utils/portfolioLogic';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onInquireSimilar: (project: PortfolioProject) => void;
}

type ModalTab = 'proces' | 'audyt' | 'system';

export function CaseStudyModal({ project, onClose, onInquireSimilar }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('proces');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActiveTab('proces');
    setImageError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-3 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-canvas text-ink shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-canvas/95 px-5 py-4 backdrop-blur-sm sm:px-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span className="tabular-nums text-accent">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.conceptLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.categories.join(' / ')}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij studium przypadku"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-canvas whitespace-nowrap shrink-0"
          >
            <span>Zamknij</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-8 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-6">
              <h2
                id="case-study-modal-title"
                className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl"
              >
                {project.title}
              </h2>
              <p className="text-base font-medium text-ink/85">{project.subtitle}</p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{project.brief}</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-stone lg:col-span-6">
              <div className="aspect-[4/3] w-full">
                {!imageError ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8 text-center font-display text-xl font-semibold text-ink">
                    {project.title}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Szczegóły projektu koncepcyjnego"
            className="flex flex-wrap items-center gap-2 border-b border-border pb-4"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'proces'}
              onClick={() => setActiveTab('proces')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'proces'
                  ? 'bg-ink text-canvas'
                  : 'bg-stone/70 text-muted hover:text-ink'
              }`}
            >
              Wyzwanie i rozwiązanie
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'audyt'}
              onClick={() => setActiveTab('audyt')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'audyt'
                  ? 'bg-ink text-canvas'
                  : 'bg-stone/70 text-muted hover:text-ink'
              }`}
            >
              Analiza tarcia: Przed i Po
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'system'}
              onClick={() => setActiveTab('system')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'system'
                  ? 'bg-ink text-canvas'
                  : 'bg-stone/70 text-muted hover:text-ink'
              }`}
            >
              System wizualny i zakres
            </button>
          </div>

          {activeTab === 'proces' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs font-medium text-accent">01 · Problem UX</p>
                <h3 className="font-display text-xl font-bold text-ink">Co sprawiało trudność</h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-surface p-6">
                <p className="font-mono text-xs font-medium text-accent">02 · Decyzja projektowa</p>
                <h3 className="font-display text-xl font-bold text-ink">Zaproponowana struktura</h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-3 md:col-span-2">
                <h4 className="font-display text-lg font-semibold text-ink">
                  Założenia użytecznościowe projektu
                </h4>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.uxGoals.map((goal) => (
                    <li
                      key={goal}
                      className="rounded-xl border border-border bg-stone/40 p-4 text-sm leading-relaxed text-ink"
                    >
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'audyt' && (
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Zestawienie typowych problemów interfejsowych zidentyfikowanych w fazie analizy oraz
                kierunku zmian wprowadzonych w koncepcji.
              </p>
              <div className="space-y-4">
                {project.auditComparison.map((point) => (
                  <div
                    key={point.area}
                    className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface p-6 md:grid-cols-12"
                  >
                    <div className="md:col-span-3">
                      <p className="font-mono text-xs text-muted">Obszar analizy</p>
                      <h3 className="mt-1 font-display text-lg font-bold text-ink">{point.area}</h3>
                    </div>
                    <div className="space-y-1 md:col-span-4">
                      <p className="font-mono text-xs text-muted">Typowy problem (Przed)</p>
                      <p className="text-sm leading-relaxed text-ink/80">{point.before}</p>
                    </div>
                    <div className="space-y-1 md:col-span-5">
                      <p className="font-mono text-xs text-accent">Rozwiązanie koncepcyjne (Po)</p>
                      <p className="text-sm leading-relaxed text-ink">{point.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-xl font-bold text-ink">Fundamenty systemu</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-mono text-xs text-muted">Siatka i rytm</dt>
                    <dd className="mt-1 font-medium text-ink">{project.visualSystem.grid}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted">Typografia</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {project.visualSystem.typography}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted">Kierunek kolorystyczny</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {project.visualSystem.paletteNote}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-xl font-bold text-ink">Zakres prac w koncepcji</h3>
                <ul className="space-y-2.5 text-sm text-ink">
                  {project.deliverables.map((item, idx) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-mono text-xs tabular-nums text-accent pt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">
              Potrzebujesz podobnego podejścia przy swoim produkcie lub stronie?
            </p>
            <button
              type="button"
              onClick={() => onInquireSimilar(project)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover whitespace-nowrap shrink-0"
            >
              <span>Porozmawiajmy o podobnym projekcie</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
