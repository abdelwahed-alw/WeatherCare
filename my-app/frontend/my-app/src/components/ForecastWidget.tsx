import type { ForecastDay } from '../types';
import { CalendarIcon } from './Icons';

interface ForecastWidgetProps {
  forecast: ForecastDay[];
}

function getWeatherIcon(condition: string): string {
  switch (condition) {
    case 'sunny': return 'light_mode';
    case 'partly-cloudy': return 'partly_cloudy_day';
    case 'cloudy': return 'cloud';
    case 'windy': return 'air';
    default: return 'light_mode';
  }
}

function getIconColor(condition: string): string {
  switch (condition) {
    case 'sunny': return 'text-amber-500';
    case 'partly-cloudy': return 'text-blue-400';
    case 'cloudy': return 'text-blue-500';
    case 'windy': return 'text-blue-300';
    default: return 'text-amber-500';
  }
}

export default function ForecastWidget({ forecast }: ForecastWidgetProps) {
  return (
    <div className="aura-card p-lg animate-in">
      <h3 className="font-headline-md text-headline-md flex items-center gap-sm mb-md">
        <CalendarIcon className="text-primary" />
        7-Day Forecast
      </h3>
      <div className="space-y-sm">
        {forecast.map((day, i) => (
          <div key={i} className="flex items-center gap-md py-sm border-b border-outline-variant last:border-0">
            <span className="w-12 text-label-md text-on-surface-variant">{i === 0 ? 'Today' : day.day}</span>
            <span className={`material-symbols-outlined ${getIconColor(day.condition)}`}>
              {getWeatherIcon(day.condition)}
            </span>
            <div className="ml-auto flex gap-sm text-body-md">
              <span className="font-semibold text-on-surface">{day.tempHigh}°</span>
              <span className="text-outline">{day.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
