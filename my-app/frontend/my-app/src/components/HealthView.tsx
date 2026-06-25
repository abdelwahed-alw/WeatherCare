import { useState } from 'react';
import type { WeatherData, Recommendations } from '../types';

interface HealthViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
}

function getUVLevel(uv: number): { label: string; color: string; percent: number } {
  if (uv >= 11) return { label: 'Extreme', color: 'bg-purple-600', percent: 100 };
  if (uv >= 8) return { label: 'Very High', color: 'bg-error', percent: 82 };
  if (uv >= 6) return { label: 'High', color: 'bg-orange-500', percent: 65 };
  if (uv >= 3) return { label: 'Moderate', color: 'bg-yellow-400', percent: 45 };
  return { label: 'Low', color: 'bg-green-500', percent: 25 };
}

export default function HealthView({ weather, recommendations }: HealthViewProps) {
  const uv = weather.uvIndex;
  const uvLevel = getUVLevel(uv);
  const isExtreme = uv >= 8;
  const [timerActive, setTimerActive] = useState(false);
  const [currentHydration, setCurrentHydration] = useState(recommendations.hydration.liters);

  const allergy = recommendations.allergy;
  const circumference = 2 * Math.PI * 88;
  const goal = 2.5;
  const hydProgress = Math.min(currentHydration / goal, 1);
  const hydOffset = circumference - (hydProgress * circumference);

  const addWater = (amount: number) => {
    setCurrentHydration(prev => Math.min(prev + amount, goal));
  };

  return (
    <div className="animate-in">
      {/* Header Section */}
      <section className="mb-2xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface mb-xs">Health & Protection</h1>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">Your personalized environmental wellness guide for today.</p>
      </section>

      {/* Bento Grid for Health Insights */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* UV Index - High Priority (Large Card) */}
        <div className="md:col-span-8 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg p-lg card-shadow border border-outline-variant dark:border-[#2a3a52] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-lg">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl">wb_sunny</span>
                <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">UV Index</h2>
              </div>
              {isExtreme && (
                <span className="bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container px-md py-xs rounded-full font-label-sm text-label-sm">
                  {uvLevel.label === 'Extreme' ? 'EXTREME RISK' : 'HIGH RISK'}
                </span>
              )}
            </div>
            <div className="flex items-end gap-md mb-xl">
              <span className="text-7xl font-display leading-none text-on-surface dark:text-inverse-on-surface">{uv}</span>
              <div className="mb-base">
                <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim">{uvLevel.label}</p>
                <p className="font-body-md text-body-md text-outline dark:text-secondary-fixed-dim">Peak: 1:30 PM</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-4 bg-secondary-container dark:bg-[#2a3a52] rounded-full overflow-hidden mb-lg">
              <div
                className={`h-full transition-all duration-1000 ${uvLevel.color}`}
                style={{ width: `${uvLevel.percent}%` }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex gap-sm p-md bg-surface-container dark:bg-[#0b1c30] rounded-md">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">check_circle</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                  {isExtreme
                    ? 'Avoid sun exposure between 10 AM and 4 PM.'
                    : uv >= 6
                      ? 'Limit sun exposure during midday hours.'
                      : 'UV levels are comfortable today.'}
                </p>
              </div>
              <div className="flex gap-sm p-md bg-surface-container dark:bg-[#0b1c30] rounded-md">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">umbrella</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                  {isExtreme
                    ? 'Seek shade and wear a wide-brimmed hat.'
                    : uv >= 6
                      ? 'Wear SPF 30+ and protective clothing.'
                      : 'No special precautions needed.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SPF Recommendation Card */}
        <div className="md:col-span-4 bg-primary-container dark:bg-primary/40 text-on-primary-container dark:text-inverse-on-surface rounded-lg p-lg card-shadow flex flex-col justify-between items-center text-center">
          <div className="w-20 h-20 bg-on-primary-container/20 rounded-full flex items-center justify-center mb-md">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>sanitizer</span>
          </div>
          <div>
            <p className="font-label-md text-label-md uppercase mb-xs opacity-80">SPF Recommended</p>
            <h3 className="font-display text-display leading-tight mb-md">SPF {recommendations.skincare.spfValue}+</h3>
            <p className="font-body-md text-body-md mb-lg">{recommendations.skincare.description}</p>
          </div>
          <button
            className={`w-full font-label-md py-md rounded-full shadow-md transition-all duration-200 ${
              timerActive
                ? 'bg-on-primary-container/20 text-on-primary-container cursor-default'
                : 'bg-white text-primary hover:scale-105 active:scale-95'
            }`}
            onClick={() => {
              if (!timerActive) {
                setTimerActive(true);
                setTimeout(() => setTimerActive(false), 3000);
              }
            }}
          >
            {timerActive ? 'Timer Set (2h)' : 'Set Re-apply Timer'}
          </button>
        </div>

        {/* Hydration Reminder */}
        <div className="md:col-span-6 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg p-lg card-shadow border border-outline-variant dark:border-[#2a3a52]">
          <div className="flex justify-between items-center mb-xl">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">water_drop</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">Hydration Status</h2>
            </div>
            <span className="bg-surface-container dark:bg-[#0b1c30] text-primary dark:text-primary-fixed-dim px-sm py-xs rounded-full font-label-sm">Goal: {goal}L</span>
          </div>
          <div className="flex items-center justify-center relative py-lg">
            <svg className="w-48 h-48 -rotate-90">
              <circle className="text-secondary-container dark:text-[#2a3a52]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
              <circle
                className="text-primary dark:text-primary-fixed-dim transition-all duration-1000"
                cx="96" cy="96" fill="transparent" r="88"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={hydOffset}
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display text-on-surface dark:text-inverse-on-surface">{currentHydration.toFixed(1)}L</span>
              <span className="font-label-md text-outline dark:text-secondary-fixed-dim">{Math.round(hydProgress * 100)}% Reached</span>
            </div>
          </div>
          <div className="flex justify-center gap-md mt-lg">
            <button
              className="flex items-center gap-xs px-lg py-md bg-surface-container-high dark:bg-[#1e3a5f] rounded-full hover:bg-surface-container-highest transition-colors text-on-surface dark:text-inverse-on-surface"
              onClick={() => addWater(0.25)}
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-label-md">250ml</span>
            </button>
            <button
              className="flex items-center gap-xs px-lg py-md bg-surface-container-high dark:bg-[#1e3a5f] rounded-full hover:bg-surface-container-highest transition-colors text-on-surface dark:text-inverse-on-surface"
              onClick={() => addWater(0.5)}
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-label-md">500ml</span>
            </button>
          </div>
        </div>

        {/* Allergy Alert */}
        <div className="md:col-span-6 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg p-lg card-shadow border border-outline-variant dark:border-[#2a3a52] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-lg opacity-10">
            <span className="material-symbols-outlined text-[120px]" style={{ fontSize: '120px' }}>grass</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">eco</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">Allergy Alert</h2>
            </div>
            <div className="p-lg bg-surface-bright dark:bg-[#0b1c30] rounded-md mb-lg flex items-center justify-between">
              <div>
                <p className="font-label-md text-label-md uppercase text-on-surface-variant dark:text-secondary-fixed-dim">Risk Level</p>
                <h3 className="font-headline-lg text-headline-lg text-tertiary dark:text-tertiary-fixed-dim">
                  {allergy.hasAlert
                    ? allergy.severity === 'high' ? 'High Risk' : 'Moderate Risk'
                    : 'Low Risk'}
                </h3>
              </div>
              <div className="flex -space-x-2">
                <span className="w-12 h-12 rounded-full bg-secondary-fixed dark:bg-[#2a3a52] flex items-center justify-center border-4 border-surface-container-lowest dark:border-[#1a2a42]">
                  <span className="material-symbols-outlined text-sm text-on-surface dark:text-inverse-on-surface">spa</span>
                </span>
                <span className="w-12 h-12 rounded-full bg-tertiary-fixed-dim dark:bg-[#3a4a62] flex items-center justify-center border-4 border-surface-container-lowest dark:border-[#1a2a42]">
                  <span className="material-symbols-outlined text-sm text-on-surface dark:text-inverse-on-surface">forest</span>
                </span>
              </div>
            </div>
            <div className="space-y-sm">
              <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-[#2a3a52]">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">Grass Pollen</span>
                <span className={`font-label-md px-sm py-xs rounded-full ${
                  weather.pollenLevel === 'high' ? 'bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container' : 'bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim'
                }`}>
                  {weather.pollenLevel === 'high' ? 'High' : weather.pollenLevel === 'moderate' ? 'Moderate' : 'Low'}
                </span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-outline-variant dark:border-[#2a3a52]">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">Tree Pollen</span>
                <span className="font-label-md px-sm py-xs bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim rounded-full">Low</span>
              </div>
              <div className="flex justify-between items-center py-sm">
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">Dust & Mold</span>
                <span className={`font-label-md px-sm py-xs rounded-full ${
                  weather.dustLevel === 'high' ? 'bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container' : 'bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim'
                }`}>
                  {weather.dustLevel === 'high' ? 'High' : weather.dustLevel === 'moderate' ? 'Moderate' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Health Tips */}
        <div className="md:col-span-12 bg-surface-container-low dark:bg-[#0b1c30] rounded-lg p-lg card-shadow grid md:grid-cols-3 gap-xl">
          <div className="md:col-span-1 flex flex-col justify-center">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-sm">Wellness Routine</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">Based on your activity and current conditions.</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="p-md bg-white dark:bg-[#1a2a42] rounded-lg flex gap-md items-start">
              <div className="bg-primary-fixed-dim dark:bg-primary/30 p-sm rounded-md">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">visibility</span>
              </div>
              <div>
                <h4 className="font-label-md font-bold mb-xs text-on-surface dark:text-inverse-on-surface">Eye Protection</h4>
                <p className="font-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                  {weather.uvIndex >= 6
                    ? 'Wear polarized sunglasses to reduce high-reflectance glare today.'
                    : 'UV levels are mild. Sunglasses optional.'}
                </p>
              </div>
            </div>
            <div className="p-md bg-white dark:bg-[#1a2a42] rounded-lg flex gap-md items-start">
              <div className="bg-tertiary-fixed dark:bg-tertiary/30 p-sm rounded-md">
                <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim">respiratory_rate</span>
              </div>
              <div>
                <h4 className="font-label-md font-bold mb-xs text-on-surface dark:text-inverse-on-surface">Air Quality</h4>
                <p className="font-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                  {weather.airQuality
                    ? `${weather.airQuality.level === 'good' ? 'Excellent' : 'Moderate'} (AQI ${weather.airQuality.aqi}). ${
                        weather.airQuality.level === 'good'
                          ? 'Great time for light outdoor breathing exercises.'
                          : 'Limit strenuous outdoor activities.'
                      }`
                    : 'Air quality data not available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
