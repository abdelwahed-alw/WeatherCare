import type { TabType } from '../types';

interface BottomNavProps {
  active: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'activities', label: 'Activities', icon: 'fitness_center' },
  { id: 'health', label: 'Health', icon: 'favorite' },
  { id: 'profile', label: 'Profile', icon: 'person' },
];

export default function BottomNav({ active, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-[#434655] flex justify-around items-center px-lg" style={{ paddingTop: '0.5rem', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)' }} aria-label="Main navigation" role="tablist">
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${id}-panel`}
            className={`flex flex-col items-center justify-center px-md py-xs transition-all duration-150 active:scale-90 focus-ring ${
              isActive
                ? 'bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-xl'
                : 'text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-[#1e3a5f] rounded-xl'
            }`}
            onClick={() => onTabChange(id)}
          >
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
              {id === 'home' ? 'home' : id === 'activities' ? 'fitness_center' : id === 'health' ? 'favorite' : 'person'}
            </span>
            <span className="font-label-sm text-label-sm">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
