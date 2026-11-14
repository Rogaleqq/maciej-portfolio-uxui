const MARQUEE_ITEMS = [
  'UX/UI Design',
  'Architektura informacji',
  'Web Design',
  'Webflow Development',
  'Audyt użyteczności',
  'Prototypowanie w Figmie',
  'Projekty koncepcyjne',
  'Dostępność WCAG',
];

export function MarqueeStrip() {
  return (
    <div
      aria-hidden="true"
      className="marquee-wrapper overflow-hidden border-y border-border bg-stone/50 py-3.5"
    >
      <div className="animate-editorial-marquee items-center gap-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-mono text-xs font-medium tracking-wide text-muted">
              {item}
            </span>
            <span className="text-xs text-accent">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
