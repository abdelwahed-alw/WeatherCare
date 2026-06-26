import { useState } from 'react';

interface ProfileViewProps {
  userName: string;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function ProfileView({ userName, isDark, onToggleDark }: ProfileViewProps) {
  const [notifications, setNotifications] = useState({ daily: true, heatwave: true, allergy: false });

  return (
    <div className="animate-in">
      {/* Hero Section / User Identity */}
      <section className="flex flex-col md:flex-row items-center gap-lg mb-2xl">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#1a2a42] shadow-lg overflow-hidden bg-primary-fixed dark:bg-primary/40 flex items-center justify-center">
            <span className="text-5xl font-bold text-on-primary-fixed dark:text-primary-fixed-dim">{userName.charAt(0).toUpperCase()}</span>
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-primary dark:bg-primary-fixed-dim p-xs rounded-full text-white dark:text-on-primary-fixed shadow-md active:scale-95 transition-transform"
            onClick={() => alert('Edit profile picture')}
          >
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface">{userName}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">Wellness Score: 84 • Premium Member</p>
        </div>
      </section>

      {/* Bento Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
        {/* Preferences Block */}
        <section className="md:col-span-7 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg ambient-shadow p-lg border border-[#F1F5F9] dark:border-[#2a3a52]">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-lg">Preferences</h3>
          <div className="space-y-xl">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Dark Mode</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Switch between light and dark themes</p>
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
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">home_pin</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Default City</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Your primary location for forecasts</p>
                </div>
              </div>
              <div className="flex items-center gap-xs text-primary dark:text-primary-fixed-dim font-label-md">
                <span>Marrakech, Morocco</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-md">
                <div className="p-sm bg-surface-container dark:bg-[#0b1c30] rounded-full text-primary dark:text-primary-fixed-dim">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Language</p>
                  <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Preferred interface language</p>
                </div>
              </div>
              <div className="flex items-center gap-xs text-primary dark:text-primary-fixed-dim font-label-md">
                <span>English (US)</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Block */}
        <section className="md:col-span-5 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg ambient-shadow p-lg border border-[#F1F5F9] dark:border-[#2a3a52]">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-lg">Notifications</h3>
          <div className="space-y-xl">
            {/* Daily Alerts */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Daily alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.daily}
                  onChange={() => setNotifications(p => ({ ...p, daily: !p.daily }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">Morning summary and wellness tips.</p>
            </div>

            {/* Heat Wave */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-error">thermostat</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Heat wave</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.heatwave}
                  onChange={() => setNotifications(p => ({ ...p, heatwave: !p.heatwave }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">Urgent alerts for extreme temperature rises.</p>
            </div>

            {/* Allergy */}
            <div className="flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">potted_plant</span>
                  <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">Allergy</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.allergy}
                  onChange={() => setNotifications(p => ({ ...p, allergy: !p.allergy }))}
                  className="w-5 h-5 rounded-full border-secondary-container text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim ml-8">High pollen or air quality warnings.</p>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="md:col-span-12 flex flex-col md:flex-row gap-md justify-end mt-lg">
          <button 
            className="bg-secondary-container dark:bg-[#2a3a52] text-on-secondary-container dark:text-secondary-fixed-dim px-xl py-md rounded-xl font-label-md hover:bg-outline-variant dark:hover:bg-[#3a4a62] transition-colors active:scale-95"
            onClick={() => alert('Data cache cleared successfully.')}
          >
            Clear Data Cache
          </button>
          <button 
            className="bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed px-xl py-md rounded-xl font-label-md hover:bg-primary-container dark:hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-sm"
            onClick={() => alert('Signing out...')}
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </section>
      </div>

      {/* Visual Decorative Element */}
      <div className="mt-2xl flex justify-center">
        <div className="w-full h-32 rounded-lg overflow-hidden relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-gradient-to-r from-primary-fixed-dim dark:from-[#1a2a42] to-surface-container-high dark:to-[#0b1c30]">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-on-surface to-transparent" />
        </div>
      </div>
    </div>
  );
}
