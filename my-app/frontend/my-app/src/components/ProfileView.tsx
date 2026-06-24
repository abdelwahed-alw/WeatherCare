import { SettingsIcon, SunIcon, LocationIcon } from './Icons';

interface ProfileViewProps {
  userName: string;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function ProfileView({ userName, isDark, onToggleDark }: ProfileViewProps) {
  return (
    <div className="tab-view animate-in">
      <h2 className="tab-view-title">Profile</h2>
      <p className="tab-view-sub">Manage your preferences</p>

      <div className="glass-card profile-card">
        <div className="profile-avatar-large">
          {userName.charAt(0).toUpperCase()}
        </div>
        <h3 className="profile-name">{userName}</h3>
        <p className="profile-tag">WeatherCare user</p>
      </div>

      <div className="glass-card profile-card">
        <h3 className="widget-title">
          <SettingsIcon size={20} />
          Preferences
        </h3>

        <div className="profile-setting">
          <div className="profile-setting-info">
            <SunIcon size={20} />
            <span>Dark Mode</span>
          </div>
          <button
            className={`toggle ${isDark ? 'active' : ''}`}
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
          >
            <div className="toggle-knob" />
          </button>
        </div>

        <div className="profile-setting">
          <div className="profile-setting-info">
            <LocationIcon size={20} />
            <span>Default City</span>
          </div>
          <span className="profile-setting-value">Marrakech</span>
        </div>

        <div className="profile-setting">
          <div className="profile-setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>Language</span>
          </div>
          <span className="profile-setting-value">English</span>
        </div>
      </div>

      <div className="glass-card profile-card">
        <h3 className="widget-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Notifications
        </h3>
        <div className="profile-setting">
          <div className="profile-setting-info">
            <span>Daily weather alerts</span>
          </div>
          <div className="toggle active"><div className="toggle-knob" /></div>
        </div>
        <div className="profile-setting">
          <div className="profile-setting-info">
            <span>Heat wave warnings</span>
          </div>
          <div className="toggle active"><div className="toggle-knob" /></div>
        </div>
        <div className="profile-setting">
          <div className="profile-setting-info">
            <span>Allergy alerts</span>
          </div>
          <div className="toggle"><div className="toggle-knob" /></div>
        </div>
      </div>

      <p className="profile-version">Marrakech WeatherCare v1.0</p>
    </div>
  );
}
