import type { WeatherData, Recommendations } from '../types';
import { CalendarIcon, PsychologyIcon, SelfImprovementIcon, HikingIcon, PedalBikeIcon, RunIcon, CheckroomIcon, SunglassesIcon as EyeglassesIcon } from './Icons';

interface HomeViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
  cityName: string;
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

function formatDayLabel(day: string, index: number): string {
  if (index === 0) return 'Tomorrow';
  return day;
}

export default function HomeView({ weather, recommendations, cityName }: HomeViewProps) {
  const { temperature, condition, humidity, windSpeed, feelsLike, airQuality, forecast, uvIndex } = weather;
  const conditionLabel = condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const weatherIcon = getWeatherIcon(condition);

  const activityCards = [
    { icon: RunIcon, label: 'Running', badge: 'EXCELLENT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { icon: PedalBikeIcon, label: 'Cycling', badge: 'GREAT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { icon: SelfImprovementIcon, label: 'Yoga', badge: 'EXCELLENT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { icon: HikingIcon, label: 'Hiking', badge: 'MODERATE', badgeClass: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  ];

  return (
    <main className="space-y-xl animate-in">
      {/* Hero Section: Current Weather (Bento Pattern) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Main Hero Card */}
        <div className="md:col-span-8 aura-card p-lg relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="absolute -right-10 -top-10 opacity-10">
            <span className="material-symbols-outlined text-[240px]" style={{ color: '#004ac6' }}>light_mode</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-sm mb-base">
              <span className="px-sm py-xs bg-primary-fixed dark:bg-primary/30 text-on-primary-fixed-variant dark:text-primary-fixed-dim font-label-sm text-label-sm rounded-full">
                LIVE • {cityName.toUpperCase()}
              </span>
            </div>
            <div className="flex items-baseline gap-sm mt-md">
              <h2 className="font-display text-display text-primary dark:text-primary-fixed-dim">{temperature}°C</h2>
              <span className="font-headline-md text-headline-md text-on-surface-variant dark:text-secondary-fixed-dim">{conditionLabel}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim mt-sm">
              Feels like {feelsLike}°C {temperature >= 30 ? '— Stay hydrated and avoid midday sun.' : '— A perfect day for outdoor wellness.'}
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-md pt-xl border-t border-outline-variant dark:border-[#434655] mt-xl">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">AQI</span>
              <div className="flex items-center gap-xs">
                <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{airQuality?.aqi || 42}</span>
                <span className="text-sm font-medium text-secondary dark:text-secondary-fixed-dim">{airQuality?.level?.replace('-', ' ') || 'Good'}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">Humidity</span>
              <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline dark:text-secondary-fixed-dim uppercase tracking-wider">Wind</span>
              <span className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim">{windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* "What to Wear" Interactive Card */}
        <div className="md:col-span-4 aura-card p-lg bg-surface-container-low dark:bg-[#1a2a42] border-none flex flex-col">
          <div className="flex items-center gap-sm mb-md">
            <CheckroomIcon className="text-primary dark:text-primary-fixed-dim" />
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">What to Wear</h3>
          </div>
          <div className="space-y-md flex-grow">
            <div className="flex items-start gap-md p-md bg-white dark:bg-[#0b1c30] rounded-lg shadow-sm">
              <CheckroomIcon className="text-primary dark:text-primary-fixed-dim mt-1" />
              <div>
                <span className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim block">Light Layers</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">{recommendations.clothing.description}</p>
              </div>
            </div>
            <div className="flex items-start gap-md p-md bg-white dark:bg-[#0b1c30] rounded-lg shadow-sm">
              <EyeglassesIcon className="text-primary dark:text-primary-fixed-dim mt-1" />
              <div>
                <span className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim block">Eye Protection</span>
                <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
                  {uvIndex >= 6 ? 'UV levels are high. Grab your favorite polarized shades.' : 'UV levels are moderate. Sunglasses recommended.'}
                </p>
              </div>
            </div>
          </div>
          <button 
            className="mt-xl w-full py-md bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed font-label-md text-label-md rounded-full hover:bg-on-primary-fixed-variant dark:hover:bg-primary transition-colors active:scale-95 duration-200"
            onClick={() => alert('Full clothing suggestions would open here.')}
          >
            See Full Suggestions
          </button>
        </div>
      </section>

      {/* 7-Day Forecast & Health Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* 7-Day Forecast */}
        <div className="lg:col-span-2 aura-card p-lg">
          <div className="flex items-center justify-between mb-xl">
            <div className="flex items-center gap-sm">
              <CalendarIcon className="text-primary dark:text-primary-fixed-dim" />
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">7-Day Forecast</h3>
            </div>
            <button 
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline"
              onClick={() => alert('Full 7-day details would open here.')}
            >
              Full Details
            </button>
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
          <div className="aura-card p-lg bg-primary-container dark:bg-primary/40 text-on-primary-container dark:text-inverse-on-surface border-none flex-grow">
            <div className="flex items-center gap-sm mb-md">
              <PsychologyIcon />
              <h3 className="font-headline-md text-headline-md">Daily Insight</h3>
            </div>
            <p className="font-body-lg text-body-lg mb-lg italic">
              {temperature >= 35
                ? '"The heat reminds us to slow down and listen to our bodies."'
                : temperature >= 25
                  ? '"Clear skies reflect a clear mind. Take 5 minutes to breathe today."'
                  : '"Cool breezes bring fresh energy. Perfect for a mindful walk."'}
            </p>
            <div className="space-y-md">
              <div className="flex justify-between items-center bg-white/10 p-md rounded-xl backdrop-blur-sm">
                <span className="font-label-md text-label-md">Outdoor Score</span>
                <span className="font-headline-md text-headline-md">
                  {temperature > 35 ? '6.8' : temperature > 30 ? '7.5' : temperature > 20 ? '9.2' : '8.0'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-md rounded-xl backdrop-blur-sm">
                <span className="font-label-md text-label-md">Hydration Need</span>
                <span className="font-headline-md text-headline-md">
                  {temperature >= 35 ? 'Very High' : temperature >= 28 ? 'High' : temperature >= 20 ? 'Moderate' : 'Low'}
                </span>
              </div>
            </div>
          </div>

          {/* Weather Visual */}
          <div className="aura-card h-48 overflow-hidden relative group cursor-pointer bg-gradient-to-br from-blue-100 dark:from-[#0b1c30] to-blue-50 dark:to-[#1a2a42] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end p-md">
              <span className="text-white font-label-md text-label-md">
                {temperature >= 30 ? 'Indoor Activities: Recommended' : 'Outdoor Yoga: Recommended (2PM)'}
              </span>
            </div>
            <span className="material-symbols-outlined text-[80px] text-blue-300/50 dark:text-blue-500/30" style={{ fontSize: '80px' }}>
              {weatherIcon.icon}
            </span>
          </div>
        </div>
      </section>

      {/* Activities Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">Plan Your Activity</h3>
          <span className="material-symbols-outlined text-outline dark:text-secondary-fixed-dim cursor-pointer">chevron_right</span>
        </div>
        <div className="flex gap-lg overflow-x-auto pb-md custom-scrollbar">
          {activityCards.map((card, i) => (
            <div key={i} className="min-w-[200px] aura-card p-md flex flex-col items-center text-center gap-sm hover:border-primary dark:hover:border-primary-fixed-dim transition-all">
              <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-[#1e3a5f] flex items-center justify-center">
                <card.icon className="text-primary dark:text-primary-fixed-dim" />
              </div>
              <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">{card.label}</span>
              <span className={`px-sm py-xs text-xs font-bold rounded-full ${card.badgeClass}`}>
                {card.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button
        className="fixed bottom-24 right-6 md:right-12 w-14 h-14 bg-primary dark:bg-primary-fixed-dim text-on-primary dark:text-on-primary-fixed rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
      </button>
    </main>
  );
}
