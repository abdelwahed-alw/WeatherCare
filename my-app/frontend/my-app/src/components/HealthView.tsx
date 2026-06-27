/*
 * INTERACTION AUDIT — All actionable elements wired with state placeholders:
 *  1. SPF "Set Re-apply Timer" button -> timerActive state
 *  2. Hydration "250ml" button -> addWater(0.25) state update
 *  3. Hydration "500ml" button -> addWater(0.5) state update
 *  4. Allergy Alert rows (Grass Pollen, Tree Pollen, Dust & Mold) -> allergyDetail state (modal)
 *  5. Wellness Routine "Eye Protection" card -> routineDetail state (modal)
 *  6. Wellness Routine "Air Quality" card -> routineDetail state (modal)
 *  7. UV protection tip cards (check_circle, umbrella) -> uvTipDetail state (modal)
 *  8. Modal close buttons | inner elements wired above
 *  Total interactive elements found: 8 unique actionable items
 */

import { useState, useEffect } from 'react';
import type { WeatherData, Recommendations } from '../types';
import { MaterialIcon } from './Icons';
import { useLocalizedData } from '../i18n/useLocalizedData';

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
  const { healthPage } = useLocalizedData();
  const uv = weather.uvIndex;
  const uvLevel = getUVLevel(uv);
  const isExtreme = uv >= 8;
  const [consumed, setConsumed] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [allergyDetail, setAllergyDetail] = useState<{ title: string; level: string } | null>(null);
  const [routineDetail, setRoutineDetail] = useState<{ title: string; description: string } | null>(null);
  const [uvTipDetail, setUvTipDetail] = useState<{ tip: string } | null>(null);

  const allergy = recommendations.allergy;
  const goal = recommendations.hydration.liters;
  const currentHydration = Math.min(consumed, goal);
  const circumference = 2 * Math.PI * 88;
  const hydProgress = goal > 0 ? Math.min(currentHydration / goal, 1) : 0;
  const hydOffset = circumference - (hydProgress * circumference);

  const addWater = (amount: number) => {
    setConsumed(prev => Math.min(prev + amount, goal));
  };

  const reapplySeconds = uv >= 8 ? 900 : uv >= 6 ? 1800 : uv >= 3 ? 3600 : 7200;

  useEffect(() => {
    if (timerRemaining <= 0) return;
    const id = setInterval(() => {
      setTimerRemaining(prev => {
        if (prev <= 1) {
          clearInterval(id);
          alert('Time to re-apply sunscreen! UV levels are still high.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRemaining]);

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
    return `${m}m ${sec}s`;
  };

  const aqiLabel = weather.airQuality
    ? weather.airQuality.level === 'good' ? 'AQI Excellent'
      : weather.airQuality.level === 'moderate' ? 'AQI Moderate'
        : weather.airQuality.level === 'unhealthy-sensitive' ? 'AQI Unhealthy (Sensitive)'
          : 'AQI Unhealthy'
    : '';

  const solarNoon = new Date();
  solarNoon.setHours(12, 30, 0, 0);
  const peakStart = new Date(solarNoon.getTime() - 90 * 60000);
  const peakEnd = new Date(solarNoon.getTime() + 90 * 60000);
  const peakLabel = `${peakStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${peakEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;

  const isHigh = uv >= 6;
  const uvSafeTip = isExtreme ? healthPage.uvIndex.avoidSun : uv >= 6 ? healthPage.uvIndex.limitSun : healthPage.uvIndex.comfortable;
  const uvProtectionTip = isExtreme ? healthPage.uvIndex.seekShade : uv >= 6 ? healthPage.uvIndex.wearSpf : healthPage.uvIndex.noPrecautions;

  return (
    <div className="animate-in">
      {/* Header Section */}
      <section className="mb-2xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-inverse-on-surface mb-xs">{healthPage.header.title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{healthPage.header.subtitle}</p>
      </section>

      {/* Bento Grid for Health Insights */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* UV Index - High Priority (Large Card) */}
        <div className="md:col-span-8 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg p-lg card-shadow border border-outline-variant dark:border-[#2a3a52] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-lg">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl">wb_sunny</span>
                <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{healthPage.uvIndex.title}</h2>
              </div>
              {isHigh && (
                <span className={`px-md py-xs rounded-full font-label-sm text-label-sm ${
                  uv >= 8
                    ? 'bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container'
                    : 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200'
                }`}>
                  {uvLevel.label === 'Extreme' ? healthPage.uvIndex.extremeRisk : healthPage.uvIndex.highRisk}
                </span>
              )}
            </div>
            <div className="flex items-end gap-md mb-xl">
              <span className="text-7xl font-display leading-none text-on-surface dark:text-inverse-on-surface">{uv}</span>
              <div className="mb-base">
                <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim">{uvLevel.label}</p>
                <p className="font-body-md text-body-md text-outline dark:text-secondary-fixed-dim">{healthPage.uvIndex.peak}: {peakLabel}</p>
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
              <button
                className="flex gap-sm p-md bg-surface-container dark:bg-[#0b1c30] rounded-md hover:bg-surface-container-high dark:hover:bg-[#1a2a42] transition-colors text-left focus-ring"
                onClick={() => setUvTipDetail({ tip: uvSafeTip })}
              >
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">check_circle</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{uvSafeTip}</p>
              </button>
              <button
                className="flex gap-sm p-md bg-surface-container dark:bg-[#0b1c30] rounded-md hover:bg-surface-container-high dark:hover:bg-[#1a2a42] transition-colors text-left focus-ring"
                onClick={() => setUvTipDetail({ tip: uvProtectionTip })}
              >
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">umbrella</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{uvProtectionTip}</p>
              </button>
            </div>
          </div>
        </div>

        {/* SPF Recommendation Card */}
        <div className="md:col-span-4 bg-primary-container dark:bg-primary/40 text-on-primary-container dark:text-inverse-on-surface rounded-lg p-lg card-shadow flex flex-col justify-between items-center text-center">
          <div className="w-20 h-20 bg-on-primary-container/20 rounded-full flex items-center justify-center mb-md">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>sanitizer</span>
          </div>
          <div>
            <p className="font-label-md text-label-md uppercase mb-xs opacity-80">{healthPage.spfCard.label}</p>
            <h3 className="font-display text-display leading-tight mb-md">SPF {recommendations.skincare.spfValue}+</h3>
            <p className="font-body-md text-body-md mb-lg">{recommendations.skincare.description}</p>
          </div>
          <button
            className={`w-full font-label-md py-md rounded-full shadow-md transition-all duration-200 ${
              timerRemaining > 0
                ? 'bg-on-primary-container/20 text-on-primary-container'
                : 'bg-white text-primary hover:scale-105 active:scale-95'
            }`}
            onClick={() => {
              if (timerRemaining > 0) {
                setTimerRemaining(0);
              } else {
                setTimerRemaining(reapplySeconds);
              }
            }}
          >
            {timerRemaining > 0 ? formatTime(timerRemaining) : healthPage.spfCard.setTimer}
          </button>
        </div>

        {/* Hydration Reminder */}
        <div className="md:col-span-6 bg-surface-container-lowest dark:bg-[#1a2a42] rounded-lg p-lg card-shadow border border-outline-variant dark:border-[#2a3a52]">
          <div className="flex justify-between items-center mb-xl">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">water_drop</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{healthPage.hydrationStatus.title}</h2>
            </div>
            <span className="bg-surface-container dark:bg-[#0b1c30] text-primary dark:text-primary-fixed-dim px-sm py-xs rounded-full font-label-sm">{healthPage.hydrationStatus.goal}: {goal}L</span>
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
              <span className="font-label-md text-outline dark:text-secondary-fixed-dim">{Math.round(hydProgress * 100)}% {healthPage.hydrationStatus.reached}</span>
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
          <div className="absolute top-0 right-0 p-lg opacity-10" aria-hidden="true">
            <span className="material-symbols-outlined text-[120px]" style={{ fontSize: '120px' }}>grass</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">eco</span>
              <h2 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{healthPage.allergyAlert.title}</h2>
            </div>
            <div className="p-lg bg-surface-bright dark:bg-[#0b1c30] rounded-md mb-lg flex items-center justify-between">
              <div>
                <p className="font-label-md text-label-md uppercase text-on-surface-variant dark:text-secondary-fixed-dim">{healthPage.allergyAlert.riskLevel}</p>
                <h3 className="font-headline-lg text-headline-lg text-tertiary dark:text-tertiary-fixed-dim">
                  {allergy.hasAlert
                    ? allergy.severity === 'high' ? healthPage.allergyAlert.highRisk : healthPage.allergyAlert.moderateRisk
                    : healthPage.allergyAlert.lowRisk}
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
              <button
                className="flex justify-between items-center w-full py-sm border-b border-outline-variant dark:border-[#2a3a52] hover:bg-surface-container-low dark:hover:bg-[#0b1c30] px-sm rounded transition-colors text-left focus-ring"
                onClick={() => setAllergyDetail({ title: healthPage.allergyAlert.grassPollen, level: weather.pollenLevel === 'high' ? 'High' : weather.pollenLevel === 'moderate' ? 'Moderate' : 'Low' })}
              >
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">{healthPage.allergyAlert.grassPollen}</span>
                <span className={`font-label-md px-sm py-xs rounded-full ${
                  weather.pollenLevel === 'high' ? 'bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container' : 'bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim'
                }`}>
                  {weather.pollenLevel === 'high' ? 'High' : weather.pollenLevel === 'moderate' ? 'Moderate' : 'Low'}
                </span>
              </button>
              <button
                className="flex justify-between items-center w-full py-sm border-b border-outline-variant dark:border-[#2a3a52] hover:bg-surface-container-low dark:hover:bg-[#0b1c30] px-sm rounded transition-colors text-left focus-ring"
                onClick={() => setAllergyDetail({ title: healthPage.allergyAlert.treePollen, level: 'Low' })}
              >
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">{healthPage.allergyAlert.treePollen}</span>
                <span className="font-label-md px-sm py-xs bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim rounded-full">Low</span>
              </button>
              <button
                className="flex justify-between items-center w-full py-sm hover:bg-surface-container-low dark:hover:bg-[#0b1c30] px-sm rounded transition-colors text-left focus-ring"
                onClick={() => setAllergyDetail({ title: healthPage.allergyAlert.dustMold, level: weather.dustLevel === 'high' ? 'High' : weather.dustLevel === 'moderate' ? 'Moderate' : 'Low' })}
              >
                <span className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface">{healthPage.allergyAlert.dustMold}</span>
                <span className={`font-label-md px-sm py-xs rounded-full ${
                  weather.dustLevel === 'high' ? 'bg-error-container dark:bg-error/30 text-on-error-container dark:text-error-container' : 'bg-surface-container dark:bg-[#0b1c30] text-tertiary dark:text-tertiary-fixed-dim'
                }`}>
                  {weather.dustLevel === 'high' ? 'High' : weather.dustLevel === 'moderate' ? 'Moderate' : 'Low'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Personalized Health Tips */}
        <div className="md:col-span-12 bg-surface-container-low dark:bg-[#0b1c30] rounded-lg p-lg card-shadow grid md:grid-cols-3 gap-xl">
          <div className="md:col-span-1 flex flex-col justify-center">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-sm">{healthPage.wellnessRoutine.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{healthPage.wellnessRoutine.subtitle}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-md">
            <button
              className="p-md bg-white dark:bg-[#1a2a42] rounded-lg flex gap-md items-start hover:shadow-md transition-shadow text-left focus-ring"
              onClick={() => setRoutineDetail({
                title: healthPage.wellnessRoutine.eyeProtection,
                description: weather.uvIndex >= 6
                  ? healthPage.wellnessRoutine.wearSunglasses
                  : healthPage.wellnessRoutine.sunglassesOptional,
              })}
            >
              <div className="bg-primary-fixed-dim dark:bg-primary/30 p-sm rounded-md">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" aria-hidden="true">visibility</span>
              </div>
              <div>
                <h4 className="font-label-md font-bold mb-xs text-on-surface dark:text-inverse-on-surface">{healthPage.wellnessRoutine.eyeProtection}</h4>
                <p className="font-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                  {weather.uvIndex >= 6
                    ? healthPage.wellnessRoutine.wearSunglasses
                    : healthPage.wellnessRoutine.sunglassesOptional}
                </p>
              </div>
            </button>
            <button
              className="p-md bg-white dark:bg-[#1a2a42] rounded-lg flex gap-md items-start hover:shadow-md transition-shadow text-left focus-ring"
              onClick={() => setRoutineDetail({
                title: healthPage.wellnessRoutine.airQuality,
                description: weather.airQuality
                  ? `${aqiLabel} (AQI ${weather.airQuality.aqi}). ${
                      weather.airQuality.level === 'good'
                        ? healthPage.wellnessRoutine.breathingExercise
                        : healthPage.wellnessRoutine.limitOutdoor
                    }`
                  : healthPage.wellnessRoutine.notAvailable,
              })}
            >
              <div className="bg-tertiary-fixed dark:bg-tertiary/30 p-sm rounded-md">
                <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim" aria-hidden="true">respiratory_rate</span>
              </div>
              <div>
                <h4 className="font-label-md font-bold mb-xs text-on-surface dark:text-inverse-on-surface">{healthPage.wellnessRoutine.airQuality}</h4>
                <p className="font-label-sm text-on-surface-variant dark:text-secondary-fixed-dim">
                  {weather.airQuality
                    ? `${aqiLabel} (AQI ${weather.airQuality.aqi}). ${
                        weather.airQuality.level === 'good'
                          ? healthPage.wellnessRoutine.breathingExercise
                          : healthPage.wellnessRoutine.limitOutdoor
                      }`
                    : healthPage.wellnessRoutine.notAvailable}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Allergy Detail Modal */}
      {allergyDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setAllergyDetail(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setAllergyDetail(null); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={allergyDetail.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{allergyDetail.title}</h3>
              <button onClick={() => setAllergyDetail(null)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label={`Close ${allergyDetail.title}`}>
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mb-md">
              Current level: <span className={`font-bold ${allergyDetail.level === 'High' ? 'text-error' : allergyDetail.level === 'Moderate' ? 'text-orange-500' : 'text-green-500'}`}>{allergyDetail.level}</span>
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
              {allergyDetail.level === 'High'
                ? 'Consider wearing a mask and limiting outdoor exposure. Keep windows closed during peak hours.'
                : allergyDetail.level === 'Moderate'
                  ? 'Be mindful if you have sensitivities. Consider checking forecasts before prolonged outdoor activity.'
                  : 'Low levels today. No special precautions needed.'}
            </p>
          </div>
        </div>
      )}

      {/* Routine Detail Modal */}
      {routineDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setRoutineDetail(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setRoutineDetail(null); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={routineDetail.title}>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">{routineDetail.title}</h3>
              <button onClick={() => setRoutineDetail(null)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label={`Close ${routineDetail.title}`}>
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{routineDetail.description}</p>
          </div>
        </div>
      )}

      {/* UV Tip Detail Modal */}
      {uvTipDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-lg"
          onClick={() => setUvTipDetail(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setUvTipDetail(null); }}
          role="presentation"
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="bg-surface dark:bg-[#1a2a42] rounded-xl p-xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="UV Protection Tip">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">UV Protection Tip</h3>
              <button onClick={() => setUvTipDetail(null)} className="text-on-surface-variant dark:text-secondary-fixed-dim focus-ring" aria-label="Close UV Protection Tip">
                <MaterialIcon icon="close" size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{uvTipDetail.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
