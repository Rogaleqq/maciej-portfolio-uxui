import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Edit3 } from 'lucide-react';
import {
  buildCollaborationSummary,
  formatContactSlotDisplay,
  validateContactBrief,
  type ContactBriefInput,
  type ContactSlots,
} from '../utils/portfolioLogic';

interface ContactSectionProps {
  preselectedService: string;
}

const SERVICE_OPTIONS = [
  'UX/UI Design',
  'Web Design',
  'Webflow Development',
  'Audyt UX i optymalizacja',
];

const TIMELINE_OPTIONS = ['Jak najszybciej', 'W ciągu 1–2 miesięcy', 'Elastyczny termin'];

const DEFAULT_SLOTS: ContactSlots = {
  email: '',
  phone: '',
  linkedin: '',
  behance: '',
};

const STORAGE_KEY = 'maciej_portfolio_contact_slots_v1';

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [formState, setFormState] = useState<ContactBriefInput>({
    name: '',
    email: '',
    service: preselectedService || 'UX/UI Design',
    timeline: 'W ciągu 1–2 miesięcy',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactBriefInput, string>>>({});
  const [submittedBrief, setSubmittedBrief] = useState<ContactBriefInput | null>(null);

  const [slots, setSlots] = useState<ContactSlots>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SLOTS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage access errors
    }
    return DEFAULT_SLOTS;
  });
  const [editingSlots, setEditingSlots] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormState((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSlotChange = (field: keyof ContactSlots, value: string) => {
    const next = { ...slots, [field]: value };
    setSlots(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage access errors
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactBrief(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedBrief({ ...formState });
  };

  const handleResetForm = () => {
    setSubmittedBrief(null);
    setFormState({
      name: '',
      email: '',
      service: preselectedService || 'UX/UI Design',
      timeline: 'W ciągu 1–2 miesięcy',
      message: '',
    });
    setErrors({});
  };

  const summary = buildCollaborationSummary(submittedBrief ?? formState);

  const emailSlot = formatContactSlotDisplay(slots.email, 'Pole na adres e-mail (do uzupełnienia)');
  const phoneSlot = formatContactSlotDisplay(slots.phone, 'Pole na numer telefonu (do uzupełnienia)');
  const linkedinSlot = formatContactSlotDisplay(
    slots.linkedin,
    'Profil LinkedIn (link do podpięcia)'
  );
  const behanceSlot = formatContactSlotDisplay(
    slots.behance,
    'Profil Behance / Dribbble (link do podpięcia)'
  );

  return (
    <section
      id="kontakt"
      className="mx-auto max-w-[1360px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-between space-y-10 lg:col-span-5">
          <div className="space-y-4">
            <p className="font-mono text-xs font-medium text-accent">
              Kontakt · Rozpocznijmy rozmowę
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Porozmawiajmy o Twoim kolejnym projekcie cyfrowym.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Opisz krótko cel strony, produktu lub potrzebę audytu. Odpowiem z propozycją
              konkretnego pierwszego kroku oraz terminem krótkiej rozmowy wstępnej.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs text-muted">Dane kontaktowe</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  Polska · Współpraca zdalna i hybrydowa
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingSlots((prev) => !prev)}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-border bg-canvas px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-stone whitespace-nowrap shrink-0"
              >
                <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{editingSlots ? 'Gotowe' : 'Uzupełnij dane'}</span>
              </button>
            </div>

            {!editingSlots ? (
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-xs text-muted">E-mail bezpośredni</dt>
                  <dd
                    className={`mt-1 ${
                      emailSlot.isConfigured ? 'font-semibold text-ink' : 'italic text-muted'
                    }`}
                  >
                    {emailSlot.isConfigured ? (
                      <a href={`mailto:${emailSlot.text}`} className="underline hover:text-accent">
                        {emailSlot.text}
                      </a>
                    ) : (
                      emailSlot.text
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="font-mono text-xs text-muted">Telefon</dt>
                  <dd
                    className={`mt-1 ${
                      phoneSlot.isConfigured ? 'font-semibold text-ink' : 'italic text-muted'
                    }`}
                  >
                    {phoneSlot.text}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-xs text-muted">LinkedIn</dt>
                    <dd
                      className={`mt-1 truncate ${
                        linkedinSlot.isConfigured ? 'font-medium text-ink' : 'italic text-muted'
                      }`}
                    >
                      {linkedinSlot.isConfigured ? (
                        <a
                          href={linkedinSlot.text}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-accent"
                        >
                          {linkedinSlot.text}
                        </a>
                      ) : (
                        linkedinSlot.text
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-xs text-muted">Portfolio zewnętrzne</dt>
                    <dd
                      className={`mt-1 truncate ${
                        behanceSlot.isConfigured ? 'font-medium text-ink' : 'italic text-muted'
                      }`}
                    >
                      {behanceSlot.isConfigured ? (
                        <a
                          href={behanceSlot.text}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-accent"
                        >
                          {behanceSlot.text}
                        </a>
                      ) : (
                        behanceSlot.text
                      )}
                    </dd>
                  </div>
                </div>
              </dl>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted">
                  Wpisz własne dane, aby sprawdzić podgląd w sekcji kontaktowej i stopce (zapis
                  lokalny w przeglądarce):
                </p>
                <label className="block text-xs font-medium text-ink">
                  Adres e-mail
                  <input
                    type="email"
                    value={slots.email}
                    onChange={(e) => handleSlotChange('email', e.target.value)}
                    placeholder="np. twoj@adres.pl"
                    className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink"
                  />
                </label>
                <label className="block text-xs font-medium text-ink">
                  Numer telefonu
                  <input
                    type="tel"
                    value={slots.phone}
                    onChange={(e) => handleSlotChange('phone', e.target.value)}
                    placeholder="np. +48 000 000 000"
                    className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink"
                  />
                </label>
                <label className="block text-xs font-medium text-ink">
                  Link do LinkedIn
                  <input
                    type="url"
                    value={slots.linkedin}
                    onChange={(e) => handleSlotChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink"
                  />
                </label>
                <label className="block text-xs font-medium text-ink">
                  Link do Behance / Dribbble
                  <input
                    type="url"
                    value={slots.behance}
                    onChange={(e) => handleSlotChange('behance', e.target.value)}
                    placeholder="https://behance.net/..."
                    className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
            {!submittedBrief ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-border pb-5">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Krótki brief projektowy
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Wypełnienie zajmuje około 2 minut. Pola oznaczone gwiazdką są wymagane.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-ink">
                      Imię i nazwisko lub firma *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="np. Katarzyna Nowak"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-2 min-h-[46px] w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-ink">
                      Adres e-mail *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="twoj@email.pl"
                      aria-invalid={Boolean(errors.email)}
                      className="mt-2 min-h-[46px] w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-ink">
                    Czego dotyczy projekt? *
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((option) => {
                      const isChecked = formState.service === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormState((prev) => ({ ...prev, service: option }));
                            if (errors.service) {
                              setErrors((prev) => ({ ...prev, service: undefined }));
                            }
                          }}
                          aria-pressed={isChecked}
                          className={`min-h-[44px] rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                            isChecked
                              ? 'border-ink bg-ink text-canvas'
                              : 'border-border bg-canvas text-ink hover:bg-stone/70'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-timeline" className="block text-sm font-semibold text-ink">
                    Preferowany czas startu
                  </label>
                  <select
                    id="contact-timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, timeline: e.target.value }))
                    }
                    className="mt-2 min-h-[46px] w-full rounded-lg border border-border bg-canvas px-3.5 py-2.5 text-sm text-ink"
                  >
                    {TIMELINE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-ink">
                    Krótko o projekcie lub wyzwaniu *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Napisz, czym zajmuje się Twoja marka, jaki jest główny cel nowej strony lub co wymaga audytu UX..."
                    aria-invalid={Boolean(errors.message)}
                    className="mt-2 w-full rounded-lg border border-border bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-muted/70"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-accent">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
                  <p className="text-xs leading-relaxed text-muted">
                    Po wysłaniu zobaczysz podsumowanie briefu oraz rekomendowaną formę pierwszego
                    etapu.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover whitespace-nowrap shrink-0"
                  >
                    <span>Wyślij wiadomość</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 py-4" role="status" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-accent">Brief przygotowany</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                      Dziękuję, {submittedBrief.name}.
                    </h3>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted">
                  Twój brief dotyczący zakresu <strong className="text-ink">{submittedBrief.service}</strong>{' '}
                  został zapisany w podsumowaniu tej sesji. Aby dokończyć wysyłkę poza podglądem
                  portfolio, podepnij docelowy adres e-mail Macieja w panelu po lewej stronie lub
                  prześlij podsumowanie bezpośrednio.
                </p>

                <div className="space-y-3 rounded-xl border border-border bg-canvas p-5 text-sm">
                  <p className="font-mono text-xs text-muted">Sugerowana forma współpracy</p>
                  <p className="font-display text-lg font-bold text-ink">{summary.formatLabel}</p>
                  <p className="leading-relaxed text-muted">{summary.nextStepNote}</p>
                  <div className="border-t border-border pt-3 font-mono text-xs text-muted">
                    Kontakt zwrotny: {submittedBrief.email} · Termin: {submittedBrief.timeline}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-canvas px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-stone"
                >
                  Wyślij kolejne zapytanie
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
