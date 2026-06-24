import type { TabType } from '../types';
import { HomeIcon, ActivityIcon, HeartIcon, ProfileIcon } from './Icons';

interface BottomNavProps {
  active: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'activities', label: 'Activities', icon: ActivityIcon },
  { id: 'health', label: 'Health', icon: HeartIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
];

export default function BottomNav({ active, onTabChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => onTabChange(id)}
        >
          <Icon size={22} />
          <span className="nav-label">{label}</span>
          {active === id && <div className="nav-indicator" />}
        </button>
      ))}
    </nav>
  );
}
