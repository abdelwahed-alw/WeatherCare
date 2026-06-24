import { useState, useRef, useEffect, useMemo } from 'react';
import { searchCities } from '../data/moroccanCities';
import type { City } from '../types';
import { SearchIcon, LocationIcon } from './Icons';

interface CitySearchProps {
  onSelect: (city: City) => void;
}

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (query.trim()) {
      return searchCities(query);
    }
    return [];
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="city-search" ref={containerRef}>
      <div className="search-input-wrap">
        <SearchIcon size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Moroccan cities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="search-input"
        />
      </div>
      {focused && results.length > 0 && (
        <ul className="search-results">
          {results.map((city) => (
            <li key={city.name}>
              <button
                className="search-result-item"
                  onClick={() => {
                    onSelect(city);
                    setQuery('');
                    setFocused(false);
                  }}
              >
                <LocationIcon size={16} />
                <div className="search-result-info">
                  <span className="result-name">{city.name}</span>
                  <span className="result-region">{city.region}</span>
                </div>
                <span className="result-name-ar">{city.nameAr}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
