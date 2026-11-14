import type { PortfolioProject } from '../utils/portfolioLogic';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  clientValue: string;
  deliverables: string[];
  idealFor: string;
  typicalDuration: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  lead: string;
  description: string;
  artifactName: string;
  wireframeMode: 'discovery' | 'wireframe' | 'interface' | 'audit';
}

export const HERO_IMAGE = '/src/assets/images/hero_studio_workspace_1794666552000.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_maciej_workspace_1794666569552.jpg';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'kinetika-mobility',
    index: '01',
    title: 'Kinetika — Miejska Nawigacja Rowerowa',
    subtitle: 'Aplikacja mobilna i optymalizacja ścieżki rezerwacji',
    conceptLabel: 'Projekt koncepcyjny · Studium UX/UI',
    categories: ['UX/UI Design', 'Audyt UX'],
    year: '2026',
    image: '/src/assets/images/project_kinetika_mobility_1794666552092.jpg',
    imageAlt:
      'Koncepcyjny projekt interfejsu aplikacji miejskiej nawigacji rowerowej Kinetika na smartfonie',
    summary:
      'Przeprojektowanie procesu wyboru stacji i rozpoczęcia przejazdu rowerem elektrycznym tak, aby skrócić drogę do odblokowania pojazdu do trzech pewnych kroków.',
    brief:
      'Zadanie koncepcyjne polegające na zaprojektowaniu minimalistycznego interfejsu miejskiej mobilności dla osób dojeżdżających codziennie do pracy w pośpiechu i zmiennym oświetleniu.',
    challenge:
      'W typowych aplikacjach rowerowych ekran mapy bywa przeładowany ikonami, banerami promocyjnymi i nieczytelnymi stanami baterii, co wydłuża decyzję na ulicy.',
    solution:
      'Uporządkowałem hierarchię ekranu głównego: mapa zajmuje 75% widoku, a karta wybranej stacji prezentuje wyłącznie dystans pieszo, zasięg baterii oraz jeden wyraźny przycisk odblokowania.',
    deliverables: [
      'Analiza ścieżki użytkownika (User Flow)',
      'Makiety Lo-Fi i architektura ekranów',
      'System komponentów UI w Figmie',
      'Interaktywny prototyp wariantów błędu i braku zasięgu',
    ],
    uxGoals: [
      'Redukcja liczby kroków od otwarcia aplikacji do rezerwacji pojazdu',
      'Wysoki kontrast typografii czytelny w pełnym słońcu (WCAG AA)',
      'Jednoręczna obsługa kluczowych przycisków w dolnej strefie ekranu',
    ],
    auditComparison: [
      {
        area: 'Ekran startowy z mapą',
        before: 'Nakładające się przypomnienia, cztery konkurujące przyciski akcji i małe etykiety baterii.',
        after: 'Czysta warstwa mapy z automatycznym wyborem najbliższej sprawnej stacji i jednym CTA.',
      },
      {
        area: 'Informacja o koszcie przejazdu',
        before: 'Cennik ukryty w regulaminie w ustawieniach konta.',
        after: 'Przejrzysta stawka za minutę oraz opłata startowa widoczna bezpośrednio nad przyciskiem startu.',
      },
    ],
    visualSystem: {
      grid: 'Siatka 4-kolumnowa mobile · baza odstępów 8 pt',
      typography: 'Czytelny krój bezszeryfowy z cyframi tabelarycznymi dla czasów i dystansu',
      paletteNote: 'Monochromatyczna baza betonowej szarości z jednym akcentem sygnalizacyjnym',
    },
  },
  {
    id: 'aure-ceramika',
    index: '02',
    title: 'AURÉ — Pracownia Światła i Ceramiki',
    subtitle: 'Editorial e-commerce i wdrożenie w Webflow',
    conceptLabel: 'Projekt koncepcyjny · Web Design & Webflow',
    categories: ['Web Design', 'Webflow'],
    year: '2026',
    image: '/src/assets/images/project_atelier_nord_1794666552263.jpg',
    imageAlt:
      'Koncepcyjna strona sklepu internetowego AURÉ dla pracowni ceramiki i oświetlenia na ekranie desktopowym',
    summary:
      'Cyfrowy showroom dla autorskiej pracowni lamp i ceramiki, zaprojektowany w duchu spokojnego katalogu galeryjnego zamiast agresywnego sklepu z banerami rabatowymi.',
    brief:
      'Stworzenie koncepcji strony sprzedażowej i wizerunkowej dla marki rzemieślniczej kierującej ofertę do architektów wnętrz oraz klientów indywidualnych.',
    challenge:
      'Ręcznie tworzone obiekty tracą swój charakter w ciasnych siatkach produktowych znanych z masowych platform sprzedażowych. Potrzebna była przestrzeń na detal i skalę produktu.',
    solution:
      'Zastosowałem asymetryczną siatkę edytorialną z dużym oddechem marginesów, przejrzystym filtrowaniem materiałów oraz kartą produktu łączącą kontekst wnętrzarski z dokumentacją techniczną.',
    deliverables: [
      'Kierunek artystyczny i projekt wizualny (Desktop + Mobile)',
      'Struktura kolekcji Webflow CMS dla serii produktowych',
      'Karty produktów z przełącznikiem wariantów wykończenia',
      'Zestaw płynnych przejść opartych na przewijaniu',
    ],
    uxGoals: [
      'Wyeksponowanie rzemiosła i wymiarów bez odrywania uwagi od produktu',
      'Szybkie przejście między galerią inspiracji a specyfikacją techniczną',
      'Spójna responsywność na tabletach używanych przez architektów',
    ],
    auditComparison: [
      {
        area: 'Karta produktu',
        before: 'Długa lista parametrów technicznych ukryta w zakładkach o niskim kontraście.',
        after: 'Dwukolumnowy układ: galeria zdjęć po lewej, najważniejsze wymiary i próbki materiałów po prawej.',
      },
      {
        area: 'Nawigacja po kolekcjach',
        before: 'Wielopoziomowe rozwijane menu z kilkunastoma podkategoriami.',
        after: 'Prosty podział na Oświetlenie, Ceramikę i Strefę Architekta.',
      },
    ],
    visualSystem: {
      grid: 'Siatka 12-kolumnowa · szerokość kontenera 1280 px',
      typography: 'Wyraziste nagłówki galeryjne sparowane z lekką prozą opisową',
      paletteNote: 'Ciepły trawertyn, kredowa biel i matowy grafit zapewniający skupienie na fotografii',
    },
  },
  {
    id: 'medflow-klinika',
    index: '03',
    title: 'MedFlow — System Rejestracji i Grafiku Kliniki',
    subtitle: 'Interfejs tabletu dla recepcji medycznej i audyt użyteczności',
    conceptLabel: 'Projekt koncepcyjny · UX/UI & Audyt UX',
    categories: ['UX/UI Design', 'Audyt UX'],
    year: '2026',
    image: '/src/assets/images/project_medflow_clinic_1794666553660.jpg',
    imageAlt:
      'Koncepcyjny interfejs systemu zarządzania wizytami medycznymi MedFlow prezentowany na tablecie',
    summary:
      'Koncepcja spokojnego, czytelnego panelu do zarządzania wizytami pacjentów w małych przychodniach, eliminująca błędy przy szybkim przepisywaniu terminów.',
    brief:
      'Zaprojektowanie narzędzia dla personelu recepcyjnego, który jednocześnie rozmawia z pacjentem przy okienku, odbiera telefon i sprawdza dostępność lekarzy.',
    challenge:
      'Przestarzałe systemy medyczne zmuszają do pracy na dziesięciu małych oknach dialogowych i mikroskopijnych komórkach kalendarza, co zwiększa stres i liczbę pomyłek.',
    solution:
      'Oparłem układ na wyraźnej osi czasu z czytelnymi blokami wizyt, podglądem najbliższych pacjentów oraz panelem szybkich akcji po prawej stronie w zasięgu kciuka na tablecie.',
    deliverables: [
      'Audyt typowych wąskich gardeł w oprogramowaniu medycznym',
      'Architektura widoku dziennego i tygodniowego',
      'Zasady kodowania statusów kolorem i etykietą tekstową',
      'Makiety interaktywne do testów z użytkownikami',
    ],
    uxGoals: [
      'Eliminacja sygnalizacji stanów samym kolorem (wsparcie dla daltonizmu)',
      'Szybkie dodawanie nowej wizyty bez utraty kontekstu bieżącego dnia',
      'Wyraźna separacja wizyt planowych, pilnych i konsultacji kontrolnych',
    ],
    auditComparison: [
      {
        area: 'Kalendarz gabinetów',
        before: 'Skondensowana tabela z ucinanymi nazwiskami pacjentów.',
        after: 'Bloki czasowe o stałej minimalnej wysokości z pełnym imieniem i rodzajem wizyty.',
      },
      {
        area: 'Dodawanie nowego pacjenta',
        before: 'Przeładowany formularz z 18 polami na jednym ekranie.',
        after: 'Dwuetapowy panel boczny: najpierw termin i kontakt, szczegóły medyczne w kroku drugim.',
      },
    ],
    visualSystem: {
      grid: 'Układ modularny 24 px · stała strefa akcji po prawej',
      typography: 'Jednoznaczne cyfry godzinowe (`tabular-nums`) i wysoka czytelność na ekranach dotykowych',
      paletteNote: 'Spokojny błękit, szałwia oraz neutralna biel ograniczające zmęczenie wzroku',
    },
  },
  {
    id: 'forma-wystawa',
    index: '04',
    title: 'FORMA — Archiwum Wystawy Typograficznej',
    subtitle: 'Mikrostrona wydarzenia kulturalnego zbudowana w Webflow',
    conceptLabel: 'Projekt koncepcyjny · Web Design & Webflow',
    categories: ['Web Design', 'Webflow'],
    year: '2026',
    image: '/src/assets/images/project_forma_webflow_1794666553711.jpg',
    imageAlt:
      'Koncepcyjna mikrostrona wystawy typograficznej FORMA wyświetlona na panoramicznym monitorze w przestrzeni galeryjnej',
    summary:
      'Odważna, kontrastowa strona zapowiadająca fikcyjną wystawę plakatu i typografii architektonicznej — studium rytmu siatki szwajcarskiej w przeglądarce.',
    brief:
      'Sprawdzenie, jak daleko można posunąć ekspresję wielkoformatowej typografii w przeglądarce, zachowując pełną czytelność programu wydarzenia i łatwy zakup biletu.',
    challenge:
      'Projekty eksperymentalne często stają się nieczytelne na telefonach lub zacinają się podczas przewijania przez zbyt ciężkie animacje.',
    solution:
      'Zbudowałem precyzyjną siatkę blokową w stylu szwajcarskim, w której na desktopie moduły tworzą architektoniczny plakat, a na smartfonie płynnie składają się w klarowną oś programu.',
    deliverables: [
      'Koncepcja typograficzna i layout wariantów desktop / mobile',
      'Optymalizacja animacji wyłącznie pod właściwości GPU',
      'Interaktywny harmonogram prelekcji z filtrowaniem dni',
      'Konfiguracja responsywnej siatki CSS Grid w Webflow',
    ],
    uxGoals: [
      'Połączenie odważnego charakteru galeryjnego z intuicyjną rezerwacją wejściówki',
      'Bezstratne skalowanie typografii od 375 px do ekranów panoramicznych',
      'Lekka konstrukcja bez zbędnych bibliotek obciążających ładowanie',
    ],
    auditComparison: [
      {
        area: 'Harmonogram prelekcji',
        before: 'Plakat PDF nieczytelny na ekranach smartfonów.',
        after: 'Interaktywna lista z podziałem na dni i możliwością zapisu przypomnienia.',
      },
      {
        area: 'Hierarchia informacji',
        before: 'Wszystkie tytuły wykładów prezentowane jednakową wielkością pisma.',
        after: 'Kontrast pomiędzy hasłem przewodnim a precyzyjnym indeksem godzinowym.',
      },
    ],
    visualSystem: {
      grid: 'Asymetryczna siatka CSS Grid oparta na liniach podziału 1 px',
      typography: 'Monumentalne nagłówki bezszeryfowe zestawione z precyzyjnym monospace',
      paletteNote: 'Głęboka czerń galeryjna i surowy papier bez zbędnych gradientów',
    },
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ux-ui-design',
    index: '01',
    title: 'UX/UI Design',
    tagline: 'Projektowanie intuicyjnych interfejsów i przemyślanych ścieżek użytkownika.',
    clientValue:
      'Zamiast zgadywać, czego oczekuje odbiorca, otrzymujesz logiczną strukturę produktu, która prowadzi do celu bez zbędnego tarcia i pytań.',
    deliverables: [
      'Analiza potrzeb odbiorców i architektura informacji',
      'Makiety funkcjonalne (wireframes) oraz ścieżki ekranów',
      'Projekt wizualny UI i biblioteka komponentów w Figmie',
      'Klikalny prototyp gotowy do testów lub przekazania programistom',
    ],
    idealFor: 'Startupy budujące pierwszy produkt cyfrowy, aplikacje webowe i narzędzia SaaS.',
    typicalDuration: '2–5 tygodni w zależności od skali produktu',
  },
  {
    id: 'web-design',
    index: '02',
    title: 'Web Design',
    tagline: 'Nowoczesne, autorskie strony internetowe z charakterem i czytelnym przekazem.',
    clientValue:
      'Twoja strona przestaje wyglądać jak kolejny anonimowy szablon. Kompozycja, typografia i rytm sekcji pracują na zaufanie do Twojej marki od pierwszych sekund.',
    deliverables: [
      'Kierunek artystyczny dopasowany do branży i odbiorców',
      'Projekt strony głównej oraz kluczowych podstron (Desktop & Mobile)',
      'Dopracowanie hierarchii treści i mikrocopy przy przyciskach',
      'Przygotowanie pełnej dokumentacji do wdrożenia',
    ],
    idealFor: 'Firmy usługowe, studia kreatywne, marki osobiste i przedsiębiorcy.',
    typicalDuration: '2–3 tygodnie',
  },
  {
    id: 'webflow-dev',
    index: '03',
    title: 'Webflow Development',
    tagline: 'Wdrożenie responsywnych stron gotowych do samodzielnej edycji treści.',
    clientValue:
      'Zyskujesz szybką, dopracowaną wizualnie stronę bez zależności od zespołu IT przy każdej zmianie tekstu czy dodaniu nowego wpisu.',
    deliverables: [
      'Czyste i uporządkowane wdrożenie projektu w Webflow',
      'Pełna responsywność na desktop, tablet i smartfon',
      'Konfiguracja systemu CMS (projekty, aktualności, oferta)',
      'Subtelne animacje, podstawy technicznego SEO i szkolenie z obsługi',
    ],
    idealFor: 'Zespoły potrzebujące zwinnej strony marketingowej lub portfolio bez długiego developmentu.',
    typicalDuration: '1–3 tygodnie po akceptacji projektu',
  },
  {
    id: 'ux-audit',
    index: '04',
    title: 'Audyt UX i optymalizacja',
    tagline: 'Rzetelna analiza istniejącej strony i konkretny plan poprawy użyteczności.',
    clientValue:
      'Dowiadujesz się, w których miejscach użytkownicy tracą orientację, dlaczego porzucają formularze oraz jakie zmiany przyniosą najszybszą poprawę.',
    deliverables: [
      'Przegląd heurystyczny kluczowych ścieżek i formularzy',
      'Weryfikacja czytelności, kontrastów (WCAG) i wersji mobilnej',
      'Raport z priorytetyzacją poprawek (od szybkich wygranych po głębsze zmiany)',
      'Propozycje makiet naprawczych dla najbardziej newralgicznych ekranów',
    ],
    idealFor: 'Firmy mające już stronę lub sklep, które widzą spadek zapytań lub chaos w nawigacji.',
    typicalDuration: '5–7 dni roboczych',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Zrozumienie celu i odbiorcy',
    lead: 'Zanim otworzę Figmę, porządkuję kontekst biznesowy.',
    description:
      'Analizuję, kim jest użytkownik końcowy, z jakim pytaniem wchodzi na stronę i co musi zobaczyć, by podjąć spokojną, pewną decyzję o kontakcie lub zakupie.',
    artifactName: 'Brief · Mapa pytań użytkownika',
    wireframeMode: 'discovery',
  },
  {
    index: '02',
    title: 'Architektura i makiety',
    lead: 'Dobra forma zaczyna się od solidnego szkieletu.',
    description:
      'Projektuję układ treści i hierarchię informacji w skali szarości. Dzięki temu od razu weryfikujemy logikę nawigacji i długość tekstów bez rozpraszania się kolorami.',
    artifactName: 'User Flow · Makiety Lo-Fi',
    wireframeMode: 'wireframe',
  },
  {
    index: '03',
    title: 'Język wizualny i ruch',
    lead: 'Typografia, kontrast i mikrointerakcje z funkcją.',
    description:
      'Dobieram skalę pisma, siatkę i oszczędny akcent kolorystyczny. Animacje wykorzystuję świadomie — do budowania orientacji w przestrzeni oraz dawania jasnej informacji zwrotnej.',
    artifactName: 'Design System · Prototyp UI',
    wireframeMode: 'interface',
  },
  {
    index: '04',
    title: 'Wdrożenie i weryfikacja',
    lead: 'Pikselowa precyzja na każdym rozmiarze ekranu.',
    description:
      'Przekładam projekt na działającą stronę w Webflow lub sprawdzam gotowy produkt pod kątem użyteczności mobilnej, dostępności klawiatury i szybkości działania.',
    artifactName: 'Webflow · Lista kontrolna UX/WCAG',
    wireframeMode: 'audit',
  },
];
