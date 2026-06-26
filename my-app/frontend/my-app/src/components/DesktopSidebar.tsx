import type { TabType, City } from '../types';
import { HomeIcon, ActivityIcon, HeartIcon, ProfileIcon, LocationIcon } from './Icons';
import CitySearch from './CitySearch';

interface DesktopSidebarProps {
  active: TabType;
  onTabChange: (tab: TabType) => void;
  city: City;
  onCityChange: (city: City) => void;
  userName: string;
}

const tabs: { id: TabType; label: string; icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'activities', label: 'Activities', icon: ActivityIcon },
  { id: 'health', label: 'Health', icon: HeartIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
];

export default function DesktopSidebar({ active, onTabChange, city, onCityChange, userName }: DesktopSidebarProps) {
  return (
    <aside className="desktop-sidebar dark:bg-[#0b1c30] dark:text-inverse-on-surface">
      <div className="p-lg border-b border-outline-variant dark:border-[#2a3a52]">
        <div className="flex items-center gap-sm mb-md">
          <div className="w-10 h-10 rounded-full bg-primary-fixed dark:bg-primary/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-fixed dark:text-primary-fixed-dim">sunny</span>
          </div>
          <div>
            <span className="font-headline-md text-[18px] text-on-surface dark:text-inverse-on-surface leading-tight block">Aura</span>
            <span className="text-label-sm text-outline dark:text-secondary-fixed-dim">Weather & Wellness</span>
          </div>
        </div>

        <div className="flex items-center gap-sm mb-md">
          <div className="w-10 h-10 rounded-full bg-primary-fixed dark:bg-primary/40 text-on-primary-fixed dark:text-primary-fixed-dim flex items-center justify-center font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-body-md text-on-surface dark:text-inverse-on-surface font-medium">{userName}</span>
        </div>

        <div className="flex items-center gap-sm text-label-md text-on-surface-variant dark:text-secondary-fixed-dim mb-md">
          <LocationIcon size={16} />
          <span>{city.name}</span>
        </div>

        <CitySearch onSelect={onCityChange} />
      </div>

      <nav className="p-lg space-y-sm">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`w-full flex items-center gap-md px-md py-sm rounded-xl transition-all text-left ${
              active === id
                ? 'bg-primary-container dark:bg-primary/40 text-on-primary-container dark:text-inverse-on-surface font-semibold'
                : 'text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-[#1a2a42]'
            }`}
            onClick={() => onTabChange(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
        <button 
          className="w-full flex items-center gap-md px-md py-sm rounded-xl text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-[#1a2a42] transition-all text-left"
          onClick={() => alert('Settings menu will open here.')}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>
      </nav>

      <div className="p-lg mt-auto border-t border-outline-variant dark:border-[#2a3a52]">
        <span className="text-label-sm text-outline dark:text-secondary-fixed-dim">Stay safe under the sun</span>
      </div>
    </aside>
  );
}
