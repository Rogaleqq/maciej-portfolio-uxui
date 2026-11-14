import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { ServiceItem } from '../data/portfolioData';

interface ServicesSectionProps {
  services: readonly ServiceItem[];
  activeServiceId: string;
  onSelectService: (serviceId: string) => void;
  onInquireService: (serviceTitle: string) => void;
}

export function ServicesSection({
  services,
  activeServiceId,
  onSelectService,
  onInquireService,
}: ServicesSectionProps) {
  const activeService = services.find((item) => item.id === activeServiceId) ?? services[0];

  return (
    <section id="uslugi" className="bg-ink text-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl space-y-3 border-b border-white/15 pb-10">
          <p className="font-mono text-xs font-medium text-[#ff6b52]">
            Usługi · Wartość dla Twojego projektu
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Jak mogę wesprzeć Twoją firmę lub produkt cyfrowy.
          </h2>
          <p className="text-base leading-relaxed text-white/75">
            Wybierz obszar, aby zobaczyć konkretny zakres prac oraz korzyść, jaką wnosi do
            projektu.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col divide-y divide-white/15 lg:col-span-5">
            {services.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  aria-expanded={isSelected}
                  className={`group flex w-full items-start justify-between gap-4 py-6 text-left transition-colors duration-150 ${
                    isSelected ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isSelected ? 'text-[#ff6b52]' : 'text-white/50'
                        }`}
                      >
                        {service.index}
                      </span>
                      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="pl-7 text-sm leading-relaxed text-white/70">{service.tagline}</p>
                  </div>

                  <ArrowRight
                    className={`mt-1.5 h-5 w-5 shrink-0 transition-transform duration-150 ${
                      isSelected
                        ? 'translate-x-0 text-[#ff6b52]'
                        : '-translate-x-1 text-white/40 group-hover:translate-x-0 group-hover:text-white'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-10"
            >
              <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
                  <div>
                    <p className="font-mono text-xs text-[#ff6b52]">
                      {activeService.index} · Szczegóły usługi
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                      {activeService.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-mono text-xs text-white/55">Orientacyjny czas</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {activeService.typicalDuration}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-xs text-white/60">Co zyskujesz</p>
                  <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                    {activeService.clientValue}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-mono text-xs text-white/60">Co powstaje w trakcie prac</p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeService.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/85"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b52]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/15 pt-5">
                  <p className="font-mono text-xs text-white/55">Dla kogo</p>
                  <p className="mt-1 text-sm text-white/85">{activeService.idealFor}</p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onInquireService(activeService.title)}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover whitespace-nowrap shrink-0"
                >
                  <span>Zapytaj o: {activeService.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
