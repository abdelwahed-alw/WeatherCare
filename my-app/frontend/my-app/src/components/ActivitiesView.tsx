import { useState } from 'react';
import type { WeatherData, ActivityType, Recommendations } from '../types';

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

const allActivities: ActivityOption[] = [
  { id: 'walk', label: 'Walking', icon: 'directions_walk', subtitle: '35 min session' },
  { id: 'run', label: 'Running', icon: 'directions_run', subtitle: '5.2 km target' },
  { id: 'work', label: 'Cycling', icon: 'directions_bike', subtitle: '12 km trail' },
  { id: 'yoga', label: 'Yoga', icon: 'self_improvement', subtitle: 'Mindful flow' },
  { id: 'swim', label: 'Swimming', icon: 'pool', subtitle: '20 laps goal' },
];

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
  const temp = weather.temperature;
  const conditionLabel = weather.condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const [fabClicked, setFabClicked] = useState(false);

  const timeSlots = [6, 8, 10, 12, 14, 16];
  const temps = timeSlots.map(h => estimateTempAtHour(temp, h));
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;

  const hydration = recommendations.hydration;
  const circumference = 2 * Math.PI * 88;
  const progress = Math.min(hydration.liters / 1.8, 1);
  const offset = circumference - (progress * circumference);

  const isActiveActivity = (id: string): boolean => {
    if (id === 'walk' || id === 'run' || id === 'work') {
      return activity === id;
    }
    return false;
  };

  return (
    <div className="space-y-xl animate-in">
      {/* Header Section */}
      <section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface mb-xs">Today's Focus</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-secondary-fixed-dim">
          {temp >= 35 ? 'Take it easy — extreme heat today. Stay hydrated.' :
           temp >= 30 ? 'Warm conditions. Plan around peak sun hours.' :
           temp >= 20 ? 'Optimal conditions for performance and clarity.' :
           'Cool and fresh. Perfect for an active day.'}
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
                  OPTIMAL WINDOW
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-xs">Morning Clarity</h3>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim max-w-md">
                  The best time for your run is between 7:00 AM and 9:30 AM. Air quality is peak and UV index is moderate.
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
                      {hour % 12 === 0 ? '12PM' : hour < 12 ? `${hour}AM` : `${hour % 12}PM`}
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
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-md">Hydration Plan</h3>
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
              <span className="font-label-md text-label-md text-on-surface-variant dark:text-secondary-fixed-dim">Goal: 1.8L</span>
            </div>
          </div>
          <div className="flex gap-sm w-full">
            <button
              className="flex-1 py-md bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-xl font-label-md flex items-center justify-center gap-sm active:scale-95 transition-transform"
              onClick={() => onActivityChange('walk')}
            >
              <span className="material-symbols-outlined">directions_walk</span> Start
            </button>
            <button 
              className="px-md py-md bg-surface-container-high dark:bg-[#1e3a5f] text-primary dark:text-primary-fixed-dim rounded-xl active:scale-95 transition-transform"
              onClick={() => alert('Hydration history will be shown here.')}
            >
              <span className="material-symbols-outlined">history</span>
            </button>
          </div>
          <p className="mt-lg font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
            {hydration.liters >= 1.8
              ? 'Goal reached! Stay hydrated!'
              : `${hydration.glasses} glasses to reach your target.`}
            <span className="block font-bold text-primary dark:text-primary-fixed-dim mt-xs">
              {hydration.liters >= 1.8 ? 'Well done!' : 'Keep it up!'}
            </span>
          </p>
        </div>

        {/* Activity Selection */}
        <div className="md:col-span-12">
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">Start Activity</h3>
            <button 
              className="text-primary dark:text-primary-fixed-dim font-label-md hover:underline"
              onClick={() => alert('All activities view will be opened.')}
            >
              View All
            </button>
          </div>
          <div className="flex gap-md overflow-x-auto pb-sm hide-scrollbar">
            {allActivities.map((act) => {
              const isActive = isActiveActivity(act.id);
              return (
                <button
                  key={act.id}
                  className={`flex-shrink-0 w-44 glass-card p-md flex flex-col items-center text-center cursor-pointer group hover:bg-primary-container dark:hover:bg-primary/30 transition-all ${
                    isActive ? 'active-ring' : ''
                  }`}
                  onClick={() => {
                    if (act.id === 'walk' || act.id === 'run' || act.id === 'work') {
                      onActivityChange(act.id as ActivityType);
                    }
                  }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-md transition-colors ${
                    isActive
                      ? 'bg-primary dark:bg-primary-fixed-dim group-hover:bg-on-primary/20'
                      : 'bg-surface-container dark:bg-[#1e3a5f] group-hover:bg-on-primary/20'
                  }`}>
                    <span className={`material-symbols-outlined text-3xl ${
                      isActive ? 'text-on-primary dark:text-on-primary-fixed' : 'text-primary dark:text-primary-fixed-dim group-hover:text-on-primary'
                    }`}>
                      {act.icon}
                    </span>
                  </div>
                  <span className={`font-headline-md text-body-lg font-bold ${
                    isActive ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface dark:text-inverse-on-surface group-hover:text-on-primary'
                  }`}>
                    {act.label}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-secondary-fixed-dim group-hover:text-on-primary/80">
                    {act.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Insights Section */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="glass-card p-lg flex items-center gap-lg">
            <div className="w-14 h-14 rounded-2xl bg-surface-container dark:bg-[#1e3a5f] flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-3xl">eco</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-lg font-bold text-on-surface dark:text-inverse-on-surface">
                Air Quality: {weather.airQuality?.level?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Good'}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                {weather.dustLevel === 'high' || weather.pollenLevel === 'high'
                  ? 'High pollen or dust levels detected today. Consider wearing a mask.'
                  : 'Low pollen levels detected today. Perfect for deep breathing exercises.'}
              </p>
            </div>
          </div>
          <div className="glass-card p-lg flex items-center gap-lg">
            <div className="w-14 h-14 rounded-2xl bg-surface-container dark:bg-[#1e3a5f] flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-3xl">wb_twilight</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-lg font-bold text-on-surface dark:text-inverse-on-surface">
                UV {weather.uvIndex >= 6 ? 'Warning' : 'Level'}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                {weather.uvIndex >= 8
                  ? 'UV is extreme. Avoid prolonged exposure between 10 AM and 4 PM.'
                  : weather.uvIndex >= 6
                    ? `UV peaks at midday. Apply SPF 30+ if staying outdoors for more than 15 mins.`
                    : 'UV levels are comfortable. No special precautions needed.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        className={`fixed right-6 bottom-24 w-16 h-16 bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform z-40 ${
          fabClicked ? 'scale-110' : ''
        }`}
        onClick={() => { setFabClicked(!fabClicked); }}
      >
        <span className="material-symbols-outlined text-3xl">{fabClicked ? 'pause' : 'play_arrow'}</span>
      </button>
    </div>
  );
}
