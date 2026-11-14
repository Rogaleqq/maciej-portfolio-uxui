import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { Navbar } from './components/Navbar';
import { ProcessAndAboutSection } from './components/ProcessAndAboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { PORTFOLIO_PROJECTS, SERVICES_LIST } from './data/portfolioData';
import type { PortfolioProject } from './utils/portfolioLogic';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_LIST[0].id);
  const [preselectedContactService, setPreselectedContactService] = useState<string>('UX/UI Design');

  const scrollToContactWithService = (serviceName: string) => {
    setPreselectedContactService(serviceName);
    const contactEl = document.getElementById('kontakt');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromProject = (project: PortfolioProject) => {
    const primaryCategory = project.categories[0];
    const mappedService =
      primaryCategory === 'Audyt UX'
        ? 'Audyt UX i optymalizacja'
        : primaryCategory === 'Webflow'
          ? 'Webflow Development'
          : primaryCategory;

    setSelectedProject(null);
    scrollToContactWithService(mappedService);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink selection:bg-accent selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Przejdź do głównej treści
        </a>

        <Navbar />

        <main id="main-content">
          <HeroSection
            onSelectServicePillar={(serviceId) => {
              setActiveServiceId(serviceId);
            }}
          />

          <MarqueeStrip />

          <ProjectsSection
            projects={PORTFOLIO_PROJECTS}
            onOpenProject={(project) => setSelectedProject(project)}
          />

          <ServicesSection
            services={SERVICES_LIST}
            activeServiceId={activeServiceId}
            onSelectService={setActiveServiceId}
            onInquireService={scrollToContactWithService}
          />

          <ProcessAndAboutSection />

          <ContactSection preselectedService={preselectedContactService} />
        </main>

        <Footer />

        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onInquireSimilar={handleInquireFromProject}
        />
      </div>
    </MotionConfig>
  );
}
