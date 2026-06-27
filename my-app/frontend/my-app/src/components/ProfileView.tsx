/*
 * INTERACTION AUDIT — All actionable elements wired with state placeholders:
 *  1. Avatar edit button -> alert (edit profile)
 *  2. Dark Mode toggle -> onToggleDark (parent state)
 *  3. Default City selector (chevron_right) -> showCityPicker state
 *  4. Language selector (chevron_right) -> showLanguagePicker state
 *  5. Daily alerts checkbox -> notifications state
 *  6. Heat wave checkbox -> notifications state
 *  7. Allergy checkbox -> notifications state
 *  8. "Clear Data Cache" button -> cacheCleared state (feedback toast)
 *  9. "Sign Out" button -> alert
 *  10. City picker modal -> inner items (onSelect)
 *  11. Language picker modal -> inner items (onSelect)
 *  Total interactive elements found: 11 unique actionable items
 */

import { useState, useEffect, useRef } from 'react';
import { MaterialIcon } from './Icons';
import { moroccanCities } from '../data/moroccanCities';
import type { City, AuthUser } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import type { Locale } from '../i18n/translations';
import { updatePreferences } from '../api';

interface ProfileViewProps {
  userName: string;
  isDark: boolean;
  onToggleDark: () => void;
  onLogout: () => void;
  city: City;
  onCityChange: (city: City) => void;
  token: string | null;
  user: AuthUser | null;
}

function prefsFromUser(user: AuthUser | null): { daily: boolean; heatwave: boolean; allergy: boolean } {
  const p = user?.preferences ?? [];
  return { daily: p.includes('daily'), heatwave: p.includes('heatwave'), allergy: p.includes('allergy') };
}

const LANGUAGES = [
  { code: 'en', label: 'English (US)' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];

export default function ProfileView({ userName, isDark, onToggleDark, onLogout, city, onCityChange, token, user }: ProfileViewProps) {
  const { locale, setLocale } = useLocale();
  const { profilePage } = useLocalizedData();
  const [notifications, setNotifications] = useState(() => prefsFromUser(user));
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES.find(l => l.code === locale) || LANGUAGES[0]);
  const [cacheCleared, setCacheCleared] = useState(false);
  const prefTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSelectedLanguage(LANGUAGES.find(l => l.code === locale) || LANGUAGES[0]);
  }, [locale]);

  useEffect(() => {
    if (!token) return;
    if (prefTimeoutRef.current) clearTimeout(prefTimeoutRef.current);
    prefTimeoutRef.current = setTimeout(() => {
      const prefs = Object.entries(notifications)
        .filter(([, v]) => v)
        .map(([k]) => k);
      updatePreferences(token, prefs).catch(() => {});
    }, 500);
    return () => {
      if (prefTimeoutRef.current) clearTimeout(prefTimeoutRef.current);
    };
  }, [notifications, token]);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };

  return (
    <div className="animate-in" translate="no">
      {/* Hero Section / User Identity */}
      <section className="flex flex-col md:flex-row items-center gap-lg mb-2xl">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#1a2a42] shadow-lg overflow-hidden bg-primary-fixed dark:bg-primary/40 flex items-center justify-center">
            <span className="text-5xl font-bold text-on-primary-fixed dark:text-primary-fixed-dim">{userName.charAt(0).toUpperCase()}</span>
          </div>
          <button
            className="absolute bottom-0 right-0 bg-primary dark:bg-primary-fixed-dim p-xs rounded-full text-white dark:text-on-primary-fixed shadow-md active:scale-95 transition-transform focus-ring"
            onClick={() => alert('Edit profile picture')}
            aria-label="Edit profile picture"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">edit</span>
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface">{userName}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
            {profilePage.wellnessScore}: 84 • {profilePage.premiumMember}
          </p>
        </div>
      </section>

      {/* Bento Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
        {/* Preferences Block */}
        <section className="md:col-span-7 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg ambient-shadow p-lg border border-[#F1F5F9] dark:border-[#2a3a52]">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-lg">{profilePage.preferences.title}</h3>
          <div className="space-y-xl">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.preferences.darkMode}</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">{profilePage.preferences.darkModeDesc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDark}
                  onChange={onToggleDark}
                />
                <div className="w-12 h-6 bg-secondary-container dark:bg-[#2a3a52] rounded-full peer peer-checked:bg-primary dark:peer-checked:bg-primary-fixed-dim after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6" />
              </label>
            </div>

            {/* Default City */}
            <button
              className="flex items-center justify-between group w-full text-left focus-ring rounded-lg"
              onClick={() => setShowCityPicker(true)}
              aria-label={`${profilePage.preferences.defaultCity}: ${city.name}`}
            >
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined" aria-hidden="true">home_pin</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.preferences.defaultCity}</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">{profilePage.preferences.defaultCityDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-xs text-primary dark:text-primary-fixed-dim font-label-md">
                <span>{city.name}, Morocco</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
              </div>
            </button>

            {/* Language */}
            <button
              className="flex items-center justify-between group w-full text-left focus-ring rounded-lg"
              onClick={() => setShowLanguagePicker(true)}
              aria-label={`${profilePage.preferences.language}: ${selectedLanguage.label}`}
            >
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined" aria-hidden="true">language</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.preferences.language}</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">{profilePage.preferences.languageDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-xs text-primary dark:text-primary-fixed-dim font-label-md">
                <span>{selectedLanguage.label}</span>
                <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
              </div>
            </button>
          </div>
        </section>

        {/* Notifications Block */}
        <section className="md:col-span-5 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg ambient-shadow p-lg border border-[#F1F5F9] dark:border-[#2a3a52]">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-lg">{profilePage.notifications.title}</h3>
          <div className="space-y-xl">
            {/* Daily Alerts */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.notifications.dailyAlerts}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.daily}
                  onChange={() => setNotifications(p => ({ ...p, daily: !p.daily }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">{profilePage.notifications.dailyAlertsDesc}</p>
            </div>

            {/* Heat Wave */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-error">thermostat</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.notifications.heatWave}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.heatwave}
                  onChange={() => setNotifications(p => ({ ...p, heatwave: !p.heatwave }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">{profilePage.notifications.heatWaveDesc}</p>
            </div>

            {/* Allergy */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">potted_plant</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{profilePage.notifications.allergy}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.allergy}
                  onChange={() => setNotifications(p => ({ ...p, allergy: !p.allergy }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">{profilePage.notifications.allergyDesc}</p>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="md:col-span-12 flex flex-col md:flex-row gap-md justify-end mt-lg">
          <button
            className="bg-secondary-container dark:bg-[#2a3a52] text-on-secondary-container dark:text-secondary-fixed-dim px-xl py-md rounded-xl font-label-md hover:bg-outline-variant dark:hover:bg-[#3a4a62] transition-colors active:scale-95 focus-ring"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear the data cache?')) {
                handleClearCache();
              }
            }}
          >
            {profilePage.account.clearCache}
          </button>
          <button
            className="bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed px-xl py-md rounded-xl font-label-md hover:bg-primary-container dark:hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-sm focus-ring"
            onClick={() => onLogout()}
          >
            <span className="material-symbols-outlined" aria-hidden="true">logout</span>
            {profilePage.account.signOut}
          </button>
        </section>
      </div>

      {/* Cache Cleared Toast */}
      {cacheCleared && (
        <div className="fixed top-24 right-6 z-50 bg-green-600 text-white px-lg py-md rounded-xl shadow-lg animate-in" role="status" aria-live="polite">
          {profilePage.account.cacheCleared}
        </div>
      )}

      {/* City Picker Modal */}
      {showCityPicker && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setShowCityPicker(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowCityPicker(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={profilePage.preferences.defaultCity}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{profilePage.preferences.defaultCity}</h3>
              <button onClick={() => setShowCityPicker(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close city picker">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-sm">
              {moroccanCities.map((c) => (
                <button
                  key={c.name}
                  className={`w-full flex items-center justify-between p-md rounded-xl transition-colors text-left focus-ring ${
                    city.name === c.name
                      ? 'bg-primary-container dark:bg-primary/30 text-on-primary-container dark:text-inverse-on-surface'
                      : 'hover:bg-surface-container-low dark:hover:bg-[#0b1c30] text-on-surface dark:text-inverse-on-surface'
                  }`}
                  onClick={() => {
                    onCityChange(c);
                    setShowCityPicker(false);
                  }}
                >
                  <div>
                    <span className="font-label-md text-label-md block">{c.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">{c.region}</span>
                  </div>
                  {city.name === c.name && (
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Language Picker Modal */}
      {showLanguagePicker && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setShowLanguagePicker(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowLanguagePicker(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={profilePage.preferences.language}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{profilePage.preferences.language}</h3>
              <button onClick={() => setShowLanguagePicker(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close language picker">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-sm">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full flex items-center justify-between p-md rounded-xl transition-colors text-left focus-ring ${
                    selectedLanguage.code === lang.code
                      ? 'bg-primary-container dark:bg-primary/30 text-on-primary-container dark:text-inverse-on-surface'
                      : 'hover:bg-surface-container-low dark:hover:bg-[#0b1c30] text-on-surface dark:text-inverse-on-surface'
                  }`}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setLocale(lang.code as Locale);
                    setShowLanguagePicker(false);
                  }}
                >
                  <span className="font-label-md text-label-md">{lang.label}</span>
                  {selectedLanguage.code === lang.code && (
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visual Decorative Element */}
      
    </div>
  );
}
