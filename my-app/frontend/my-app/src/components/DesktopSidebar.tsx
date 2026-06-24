import type { TabType, City } from '../types';
import { HomeIcon, ActivityIcon, HeartIcon, ProfileIcon, SettingsIcon, SunIcon, LocationIcon } from './Icons';
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
    <aside className="desktop-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <SunIcon size={24} />
        </div>
        <span className="sidebar-brand">Marrakech<br/>WeatherCare</span>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="sidebar-username">{userName}</span>
      </div>

      <div className="sidebar-city">
        <LocationIcon size={16} />
        <span>{city.name}</span>
      </div>

      <CitySearch onSelect={onCityChange} />

      <nav className="sidebar-nav">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
        <button className="sidebar-nav-item settings-item">
          <SettingsIcon size={20} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-tagline">Stay safe under the sun</span>
      </div>
    </aside>
  );
}
