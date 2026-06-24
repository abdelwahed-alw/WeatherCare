import type { ForecastDay } from '../types';
import { getWeatherIcon } from './Icons';

interface ForecastWidgetProps {
  forecast: ForecastDay[];
}

export default function ForecastWidget({ forecast }: ForecastWidgetProps) {
  return (
    <div className="forecast-widget glass-card animate-in animate-in-delay-3">
      <h3 className="widget-title">7-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, i) => (
          <div key={i} className="forecast-day">
            <span className="forecast-day-name">{i === 0 ? 'Today' : day.day}</span>
            {getWeatherIcon(day.condition, 20)}
            <div className="forecast-temps">
              <span className="forecast-high">{day.tempHigh}°</span>
              <span className="forecast-low">{day.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
