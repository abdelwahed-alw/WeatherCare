import { useState, useEffect } from 'react';
import CitySearch from './CitySearch';
import { LocationIcon } from './Icons';
import type { City } from '../types';

interface HeaderProps {
  city: City;
  onCityChange: (city: City) => void;
}

export default function Header({ city, onCityChange }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`w-full top-0 sticky z-50 bg-surface dark:bg-on-surface shadow-sm flex items-center justify-between px-md py-sm max-w-full transition-shadow ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div
        className="flex items-center gap-sm cursor-pointer"
        onClick={() => setShowSearch(!showSearch)}
      >
        <LocationIcon size={20} className="text-primary dark:text-primary-fixed-dim" />
        <h1 className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">{city.name}</h1>
      </div>

      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed dark:border-primary hover:scale-105 transition-transform cursor-pointer bg-primary-container dark:bg-primary flex items-center justify-center text-on-primary font-bold">
        {city.name.charAt(0).toUpperCase()}
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-surface dark:bg-on-surface px-md pb-md shadow-lg z-50 animate-in">
          <CitySearch onSelect={(c) => { onCityChange(c); setShowSearch(false); }} />
        </div>
      )}
    </header>
  );
}
