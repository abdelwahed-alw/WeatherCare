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

  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      if (!isMobile) {
        inputRef.current?.focus();
      }
    }
  }, []);

  const results = useMemo(() => {
    if (query.trim()) {
      return searchCities(query);
    }
    return [];
  }, [query]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [results.length]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!focused || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      selectCity(results[focusedIndex]);
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const selectCity = (city: City) => {
    onSelect(city);
    setQuery('');
    setFocused(false);
  };

  return (
    <div className="city-search" ref={containerRef}>
      <div className="search-input-wrap">
        <SearchIcon size={18} aria-hidden="true" />
        <label htmlFor="city-search-input" className="sr-only">Search Moroccan cities</label>
        <input
          ref={inputRef}
          id="city-search-input"
          type="text"
          placeholder="Search Moroccan cities\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          className="search-input"
          autoComplete="off"
          name="city-search"
          role="combobox"
          aria-expanded={focused && results.length > 0}
          aria-controls="city-search-results"
          aria-activedescendant={focusedIndex >= 0 ? `city-option-${focusedIndex}` : undefined}
          aria-autocomplete="list"
        />
      </div>
      {focused && results.length > 0 && (
        <ul className="search-results" id="city-search-results" role="listbox">
          {results.map((city, idx) => (
            <li key={city.name} role="option" aria-selected={focusedIndex === idx} id={`city-option-${idx}`}>
              <button
                className={`search-result-item ${focusedIndex === idx ? 'bg-primary-container dark:bg-primary/30' : ''}`}
                onClick={() => selectCity(city)}
                ref={focusedIndex === idx ? (el) => el?.scrollIntoView({ block: 'nearest' }) : undefined}
              >
                <LocationIcon size={16} aria-hidden="true" />
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
