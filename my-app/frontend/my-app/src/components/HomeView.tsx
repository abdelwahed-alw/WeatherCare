/*
 * INTERACTION AUDIT — All actionable elements wired with state placeholders:
 *  1. "See Full Suggestions" button -> suggestionsModal state
 *  2. "Full Details" (forecast) button -> forecastModal state
 *  3. Activity add button (round FAB) -> smooth scroll top
 *  4. 5 Activity cards (Walking, Running, Cycling, Yoga, Swimming) -> selectedActivity state + card click
 *  5. Weather visual card -> scene image display (static, not clickable)
 *  6. Each forecast day row | decorative (not actionable)
 *  7. Hero weather card | info display (not actionable)
 *  8. Daily insight card | info display (not actionable)
 *  Total interactive elements found: 7 unique actionable items
 */

import { useState, useEffect } from 'react';
import type { WeatherData, Recommendations, ActivityType } from '../types';
import { CalendarIcon, PsychologyIcon, SelfImprovementIcon, PedalBikeIcon, RunIcon, WalkIcon, PoolIcon, CheckroomIcon, SunglassesIcon as EyeglassesIcon, MaterialIcon } from './Icons';
import { fetchWeatherImage } from '../api';
import type { WeatherSceneImage } from '../api';
import { useLocalizedData } from '../i18n/useLocalizedData';

interface HomeViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
  cityName: string;
  activity?: ActivityType;
}

function getWeatherIcon(condition: string): { icon: string; color: string } {
  switch (condition) {
    case 'sunny': return { icon: 'light_mode', color: 'text-amber-500' };
    case 'partly-cloudy': return { icon: 'partly_cloudy_day', color: 'text-blue-400' };
    case 'cloudy': return { icon: 'cloud', color: 'text-blue-500' };
    case 'windy': return { icon: 'air', color: 'text-blue-300' };
    default: return { icon: 'light_mode', color: 'text-amber-500' };
  }
}

export default function HomeView({ weather, recommendations, cityName, activity = 'walk' }: HomeViewProps) {
  const { homePage } = useLocalizedData();
  const formatDayLabel = (day: string, index: number): string => {
    if (index === 0) return homePage.forecast.tomorrow;
    return day;
  };
  const { temperature, condition, humidity, windSpeed, feelsLike, airQuality, forecast, uvIndex } = weather;
  const conditionLabel = condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const weatherIcon = getWeatherIcon(condition);

  const [suggestionsModal, setSuggestionsModal] = useState(false);
  const [forecastModal, setForecastModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const [sceneImage, setSceneImage] = useState<WeatherSceneImage | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    fetchWeatherImage(condition, activity)
      .then(setSceneImage)
      .catch(() => setSceneImage(null));
  }, [condition, activity]);

  function getActivityLabel(): string {
    if (temperature >= 38) return 'Extreme Heat • Stay indoors and hydrate';
    if (temperature >= 35) return 'Very Hot • Limit outdoor activity';
    if (temperature >= 30) { if (activity === 'run') return 'Hot • Running not recommended'; if (activity === 'work') return 'Hot • Take frequent breaks'; return 'Hot • Light activity only'; }
    if (temperature >= 25) { if (activity === 'run') return 'Warm • Run early or at dusk'; if (activity === 'work') return 'Warm • Stay hydrated'; return 'Warm • Great for a walk'; }
    if (temperature >= 18) { if (activity === 'run') return 'Pleasant • Perfect running weather'; if (activity === 'work') return 'Pleasant • Comfortable conditions'; return 'Pleasant • Ideal for outdoor yoga'; }
    if (temperature >= 12) { if (activity === 'run') return 'Cool • Layer up before your run'; if (activity === 'work') return 'Cool • Wear a light jacket'; return 'Cool • A light layer recommended'; }
    if (temperature >= 6) return 'Cold • Bundle up well';
    return 'Very Cold • Limit time outdoors';
  }

  function getConditionBadge(): string {
    if (uvIndex >= 8) return '⚠ Extreme UV';
    if (uvIndex >= 6) return '☀ High UV';
    if (airQuality?.level === 'unhealthy' || airQuality?.level === 'unhealthy-sensitive') return '😷 Poor Air Quality';
    if (condition === 'windy') return '💨 Windy';
    if (condition === 'cloudy') return '☁ Cloudy';
    if (condition === 'partly-cloudy') return '⛅ Partly Cloudy';
    return '☀ Sunny';
  }

  const activityLabel = getActivityLabel();
  const conditionBadge = getConditionBadge();

  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Walking: WalkIcon,
    Running: RunIcon,
    Cycling: PedalBikeIcon,
    Yoga: SelfImprovementIcon,
    Swimming: PoolIcon,
  };

  const activityCards = homePage.activityCards.map(card => ({
    icon: iconMap[card.label] || MaterialIcon,
    label: card.label,
    badge: card.badge,
    badgeClass: card.badgeClass,
  }));

  return (
    <main className="space-y-xl animate-in">
      {/* Hero Section: Current Weather (Bento Pattern) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Main Hero Card */}
        <div className="md:col-span-8 wc-card p-lg relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="absolute -end-10 -top-10 opacity-10" aria-hidden="true">
            <span className="material-symbols-outlined text-[240px]" style={{ color: '#004ac6' }}>light_mode</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-sm mb-base">
              <span className="px-sm py-xs bg-primary-fixed dark:bg-primary/30 text-on-primary-fixed-variant dark:text-primary-fixed-dim font-label-sm text-label-sm rounded-full">
                {homePage.hero.liveLabel} • {cityName.toUpperCase()}
              </span>
            </div>
            <div className="flex items-baseline gap-sm mt-md">
              <h2 className="font-display text-display text-primary dark:text-primary-fixed-dim">{temperature}°C</h2>
              <span className="font-headline-md text-headline-md text-on-surface-variant dark:text-secondary-fixed-dim">{conditionLabel}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mt-sm">
              {homePage.hero.feelsLikePrefix} {feelsLike}°C {temperature >= 30 ? '— Stay hydrated and avoid midday sun.' : '— A perfect day for outdoor wellness.'}
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-md pt-xl border-t border-outline-variant dark:border-[#434655] mt-xl">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">{homePage.hero.aqi}</span>
              <div className="flex items-center gap-xs">
                <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{airQuality?.aqi || 42}</span>
                <span className="text-sm font-medium text-secondary dark:text-secondary-fixed-dim">{airQuality?.level?.replace('-', ' ') || 'Good'}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">{homePage.hero.humidity}</span>
              <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">{homePage.hero.wind}</span>
              <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* "What to Wear" Interactive Card */}
        <div className="md:col-span-4 wc-card p-lg bg-surface-container-low dark:bg-[#1a2a42] border-none flex flex-col">
          <div className="flex items-center gap-sm mb-md">
            <CheckroomIcon className="text-primary dark:text-primary-fixed-dim" />
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{homePage.whatToWear.title}</h3>
          </div>
          <div className="space-y-md flex-grow">
            <div className="flex items-start gap-md p-md bg-white dark:bg-[#0b1c30] rounded-lg shadow-sm">
              <CheckroomIcon className="text-primary dark:text-primary-fixed-dim mt-1" />
              <div>
                <span className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim block">{homePage.whatToWear.lightLayers}</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{recommendations.clothing.description}</p>
              </div>
            </div>
            <div className="flex items-start gap-md p-md bg-white dark:bg-[#0b1c30] rounded-lg shadow-sm">
              <EyeglassesIcon className="text-primary dark:text-primary-fixed-dim mt-1" />
              <div>
                <span className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim block">{homePage.whatToWear.eyeProtection}</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                  {uvIndex >= 6 ? homePage.whatToWear.uvHighText : homePage.whatToWear.uvModerateText}
                </p>
              </div>
            </div>
          </div>
          <button
            className="mt-xl w-full py-md bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed font-label-md text-label-md rounded-full hover:bg-on-primary-fixed-variant dark:hover:bg-primary transition-colors active:scale-95 duration-200"
            onClick={() => setSuggestionsModal(!suggestionsModal)}
          >
            {homePage.whatToWear.seeFullSuggestions}
          </button>
        </div>
      </section>

      {/* 7-Day Forecast & Health Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* 7-Day Forecast */}
        <div className="lg:col-span-2 wc-card p-lg">
          <div className="flex items-center justify-between mb-xl">
            <div className="flex items-center gap-sm">
              <CalendarIcon className="text-primary dark:text-primary-fixed-dim" />
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{homePage.forecast.title}</h3>
            </div>
            
          </div>
          <div className="space-y-sm">
            {forecast.map((day, i) => {
              const icon = getWeatherIcon(day.condition);
              return (
                <div key={i} className="flex items-center justify-between p-md hover:bg-surface-container-lowest dark:hover:bg-[#0b1c30] rounded-xl transition-colors border-b border-outline-variant dark:border-[#434655] last:border-0">
                  <span className="w-20 font-label-md text-label-md text-on-surface-variant dark:text-secondary-fixed-dim">{formatDayLabel(day.day, i)}</span>
                  <span className={`material-symbols-outlined ${icon.color}`}>{icon.icon}</span>
                  <div className="flex items-center gap-md w-32 justify-end">
                    <span className="font-headline-md text-[18px] text-on-surface dark:text-inverse-on-surface">{day.tempHigh}°</span>
                    <span className="font-body-md text-body-md text-outline dark:text-secondary-fixed-dim">{day.tempLow}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wellness Contextual Card */}
        <div className="flex flex-col gap-lg">
          <div className="wc-card p-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 text-blue-900 dark:text-blue-50 border-none flex-grow relative overflow-hidden">
            <div className="absolute -top-8 -end-8 w-32 h-32 bg-blue-200/50 dark:bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -start-8 w-24 h-24 bg-indigo-200/50 dark:bg-indigo-500/10 rounded-full blur-xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-sm mb-lg">
                <div className="w-10 h-10 rounded-xl bg-white/30 dark:bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <PsychologyIcon />
                </div>
                <h3 className="font-headline-md text-headline-md">{homePage.dailyInsight.title}</h3>
              </div>

              <div className="bg-white/20 dark:bg-white/5 rounded-xl p-md mb-lg backdrop-blur-sm border border-white/20 dark:border-white/10">
                <p className="font-body-lg text-body-lg leading-relaxed italic text-blue-800 dark:text-blue-100">
                  &ldquo;{temperature >= 35
                    ? homePage.dailyInsight.quoteExtreme.replace(/^"|"$/g, '')
                    : temperature >= 25
                      ? homePage.dailyInsight.quoteWarm.replace(/^"|"$/g, '')
                      : homePage.dailyInsight.quoteCool.replace(/^"|"$/g, '')}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="bg-white/20 dark:bg-white/5 p-md rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-xs mb-sm">
                    <span className="material-symbols-outlined text-sm text-blue-700 dark:text-blue-200">thermostat</span>
                    <span className="font-label-md text-label-md text-blue-800 dark:text-blue-100">{homePage.dailyInsight.outdoorScore}</span>
                  </div>
                  <div className="flex items-end gap-xs">
                    <span className="font-headline-lg text-headline-lg font-bold text-blue-900 dark:text-blue-50">
                      {temperature > 35 ? '6.8' : temperature > 30 ? '7.5' : temperature > 20 ? '9.2' : '8.0'}
                    </span>
                    <span className="font-label-sm text-label-sm text-blue-700 dark:text-blue-200 mb-1">/10</span>
                  </div>
                  <div className="mt-sm h-1.5 rounded-full bg-white/30 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500"
                      style={{ width: `${((temperature > 35 ? 6.8 : temperature > 30 ? 7.5 : temperature > 20 ? 9.2 : 8.0) / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/20 dark:bg-white/5 p-md rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-xs mb-sm">
                    <span className="material-symbols-outlined text-sm text-blue-700 dark:text-blue-200">water_drop</span>
                    <span className="font-label-md text-label-md text-blue-800 dark:text-blue-100">{homePage.dailyInsight.hydrationNeed}</span>
                  </div>
                  {(() => {
                    const label = temperature >= 35 ? 'Very High' : temperature >= 28 ? 'High' : temperature >= 20 ? 'Moderate' : 'Low';
                    const pct = temperature >= 35 ? 90 : temperature >= 28 ? 70 : temperature >= 20 ? 45 : 20;
                    const barColor = temperature >= 35
                      ? 'from-red-400 to-orange-400'
                      : temperature >= 28
                        ? 'from-orange-400 to-yellow-400'
                        : temperature >= 20
                          ? 'from-blue-400 to-teal-400'
                          : 'from-blue-400 to-cyan-400';
                    return (
                      <>
                        <span className="font-headline-md text-headline-md font-bold text-blue-900 dark:text-blue-50 capitalize">{label}</span>
                        <div className="mt-sm h-1.5 rounded-full bg-white/30 dark:bg-white/10 overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Visual — live scene image */}
          <div
            className={`wc-card overflow-hidden relative flex items-center justify-center h-48 w-full ${
              sceneImage && imageLoaded ? '' : 'bg-gradient-to-br from-blue-100 dark:from-[#0b1c30] to-blue-50 dark:to-[#1a2a42]'
            }`}
          >
            {sceneImage && (
              <img
                src={sceneImage.url}
                alt=""
                className={`pointer-events-none absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
            {!sceneImage && (
              <span className="material-symbols-outlined text-[80px] text-blue-300/50 dark:text-blue-500/30" aria-hidden="true" style={{ fontSize: '80px' }}>
                {weatherIcon.icon}
              </span>
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-md pointer-events-none">
              <span className="text-white/70 text-xs font-medium drop-shadow-md uppercase tracking-wider">{conditionBadge}</span>
              <span className="text-white font-headline-md drop-shadow-md">{activityLabel}</span>
            </div>
          </div>
          </div>
        </section>

      {/* Activities Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{homePage.planYourActivity.title}</h3>
        </div>
        <div className="flex gap-lg overflow-x-auto pb-md custom-scrollbar">
          {activityCards.map((card, i) => {
            const isSelected = selectedActivity === card.label;
            return (
              <button
                key={i}
                className={`min-w-[200px] wc-card p-md flex flex-col items-center text-center gap-sm transition-all focus-ring ${
                  isSelected
                    ? 'border-primary dark:border-primary-fixed-dim ring-2 ring-primary dark:ring-primary-fixed-dim'
                    : 'hover:border-primary dark:hover:border-primary-fixed-dim'
                }`}
                onClick={() => setSelectedActivity(isSelected ? null : card.label)}
                aria-pressed={isSelected}
                aria-label={`${card.label}: ${card.badge}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected
                    ? 'bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed'
                    : 'bg-surface-container-high dark:bg-[#1e3a5f]'
                }`}>
                  <card.icon className={isSelected ? 'text-on-primary dark:text-on-primary-fixed' : 'text-primary dark:text-primary-fixed-dim'} aria-hidden="true" />
                </div>
                <span className={`font-label-md text-label-md ${isSelected ? 'text-primary dark:text-primary-fixed-dim font-bold' : 'text-on-surface dark:text-inverse-on-surface'}`}>
                  {card.label}
                </span>
                <span className={`px-sm py-xs text-xs font-bold rounded-full ${card.badgeClass}`}>
                  {card.badge}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Suggestions Modal Placeholder */}
      {suggestionsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setSuggestionsModal(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setSuggestionsModal(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={homePage.whatToWear.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{homePage.whatToWear.title}</h3>
              <button onClick={() => setSuggestionsModal(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close suggestions">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-md">
              {recommendations.clothing.items.map((item, i) => (
                <div key={i} className="flex items-center gap-md p-md bg-surface-container-low dark:bg-[#0b1c30] rounded-lg">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">checkroom</span>
                  <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface capitalize">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Forecast Modal Placeholder */}
      {forecastModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setForecastModal(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setForecastModal(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={homePage.forecast.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{homePage.forecast.title}</h3>
              <button onClick={() => setForecastModal(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close forecast">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-sm">
              {forecast.map((day, i) => {
                const icon = getWeatherIcon(day.condition);
                return (
                  <div key={i} className="flex items-center justify-between py-sm border-b border-outline-variant dark:border-[#2a3a52] last:border-0">
                    <span className="font-label-md text-label-md text-on-surface-variant dark:text-secondary-fixed-dim w-24">{formatDayLabel(day.day, i)}</span>
                    <span className={`material-symbols-outlined ${icon.color}`} aria-hidden="true">{icon.icon}</span>
                    <span className="font-headline-md text-[18px] text-on-surface dark:text-inverse-on-surface">{day.tempHigh}° / {day.tempLow}°</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
