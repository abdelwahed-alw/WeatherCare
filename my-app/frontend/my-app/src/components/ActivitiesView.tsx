/*
 * INTERACTION AUDIT — All actionable elements wired with state placeholders:
 *  1. "Start" hydration button -> onActivityChange('walk')
 *  2. "History" hydration button -> hydrationHistory state (modal)
 *  3. 5 Activity cards (Walking, Running, Cycling, Yoga, Swimming) -> onActivityChange / alert
 *  4. "View All" button -> viewAllActivities state
 *  5. FAB play/pause button -> fabClicked state
 *  6. Air Quality insight card -> insightModal state
 *  7. UV Warning insight card -> insightModal state
 *  8. Modal close buttons | inner elements wired above
 *  Total interactive elements found: 7 unique actionable items
 */

import { useState } from 'react';
import type { WeatherData, ActivityType, Recommendations } from '../types';
import { MaterialIcon } from './Icons';
import { useLocalizedData } from '../i18n/useLocalizedData';

interface ActivitiesViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
  activity: ActivityType;
  onActivityChange: (a: ActivityType) => void;
}

interface ActivityOption {
  id: string;
  label: string;
  icon: string;
  subtitle: string;
}

function estimateTempAtHour(currentTemp: number, hour: number): number {
  const peakHour = 14;
  const peakTemp = currentTemp + 3;
  const diff = Math.abs(hour - peakHour);
  const maxDiff = Math.max(peakHour, 24 - peakHour);
  const ratio = diff / maxDiff;
  const tempRange = 8;
  return Math.round(peakTemp - ratio * tempRange);
}

export default function ActivitiesView({ weather, recommendations, activity, onActivityChange }: ActivitiesViewProps) {
  const { activitiesPage } = useLocalizedData();
  const allActivities: ActivityOption[] = activitiesPage.activities;
  const temp = weather.temperature;
  const conditionLabel = weather.condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const [fabClicked, setFabClicked] = useState(false);
  const [hydrationHistory, setHydrationHistory] = useState(false);
  const [viewAllActivities, setViewAllActivities] = useState(false);
  const [insightModal, setInsightModal] = useState<{ type: string; title: string; description: string } | null>(null);
  const [selectedCardActivity, setSelectedCardActivity] = useState<string | null>(null);

  const timeSlots = [6, 8, 10, 12, 14, 16];
  const temps = timeSlots.map(h => estimateTempAtHour(temp, h));
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;

  const hydration = recommendations.hydration;
  const circumference = 2 * Math.PI * 88;
  const progress = Math.min(hydration.liters / 1.8, 1);
  const offset = circumference - (progress * circumference);

  const toActivityType = (id: string): ActivityType => {
    if (id === 'run') return 'run';
    if (id === 'work') return 'work';
    return 'walk';
  };

  const isActiveActivity = (id: string): boolean => {
    return activity === toActivityType(id);
  };

  return (
    <div className="space-y-xl animate-in">
      {/* Header Section */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface mb-xs">{activitiesPage.todayFocus.title}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-secondary-fixed-dim">
          {temp >= 35 ? activitiesPage.todayFocus.extremeHeat :
           temp >= 30 ? activitiesPage.todayFocus.warm :
           temp >= 20 ? activitiesPage.todayFocus.optimal :
           activitiesPage.todayFocus.cool}
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Best Time for Outdoor Activity (Large Card) */}
        <div className="md:col-span-8 glass-card p-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-xl">
              <div>
                <span className="inline-flex items-center px-md py-xs bg-primary-container/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim rounded-full font-label-sm text-label-sm mb-md">
                  <span className="material-symbols-outlined mr-xs text-sm">light_mode</span>
                  {activitiesPage.bestTime.optimalWindow}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-xs">{activitiesPage.bestTime.morningClarity}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim max-w-md">
                  {activitiesPage.bestTime.description}
                </p>
              </div>
              <div className="text-right">
                <span className="font-display text-display text-primary dark:text-primary-fixed-dim">{temp}°</span>
                <p className="font-label-md text-label-md text-on-surface-variant dark:text-secondary-fixed-dim">{conditionLabel}</p>
              </div>
            </div>

            {/* Forecast Timeline */}
            <div className="flex justify-between items-end h-32 gap-sm">
              {timeSlots.map((hour, i) => {
                const t = temps[i];
                const heightPct = ((t - minTemp) / range) * 80 + 20;
                const isPeak = hour === 8;
                return (
                  <div key={hour} className="flex-1 flex flex-col items-center gap-xs">
                    <div className="w-full bg-surface-container-high dark:bg-[#1e3a5f] rounded-t-full relative" style={{ height: `${heightPct}%` }}>
                      <div
                        className={`absolute inset-x-0 bottom-0 rounded-t-full transition-all ${
                          isPeak ? 'bg-primary dark:bg-primary-fixed-dim h-full' : 'bg-primary-container dark:bg-primary/40 h-1/2'
                        }`}
                      />
                    </div>
                    <span className={`font-label-sm text-label-sm ${
                      isPeak ? 'text-primary dark:text-primary-fixed-dim font-bold' : 'text-on-surface-variant dark:text-secondary-fixed-dim'
                    }`}>
                      {new Date(2024, 0, 1, hour).toLocaleString('en-US', { hour: 'numeric', hour12: true })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Background Detail */}
          <div className="absolute right-0 top-0 w-64 h-64 -mr-20 -mt-20 opacity-10">
            <span className="material-symbols-outlined text-[200px]" style={{ fontSize: '200px' }}>wb_sunny</span>
          </div>
        </div>

        {/* Hydration Plan (Side Card) */}
        <div className="md:col-span-4 glass-card p-lg flex flex-col items-center text-center">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-md">{activitiesPage.hydrationPlan.title}</h3>
          <div className="relative w-48 h-48 mb-lg">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-secondary-container dark:text-[#2a3a52]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
              <circle
                className="text-primary dark:text-primary-fixed-dim transition-all duration-1000"
                cx="96" cy="96" fill="transparent" r="88"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-headline-lg text-primary dark:text-primary-fixed-dim">{hydration.liters.toFixed(1)}L</span>
              <span className="font-label-md text-label-md text-on-surface-variant dark:text-secondary-fixed-dim">{activitiesPage.hydrationPlan.goal}: 1.8L</span>
            </div>
          </div>
          <div className="flex gap-sm w-full">
            <button
              className="flex-1 py-md bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-xl font-label-md flex items-center justify-center gap-sm active:scale-95 transition-transform"
              onClick={() => onActivityChange('walk')}
            >
              <span className="material-symbols-outlined">directions_walk</span> {activitiesPage.hydrationPlan.start}
            </button>
            <button
              className="px-md py-md bg-surface-container-high dark:bg-[#1e3a5f] text-primary dark:text-primary-fixed-dim rounded-xl active:scale-95 transition-transform"
              onClick={() => setHydrationHistory(!hydrationHistory)}
            >
              <span className="material-symbols-outlined">history</span>
            </button>
          </div>
          <p className="mt-lg font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
            {hydration.liters >= 1.8
              ? activitiesPage.hydrationPlan.goalReached
              : `${hydration.glasses} ${activitiesPage.hydrationPlan.glassesToTarget}`}
            <span className="block font-bold text-primary dark:text-primary-fixed-dim mt-xs">
              {hydration.liters >= 1.8 ? activitiesPage.hydrationPlan.wellDone : activitiesPage.hydrationPlan.keepItUp}
            </span>
          </p>
        </div>

        {/* Activity Selection */}
        <div className="md:col-span-12">
          <div className="flex items-center justify-between mb-md">
            <div className="flex items-center gap-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{activitiesPage.startActivity.title}</h3>
              <button
                className="w-10 h-10 bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-md"
                onClick={() => setFabClicked(!fabClicked)}
                aria-label={fabClicked ? 'Pause' : 'Play'}
              >
                <span className="material-symbols-outlined">{fabClicked ? 'pause' : 'play_arrow'}</span>
              </button>
            </div>
            <button
              className="text-primary dark:text-primary-fixed-dim font-label-md hover:underline"
              onClick={() => setViewAllActivities(!viewAllActivities)}
            >
              {activitiesPage.startActivity.viewAll}
            </button>
          </div>
          <div className="flex gap-md overflow-x-auto pb-sm hide-scrollbar">
            {allActivities.map((act) => {
              const isActive = isActiveActivity(act.id);
              const isSelectedCard = selectedCardActivity === act.id;
              return (
                <button
                  key={act.id}
                  className={`flex-shrink-0 w-44 glass-card p-md flex flex-col items-center text-center cursor-pointer group transition-all ${
                    isActive || isSelectedCard ? 'active-ring bg-primary-container dark:bg-primary/30' : 'hover:bg-primary-container dark:hover:bg-primary/30'
                  }`}
                  onClick={() => {
                    const newId = isSelectedCard ? null : act.id;
                    setSelectedCardActivity(newId);
                    if (newId) onActivityChange(toActivityType(act.id));
                  }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-md transition-colors ${
                    isActive || isSelectedCard
                      ? 'bg-primary dark:bg-primary-fixed-dim'
                      : 'bg-surface-container dark:bg-[#1e3a5f] group-hover:bg-primary/20'
                  }`}>
                    <span className={`material-symbols-outlined text-3xl ${
                      isActive || isSelectedCard ? 'text-on-primary dark:text-on-primary-fixed' : 'text-primary dark:text-primary-fixed-dim'
                    }`}>
                      {act.icon}
                    </span>
                  </div>
                  <span className={`font-headline-md text-body-lg font-bold ${
                    isActive || isSelectedCard ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface dark:text-inverse-on-surface'
                  }`}>
                    {act.label}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                    {act.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Insights Section */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-lg">
          <button
            className="glass-card p-lg flex items-center gap-lg hover:shadow-lg transition-shadow text-left focus-ring"
            onClick={() => setInsightModal({
              type: 'air',
              title: `${activitiesPage.insights.airQuality}: ${weather.airQuality?.level === 'good' ? activitiesPage.insights.excellent : activitiesPage.insights.moderate}`,
              description: weather.dustLevel === 'high' || weather.pollenLevel === 'high'
                ? activitiesPage.insights.highPollen
                : activitiesPage.insights.lowPollen,
            })}
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-container dark:bg-[#1e3a5f] flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">eco</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-lg font-bold text-on-surface dark:text-inverse-on-surface">
                {activitiesPage.insights.airQuality}: {weather.airQuality?.level?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || activitiesPage.insights.excellent}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                {weather.dustLevel === 'high' || weather.pollenLevel === 'high'
                  ? activitiesPage.insights.highPollen
                  : activitiesPage.insights.lowPollen}
              </p>
            </div>
          </button>
          <button
            className="glass-card p-lg flex items-center gap-lg hover:shadow-lg transition-shadow text-left focus-ring"
            onClick={() => setInsightModal({
              type: 'uv',
              title: weather.uvIndex >= 6 ? activitiesPage.insights.uvWarning : activitiesPage.insights.uvLevel,
              description: weather.uvIndex >= 8
                ? activitiesPage.insights.uvExtreme
                : weather.uvIndex >= 6
                  ? activitiesPage.insights.uvHigh
                  : activitiesPage.insights.uvLow,
            })}
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-container dark:bg-[#1e3a5f] flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-3xl" aria-hidden="true">wb_twilight</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-lg font-bold text-on-surface dark:text-inverse-on-surface">
                {weather.uvIndex >= 6 ? activitiesPage.insights.uvWarning : activitiesPage.insights.uvLevel}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                {weather.uvIndex >= 8
                  ? activitiesPage.insights.uvExtreme
                  : weather.uvIndex >= 6
                    ? activitiesPage.insights.uvHigh
                    : activitiesPage.insights.uvLow}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Hydration History Modal */}
      {hydrationHistory && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setHydrationHistory(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setHydrationHistory(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Hydration History">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">Hydration History</h3>
              <button onClick={() => setHydrationHistory(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close hydration history">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-md">
              <div className="flex justify-between py-sm border-b border-outline-variant dark:border-[#2a3a52]">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">Today</span>
                <span className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim">{hydration.liters.toFixed(1)}L</span>
              </div>
              <div className="flex justify-between py-sm border-b border-outline-variant dark:border-[#2a3a52]">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">Yesterday</span>
                <span className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim">1.6L</span>
              </div>
              <div className="flex justify-between py-sm">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">This Week Avg</span>
                <span className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim">1.5L</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Activities Modal */}
      {viewAllActivities && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setViewAllActivities(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setViewAllActivities(false); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={activitiesPage.startActivity.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{activitiesPage.startActivity.title}</h3>
              <button onClick={() => setViewAllActivities(false)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label={`Close ${activitiesPage.startActivity.title}`}>
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-md">
              {allActivities.map((act) => (
                <button
                  key={act.id}
                  className="flex items-center gap-md p-md bg-surface-container-low dark:bg-[#0b1c30] rounded-xl hover:bg-primary-container dark:hover:bg-primary/30 transition-colors text-left focus-ring"
                  onClick={() => {
                    if (act.id === 'walk' || act.id === 'run' || act.id === 'work') {
                      onActivityChange(act.id as ActivityType);
                    }
                    setViewAllActivities(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-[#1e3a5f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">{act.icon}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface block">{act.label}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">{act.subtitle}</span>
                  </div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insight Detail Modal */}
      {insightModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setInsightModal(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setInsightModal(null); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={insightModal.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{insightModal.title}</h3>
              <button onClick={() => setInsightModal(null)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label={`Close ${insightModal.title}`}>
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{insightModal.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
