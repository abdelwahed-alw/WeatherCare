import { useState, useEffect } from 'react';
import CitySearch from './CitySearch';
import { LocationIcon } from './Icons';
import type { City } from '../types';

interface HeaderProps {
  city: City;
  onCityChange: (city: City) => void;
  userName: string;
  onProfileClick?: () => void;
}

export default function Header({ city, onCityChange, userName, onProfileClick }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`w-full top-0 sticky z-50 bg-surface dark:bg-on-surface shadow-sm flex items-center justify-between px-md max-w-full transition-shadow ${
        scrolled ? 'shadow-md' : ''
      }`}
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)', paddingBottom: '0.5rem' }}
    >
      <button
        className="flex items-center gap-sm focus-ring rounded-lg"
        onClick={() => setShowSearch(!showSearch)}
        onKeyDown={(e) => { if (e.key === 'Escape') setShowSearch(false); }}
        aria-label={`Current city: ${city.name}. Click to change location.`}
        aria-expanded={showSearch}
      >
        <LocationIcon size={20} className="text-primary dark:text-primary-fixed-dim" aria-hidden="true" />
        <h1 className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">{city.name}</h1>
      </button>

      <button
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed dark:border-primary hover:scale-105 transition-transform bg-primary-container dark:bg-primary flex items-center justify-center text-on-primary font-bold focus-ring"
        onClick={onProfileClick}
        aria-label="Open profile options"
      >
        {userName.charAt(0).toUpperCase()}
      </button>

      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-surface dark:bg-on-surface px-md pb-md shadow-lg z-50 animate-in">
          <CitySearch onSelect={(c) => { onCityChange(c); setShowSearch(false); }} />
        </div>
      )}
    </header>
  );
}
