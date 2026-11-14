export type DisciplineCategory =
  | 'Wszystkie'
  | 'UX/UI Design'
  | 'Web Design'
  | 'Webflow'
  | 'Audyt UX';

export interface ProjectAuditPoint {
  area: string;
  before: string;
  after: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  conceptLabel: string;
  categories: Exclude<DisciplineCategory, 'Wszystkie'>[];
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  uxGoals: string[];
  auditComparison: ProjectAuditPoint[];
  visualSystem: {
    grid: string;
    typography: string;
    paletteNote: string;
  };
}

export interface ContactBriefInput {
  name: string;
  email: string;
  service: string;
  timeline: string;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactBriefInput, string>>;
}

export interface ContactSlots {
  email: string;
  phone: string;
  linkedin: string;
  behance: string;
}

export function filterProjectsByCategory(
  projects: readonly PortfolioProject[],
  category: DisciplineCategory
): PortfolioProject[] {
  if (category === 'Wszystkie') {
    return [...projects];
  }
  return projects.filter((project) => project.categories.includes(category));
}

export function countProjectsByCategory(
  projects: readonly PortfolioProject[],
  category: DisciplineCategory
): number {
  return filterProjectsByCategory(projects, category).length;
}

export function validateContactBrief(input: ContactBriefInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactBriefInput, string>> = {};

  const trimmedName = input.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Podaj swoje imię lub nazwę firmy (minimum 2 znaki).';
  }

  const trimmedEmail = input.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Wpisz adres e-mail, abym mógł odpowiedzieć.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Sprawdź format adresu e-mail (np. imie@domena.pl).';
  }

  if (!input.service.trim()) {
    errors.service = 'Wybierz obszar współpracy.';
  }

  const trimmedMessage = input.message.trim();
  if (trimmedMessage.length < 15) {
    errors.message = 'Opisz krótko swój projekt lub potrzebę (minimum 15 znaków).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildCollaborationSummary(input: ContactBriefInput): {
  formatLabel: string;
  nextStepNote: string;
} {
  const service = input.service;

  if (service === 'Audyt UX i optymalizacja') {
    return {
      formatLabel: 'Przegląd heurystyczny i plan naprawczy',
      nextStepNote:
        'Na początek przyjrzę się obecnej stronie i przygotuję listę kluczowych punktów tarcia przed krótką rozmową wideo.',
    };
  }

  if (service === 'Webflow Development') {
    return {
      formatLabel: 'Wdrożenie responsywne w Webflow + CMS',
      nextStepNote:
        'Omówimy strukturę sekcji, przygotowanie makiet lub gotowego projektu w Figmie oraz docelowy harmonogram publikacji.',
    };
  }

  if (service === 'Web Design') {
    return {
      formatLabel: 'Koncepcja wizualna i architektura strony WWW',
      nextStepNote:
        'Zaczniemy od określenia celu strony, struktury treści oraz kierunku artystycznego dopasowanego do Twoich odbiorców.',
    };
  }

  return {
    formatLabel: 'Proces UX/UI od architektury po prototyp',
    nextStepNote:
      'Pierwszym krokiem będzie wspólne doprecyzowanie potrzeb użytkowników, przepływów ekranów oraz zakresu prototypu.',
  };
}

export function formatContactSlotDisplay(value: string, placeholder: string): {
  text: string;
  isConfigured: boolean;
} {
  const cleaned = value.trim();
  if (!cleaned) {
    return { text: placeholder, isConfigured: false };
  }
  return { text: cleaned, isConfigured: true };
}
