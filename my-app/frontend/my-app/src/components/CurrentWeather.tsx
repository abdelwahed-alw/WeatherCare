import type { WeatherData } from '../types';
import { getWeatherIcon, DropletIcon, WindIcon, UVIcon, LocationIcon } from './Icons';

interface CurrentWeatherProps {
  data: WeatherData;
  cityName: string;
}

export default function CurrentWeather({ data, cityName }: CurrentWeatherProps) {
  const { temperature, condition, humidity, windSpeed, uvIndex, feelsLike } = data;

  const isExtremeHeat = temperature >= 38;

  return (
    <div className="current-weather glass-card animate-in">
      <div className="weather-location">
        <LocationIcon size={16} />
        <span>{cityName}</span>
        {isExtremeHeat && (
          <span className="heat-alert-badge">🔥 Heat Alert</span>
        )}
      </div>
      <div className="weather-main">
        <div className="weather-temp-area">
          <span className="weather-temp">{temperature}°</span>
          <div className="weather-condition">
            {getWeatherIcon(condition, 28, isExtremeHeat ? 'sun-extreme' : undefined)}
            <span>{condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
          <span className="weather-feels">Feels like {feelsLike}°</span>
        </div>
        <div className="weather-stats">
          <div className="stat-item animate-in animate-in-delay-1">
            <UVIcon size={18} />
            <div className="stat-info">
              <span className="stat-value">UV {uvIndex}</span>
              <span className="stat-label">
                {uvIndex >= 8 ? 'Extreme' : uvIndex >= 6 ? 'High' : uvIndex >= 3 ? 'Moderate' : 'Low'}
              </span>
            </div>
          </div>
          <div className="stat-item animate-in animate-in-delay-2">
            <DropletIcon size={18} />
            <div className="stat-info">
              <span className="stat-value">{humidity}%</span>
              <span className="stat-label">Humidity</span>
            </div>
          </div>
          <div className="stat-item animate-in animate-in-delay-3">
            <WindIcon size={18} />
            <div className="stat-info">
              <span className="stat-value">{windSpeed} km/h</span>
              <span className="stat-label">Wind</span>
            </div>
          </div>
        </div>
      </div>
      {data.airQuality && (
        <div className="aqi-row">
          <span className={`aqi-dot ${data.airQuality.level}`} />
          <span>Air Quality: {data.airQuality.level.replace('-', ' ')}</span>
          <span className="aqi-value">AQI {data.airQuality.aqi}</span>
        </div>
      )}
    </div>
  );
}
