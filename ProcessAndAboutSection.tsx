import { useState } from 'react';
import { motion } from 'motion/react';
import { ABOUT_IMAGE, PROCESS_STEPS, type ProcessStep } from '../data/portfolioData';

const TOOLKIT = [
  'Figma (Auto Layout & Komponenty)',
  'Webflow & CMS',
  'Architektura informacji',
  'Audyty użyteczności (WCAG)',
  'Prototypowanie interakcji',
  'Podstawy HTML / CSS',
];

function ProcessSchematic({ step }: { step: ProcessStep }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-xs text-muted">{step.artifactName}</span>
        <span className="font-mono text-xs tabular-nums text-accent">Etap {step.index}</span>
      </div>

      <div className="my-8 flex min-h-[210px] items-center justify-center">
        {step.wireframeMode === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="grid w-full max-w-md grid-cols-3 gap-3"
          >
            <div className="rounded-xl border border-border bg-stone/60 p-4">
              <div className="h-2 w-10 rounded bg-accent/70" />
              <div className="mt-3 h-2 w-full rounded bg-ink/15" />
              <div className="mt-1.5 h-2 w-3/4 rounded bg-ink/10" />
            </div>
            <div className="rounded-xl border border-ink/25 bg-canvas p-4">
              <div className="h-2 w-12 rounded bg-ink/70" />
              <div className="mt-3 h-2 w-full rounded bg-ink/15" />
              <div className="mt-1.5 h-2 w-2/3 rounded bg-ink/10" />
            </div>
            <div className="rounded-xl border border-border bg-stone/60 p-4">
              <div className="h-2 w-9 rounded bg-ink/40" />
              <div className="mt-3 h-2 w-full rounded bg-ink/15" />
              <div className="mt-1.5 h-2 w-4/5 rounded bg-ink/10" />
            </div>
            <div className="col-span-3 flex items-center justify-between rounded-xl border border-dashed border-border px-4 py-3">
              <span className="font-mono text-xs text-muted">Cel użytkownika</span>
              <span className="font-mono text-xs text-ink">Klarowność oferty i kontakt</span>
            </div>
          </motion.div>
        )}

        {step.wireframeMode === 'wireframe' && (
          <motion.div
            key="wireframe"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md space-y-3 rounded-xl border border-border bg-canvas p-4"
          >
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="h-2.5 w-20 rounded bg-ink/25" />
              <div className="flex gap-2">
                <div className="h-2 w-8 rounded bg-ink/15" />
                <div className="h-2 w-8 rounded bg-ink/15" />
                <div className="h-2 w-10 rounded bg-accent/60" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 pt-1">
              <div className="col-span-7 space-y-2">
                <div className="h-4 w-full rounded bg-ink/20" />
                <div className="h-4 w-4/5 rounded bg-ink/20" />
                <div className="h-2.5 w-3/4 rounded bg-ink/10" />
                <div className="mt-3 h-7 w-28 rounded border border-ink/30 bg-stone" />
              </div>
              <div className="col-span-5 h-28 rounded-lg border border-dashed border-ink/25 bg-stone/60" />
            </div>
          </motion.div>
        )}

        {step.wireframeMode === 'interface' && (
          <motion.div
            key="interface"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md space-y-3 rounded-xl border border-ink/15 bg-ink p-5 text-canvas"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-white/60">Skala 1.25 · Kontrast AA</span>
              <span className="h-2.5 w-14 rounded bg-accent" />
            </div>
            <div className="space-y-1.5 pt-2">
              <p className="font-display text-lg font-bold text-white">Wyrazista hierarchia</p>
              <p className="text-xs leading-relaxed text-white/70">
                Świadomy odstęp, jeden punkt skupienia oraz płynna reakcja na kursor.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="rounded-lg bg-white/10 p-2.5 font-mono text-[11px] text-white/80">
                16 px
              </div>
              <div className="rounded-lg bg-white/10 p-2.5 font-mono text-[11px] text-white/80">
                24 px
              </div>
              <div className="rounded-lg bg-accent p-2.5 font-mono text-[11px] text-white">
                CTA
              </div>
            </div>
          </motion.div>
        )}

        {step.wireframeMode === 'audit' && (
          <motion.div
            key="audit"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md space-y-2.5"
          >
            {[
              { label: 'Responsywność 390 px / 1440 px', status: 'Sprawdzone' },
              { label: 'Nawigacja klawiaturą i fokus', status: 'Sprawdzone' },
              { label: 'Kontrast tekstu i przycisków WCAG', status: 'Sprawdzone' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-border bg-canvas px-4 py-3"
              >
                <span className="text-xs font-medium text-ink">{row.label}</span>
                <span className="font-mono text-xs text-accent">{row.status}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted">{step.description}</p>
    </div>
  );
}

export function ProcessAndAboutSection() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [portraitError, setPortraitError] = useState(false);

  const activeStep = PROCESS_STEPS[activeStepIdx] ?? PROCESS_STEPS[0];

  return (
    <>
      <section
        id="podejscie"
        className="mx-auto max-w-[1360px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
            <div className="space-y-3">
              <p className="font-mono text-xs font-medium text-accent">
                Podejście · Metodologia pracy
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Każda decyzja wizualna wynika ze struktury, a nie odwrotnie.
              </h2>
            </div>

            <div className="space-y-2">
              {PROCESS_STEPS.map((step, index) => {
                const isSelected = index === activeStepIdx;
                return (
                  <button
                    key={step.index}
                    type="button"
                    onClick={() => setActiveStepIdx(index)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors duration-150 ${
                      isSelected
                        ? 'border-ink bg-surface shadow-xs'
                        : 'border-transparent hover:border-border hover:bg-stone/50'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums pt-1 ${
                        isSelected ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {step.index}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                      <p className="mt-0.5 text-sm text-muted">{step.lead}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <ProcessSchematic step={activeStep} />
          </div>
        </div>
      </section>

      <section id="o-mnie" className="border-t border-border bg-stone/40 py-20 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="h-[380px] overflow-hidden rounded-2xl border border-border bg-stone sm:h-[460px] lg:h-full">
                {!portraitError ? (
                  <img
                    src={ABOUT_IMAGE}
                    alt="Maciej Rogaczewski podczas szkicowania makiet interfejsu przy biurku w pracowni"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col justify-end bg-stone p-8">
                    <p className="font-display text-2xl font-bold text-ink">Maciej Rogaczewski</p>
                    <p className="mt-1 text-sm text-muted">UX/UI & Web Designer · Polska</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-8 lg:col-span-7">
              <div className="space-y-5">
                <p className="font-mono text-xs font-medium text-accent">
                  O mnie · Polska
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Cześć, jestem Maciej Rogaczewski.
                </h2>
                <p className="text-base leading-relaxed text-ink/90 sm:text-lg">
                  Projektuję przejrzyste interfejsy i strony internetowe z myślą o tym, jak realny
                  człowiek porusza się po ekranie, czyta treść i podejmuje decyzje.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Ukończyłem kurs UX/UI Designera i konsekwentnie rozwijam własny warsztat — od
                  analizy użyteczności i architektury informacji po dopracowane wdrożenia w
                  Webflow. Nie buduję pustej legendy wokół wieloletniego stażu: zamiast tego
                  stawiam na rzetelne przygotowanie, uważność na detale oraz pełne zaangażowanie w
                  każdy powierzony temat.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Najlepiej odnajduję się we współpracy z firmami, młodymi markami i niezależnymi
                  przedsiębiorcami, którzy chcą uporządkować swoją obecność w sieci i mówić do
                  klientów językiem prostoty.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <p className="font-mono text-xs text-muted">Narzędzia i kompetencje</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {TOOLKIT.map((tool, index) => (
                    <li
                      key={tool}
                      className="flex items-center gap-3 text-sm font-medium text-ink"
                    >
                      <span className="font-mono text-xs tabular-nums text-accent">
                        0{index + 1}
                      </span>
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
