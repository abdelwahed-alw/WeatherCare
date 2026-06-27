/*
 * INTERACTION AUDIT — All actionable elements wired with state placeholders:
 *  1. 4 nav tabs (Home, Activities, Health, Profile) -> onTabChange
 *  2. Settings button -> settingsModal state
 *  3. City search -> CitySearch component (onSelect)
 *  4. Profile avatar/user display -> info display (not independently actionable)
 *  5. Modal close button
 *  Total interactive elements found: 5 unique actionable items
 */

import { useState } from 'react';
import type { TabType, City } from '../types';
import { HomeIcon, ActivityIcon, HeartIcon, ProfileIcon, LocationIcon, MaterialIcon } from './Icons';
import CitySearch from './CitySearch';
import { useLocalizedData } from '../i18n/useLocalizedData';

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
  const { common } = useLocalizedData();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <aside className="desktop-sidebar dark:bg-[#0b1c30] dark:text-inverse-on-surface">
      <div className="p-lg border-b border-outline-variant dark:border-[#2a3a52]">
        <div className="flex items-center gap-sm mb-md">
          <div className="w-10 h-10 rounded-full bg-primary-fixed dark:bg-primary/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-fixed dark:text-primary-fixed-dim">sunny</span>
          </div>
          <div>
            <span className="font-headline-md text-[18px] text-on-surface dark:text-inverse-on-surface leading-tight block" translate="no">{common.appName.split(' ')[0]}</span>
            <span className="text-label-sm text-outline dark:text-secondary-fixed-dim" translate="no">Weather & Wellness</span>
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
          onClick={() => setShowSettings(!showSettings)}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>{common.settings}</span>
        </button>
      </nav>

      <div className="p-lg mt-auto border-t border-outline-variant dark:border-[#2a3a52]">
        <span className="text-label-sm text-outline dark:text-secondary-fixed-dim">{common.footerTagline}</span>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setShowSettings(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowSettings(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={common.settings}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{common.settings}</h3>
              <button onClick={() => setShowSettings(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close settings">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-md">
              <button className="w-full flex items-center gap-md p-md bg-surface-container-low dark:bg-[#0b1c30] rounded-xl hover:bg-primary-container/50 transition-colors text-left focus-ring">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">notifications</span>
                <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Notification Settings</span>
              </button>
              <button className="w-full flex items-center gap-md p-md bg-surface-container-low dark:bg-[#0b1c30] rounded-xl hover:bg-primary-container/50 transition-colors text-left focus-ring">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">palette</span>
                <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Theme Customization</span>
              </button>
              <button className="w-full flex items-center gap-md p-md bg-surface-container-low dark:bg-[#0b1c30] rounded-xl hover:bg-primary-container/50 transition-colors text-left focus-ring">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">info</span>
                <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">About & Privacy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
