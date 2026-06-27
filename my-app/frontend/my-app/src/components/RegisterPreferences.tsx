import { useState } from 'react';

const INTERESTS = [
  { value: 'weather', icon: 'notifications_active', title: 'Weather Alerts', desc: 'Severe storm & temp warnings' },
  { value: 'uv', icon: 'light_mode', title: 'UV Protection', desc: 'Daily sun exposure insights' },
  { value: 'hydration', icon: 'water_drop', title: 'Hydration', desc: 'Smart intake reminders' },
  { value: 'allergy', icon: 'allergy', title: 'Allergy Tracking', desc: 'Pollen & air quality alerts' },
];

interface RegisterPreferencesProps {
  onComplete: (preferences: string[]) => void;
  onSkip: () => void;
}

export default function RegisterPreferences({ onComplete, onSkip }: RegisterPreferencesProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (value: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background dark:bg-[#051424] overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-2xl -left-2xl w-[500px] h-[500px] bg-primary/5 dark:bg-[#0d1c2d] rounded-full blur-[100px]" />
        <div className="absolute bottom-2xl right-0 w-[400px] h-[400px] bg-tertiary-fixed/30 dark:bg-[#1c2b3c] rounded-full blur-[120px]" />
      </div>

      <header className="w-full top-0 sticky bg-surface/80 dark:bg-[#051424]/80 backdrop-blur-md z-50">
        <div className="flex items-center justify-between px-md py-sm w-full mx-auto">
          <div className="w-10" />
          <h1 className="font-headline text-headline-md text-primary dark:text-secondary">
            Create Account
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="relative z-10 w-full max-w-md mx-auto px-lg py-xl flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-xl">
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-primary dark:bg-secondary text-on-primary flex items-center justify-center font-label text-label-md">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <span className="font-label text-label-sm text-on-surface dark:text-on-surface">Details</span>
          </div>
          <div className="flex-grow h-[2px] bg-primary dark:bg-secondary mx-sm mb-lg" />
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-primary dark:bg-secondary text-on-primary flex items-center justify-center font-label text-label-md ring-4 ring-primary-container/30 dark:ring-[#2563eb]/30">
              2
            </div>
            <span className="font-label text-label-sm text-primary dark:text-secondary font-bold">Preferences</span>
          </div>
        </div>

        <section className="mb-xl text-center">
          <h2 className="font-headline text-headline-lg text-on-surface dark:text-on-surface mb-sm">
            Your Daily Vibe
          </h2>
          <p className="font-body text-body-md text-on-surface-variant dark:text-on-surface-variant">
            Select the interests you'd like us to track for your morning routine.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-md flex-grow">
          {INTERESTS.map(({ value, icon, title, desc }) => {
            const active = selected.has(value);
            return (
              <label
                key={value}
                className={`cursor-pointer flex items-center p-lg bg-surface-container-lowest dark:bg-[rgba(1,15,31,0.4)] border rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] ${
                  active
                    ? 'border-primary dark:border-secondary bg-surface-container dark:bg-[rgba(37,99,235,0.15)]'
                    : 'border-outline-variant dark:border-[rgba(255,255,255,0.1)]'
                }`}
                onClick={() => toggle(value)}
              >
                <div className="w-12 h-12 rounded-full bg-surface-container dark:bg-[rgba(255,255,255,0.05)] flex items-center justify-center mr-md">
                  <span className="material-symbols-outlined text-primary dark:text-secondary text-3xl">
                    {icon}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-headline text-[18px] text-on-surface dark:text-on-surface">
                    {title}
                  </h3>
                  <p className="font-label text-label-md text-on-surface-variant dark:text-on-surface-variant">
                    {desc}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    active
                      ? 'bg-primary dark:bg-secondary border-primary dark:border-secondary'
                      : 'border-outline-variant dark:border-[rgba(255,255,255,0.2)]'
                  }`}
                >
                  {active && (
                    <span className="material-symbols-outlined text-on-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  )}
                </div>
                <input className="hidden" type="checkbox" checked={active} readOnly />
              </label>
            );
          })}
        </div>

        <div className="mt-2xl flex flex-col gap-md">
          <button
            className="w-full bg-primary dark:bg-[#2563eb] text-on-primary dark:text-white py-lg rounded-full font-headline text-headline-md shadow-lg hover:shadow-xl hover:opacity-90 active:scale-95 transition-all"
            onClick={() => onComplete(Array.from(selected))}
          >
            Complete Setup
          </button>
          <button
            className="w-full text-secondary dark:text-on-surface-variant py-md font-label text-label-md hover:underline"
            onClick={onSkip}
          >
            I'll do this later
          </button>
        </div>
      </main>
    </div>
  );
}
