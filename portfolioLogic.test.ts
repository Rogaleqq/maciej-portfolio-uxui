import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCollaborationSummary,
  countProjectsByCategory,
  filterProjectsByCategory,
  formatContactSlotDisplay,
  validateContactBrief,
  type PortfolioProject,
} from './portfolioLogic';

const sampleProjects: PortfolioProject[] = [
  {
    id: 'p1',
    index: '01',
    title: 'Projekt A',
    subtitle: 'Mobilność',
    conceptLabel: 'Projekt koncepcyjny',
    categories: ['UX/UI Design', 'Audyt UX'],
    year: '2026',
    image: '/img-a.jpg',
    imageAlt: 'A',
    summary: 'Opis A',
    brief: 'Brief A',
    challenge: 'Wyzwanie A',
    solution: 'Rozwiązanie A',
    deliverables: ['Makiety'],
    uxGoals: ['Cel 1'],
    auditComparison: [{ area: 'Mapa', before: 'Przed', after: 'Po' }],
    visualSystem: { grid: '8pt', typography: 'Sans', paletteNote: 'Neutral' },
  },
  {
    id: 'p2',
    index: '02',
    title: 'Projekt B',
    subtitle: 'E-commerce',
    conceptLabel: 'Projekt koncepcyjny',
    categories: ['Web Design', 'Webflow'],
    year: '2026',
    image: '/img-b.jpg',
    imageAlt: 'B',
    summary: 'Opis B',
    brief: 'Brief B',
    challenge: 'Wyzwanie B',
    solution: 'Rozwiązanie B',
    deliverables: ['Webflow'],
    uxGoals: ['Cel 2'],
    auditComparison: [{ area: 'Koszyk', before: 'Przed', after: 'Po' }],
    visualSystem: { grid: '12 col', typography: 'Display', paletteNote: 'Stone' },
  },
];

test('filterProjectsByCategory returns all items for Wszystkie and subsets for disciplines', () => {
  assert.equal(filterProjectsByCategory(sampleProjects, 'Wszystkie').length, 2);
  assert.equal(filterProjectsByCategory(sampleProjects, 'UX/UI Design').length, 1);
  assert.equal(filterProjectsByCategory(sampleProjects, 'Webflow')[0]?.id, 'p2');
  assert.equal(countProjectsByCategory(sampleProjects, 'Audyt UX'), 1);
});

test('validateContactBrief rejects empty and malformed inputs with Polish errors', () => {
  const invalid = validateContactBrief({
    name: 'A',
    email: 'zly-email',
    service: '',
    timeline: 'Elastyczny',
    message: 'Za krótko',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.service);
  assert.ok(invalid.errors.message);
});

test('validateContactBrief accepts complete valid input', () => {
  const valid = validateContactBrief({
    name: 'Anna Kowalska',
    email: 'anna@studio.pl',
    service: 'Web Design',
    timeline: '1–2 miesiące',
    message: 'Potrzebujemy nowej strony wizytówki dla naszej pracowni architektonicznej.',
  });

  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildCollaborationSummary returns service-specific Polish guidance', () => {
  const auditSummary = buildCollaborationSummary({
    name: 'Jan',
    email: 'jan@firma.pl',
    service: 'Audyt UX i optymalizacja',
    timeline: 'Pilny',
    message: 'Chcemy poprawić konwersję w formularzu wyceny.',
  });

  assert.match(auditSummary.formatLabel, /Przegląd heurystyczny/);
});

test('formatContactSlotDisplay distinguishes placeholder from configured value', () => {
  assert.deepEqual(formatContactSlotDisplay('', 'Do uzupełnienia'), {
    text: 'Do uzupełnienia',
    isConfigured: false,
  });

  assert.deepEqual(formatContactSlotDisplay('kontakt@domena.pl', 'Do uzupełnienia'), {
    text: 'kontakt@domena.pl',
    isConfigured: true,
  });
});
