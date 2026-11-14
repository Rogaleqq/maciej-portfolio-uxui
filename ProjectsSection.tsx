import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  countProjectsByCategory,
  filterProjectsByCategory,
  type DisciplineCategory,
  type PortfolioProject,
} from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  projects: readonly PortfolioProject[];
  onOpenProject: (project: PortfolioProject) => void;
}

const CATEGORIES: DisciplineCategory[] = [
  'Wszystkie',
  'UX/UI Design',
  'Web Design',
  'Webflow',
  'Audyt UX',
];

export function ProjectsSection({ projects, onOpenProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<DisciplineCategory>('Wszystkie');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const visibleProjects = filterProjectsByCategory(projects, activeCategory);

  return (
    <section id="projekty" className="mx-auto max-w-[1360px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="font-mono text-xs font-medium text-accent">
            Wybrane prace · Studia przypadków
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Projekty koncepcyjne zbudowane wokół realnych problemów użytkownika.
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Wszystkie prezentowane realizacje są projektami koncepcyjnymi stworzonymi w ramach
            rozwoju mojego warsztatu UX/UI po ukończeniu kursu. Każdy case study pokazuje mój
            proces myślowy — od analizy tarcia po decyzje wizualne.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtruj projekty według dziedziny"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-stone/70 p-1.5"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = countProjectsByCategory(projects, category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-ink text-canvas shadow-xs'
                    : 'text-muted hover:bg-surface/80 hover:text-ink'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    isActive ? 'text-canvas/80' : 'text-muted/80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
        {visibleProjects.map((project, index) => {
          const isWide = activeCategory === 'Wszystkie' && index === 0;
          const isBroken = Boolean(brokenImages[project.id]);

          return (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col justify-between border-b border-border pb-10 ${
                isWide ? 'md:col-span-2 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                aria-label={`Otwórz studium przypadku: ${project.title}`}
                className={`block w-full overflow-hidden rounded-2xl border border-border bg-stone text-left focus-visible:outline-2 focus-visible:outline-accent ${
                  isWide ? 'lg:col-span-7' : ''
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {!isBroken ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between bg-stone p-8">
                      <span className="font-mono text-xs text-muted">{project.index}</span>
                      <span className="font-display text-2xl font-bold text-ink">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
              </button>

              <div className={`mt-6 flex flex-col justify-between ${isWide ? 'lg:col-span-5 lg:mt-0' : ''}`}>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                    <span className="tabular-nums text-accent">{project.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.conceptLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.categories.join(' / ')}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
                    {project.title}
                  </h3>

                  <p className="text-sm font-medium text-ink/80">{project.subtitle}</p>

                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-canvas whitespace-nowrap shrink-0"
                  >
                    <span>Zobacz studium przypadku</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <span className="font-mono text-xs tabular-nums text-muted">{project.year}</span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
