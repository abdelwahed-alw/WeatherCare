import type { WeatherData, Recommendations } from '../types';
import { MaskIcon, SunscreenIcon, UVIcon, HeartIcon, DropletIcon } from './Icons';

interface HealthViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
}

export default function HealthView({ weather, recommendations }: HealthViewProps) {
  const { allergy, skincare } = recommendations;
  const uv = weather.uvIndex;
  const uvLabel = uv >= 8 ? 'Extreme' : uv >= 6 ? 'High' : uv >= 3 ? 'Moderate' : 'Low';
  const uvColor = uv >= 8 ? 'var(--danger)' : uv >= 6 ? 'var(--alert-allergy)' : uv >= 3 ? 'var(--warning)' : 'var(--success)';

  return (
    <div className="tab-view animate-in">
      <h2 className="tab-view-title">Health & Protection</h2>
      <p className="tab-view-sub">UV, allergy, and skin protection info</p>

      <div className="health-grid">
        <div className="glass-card health-card">
          <div className="health-card-header">
            <UVIcon size={22} />
            <h3>UV Index</h3>
          </div>
          <div className="uv-big" style={{ color: uvColor }}>{uv}</div>
          <span className="uv-label" style={{ color: uvColor }}>{uvLabel}</span>
          <div className="uv-track">
            <div className="uv-fill" style={{ width: `${(uv / 11) * 100}%`, background: uvColor }} />
          </div>
          <div className="uv-scale">
            <span>0</span><span>3</span><span>6</span><span>8</span><span>11+</span>
          </div>
          {uv >= 6 && (
            <p className="rec-desc" style={{ marginTop: 10 }}>
              {uv >= 8
                ? 'Extreme UV! Avoid being outside during midday hours. Seek shade and wear protective clothing.'
                : 'High UV. Wear SPF 50+, a hat, and sunglasses.'}
            </p>
          )}
        </div>

        <div className="glass-card health-card">
          <div className="health-card-header">
            <SunscreenIcon size={22} />
            <h3>Skin Protection</h3>
          </div>
          <div className="spf-badge">SPF {skincare.spfValue}</div>
          <p className="rec-desc">{skincare.description}</p>
          <div className="protection-bar">
            <div className="protection-label">
              <span>Protection level</span>
              <span className="protection-level">{skincare.spfLevel === 'very-high' ? 'Very High' : skincare.spfLevel.charAt(0).toUpperCase() + skincare.spfLevel.slice(1)}</span>
            </div>
            <div className="protection-track">
              <div className="protection-fill" style={{ width: `${skincare.spfValue <= 15 ? 25 : skincare.spfValue <= 30 ? 50 : skincare.spfValue <= 50 ? 75 : 100}%` }} />
            </div>
          </div>
          <div className="health-products">
            {skincare.products.map(p => (
              <span key={p} className="health-tag">{p === 'sunscreen' ? '☀️ Sunscreen' : '💧 Moisturizer'}</span>
            ))}
          </div>
        </div>

        <div className="glass-card health-card">
          <div className="health-card-header">
            <MaskIcon size={22} />
            <h3>Allergy & Air Quality</h3>
          </div>
          {allergy.hasAlert ? (
            <>
              <div className={`allergy-level ${allergy.severity}`}>
                {allergy.severity === 'high' ? 'High Risk' : 'Moderate Risk'}
              </div>
              <div className="allergy-triggers">
                {allergy.triggers.map(t => (
                  <span key={t} className="trigger-tag">{t}</span>
                ))}
              </div>
              <p className="rec-desc">{allergy.message}</p>
            </>
          ) : (
            <p className="allergy-safe">Low allergy risk today. Enjoy your day!</p>
          )}
          {weather.airQuality && (
            <div className="aqi-mini">
              <DropletIcon size={14} />
              <span>AQI: {weather.airQuality.aqi} — {weather.airQuality.level.replace('-', ' ')}</span>
            </div>
          )}
        </div>

        <div className="glass-card health-card">
          <div className="health-card-header">
            <HeartIcon size={22} />
            <h3>Heat Safety</h3>
          </div>
          <div className="health-metrics">
            <div className="health-metric">
              <span className="metric-value">{weather.temperature}°</span>
              <span className="metric-label">Temp</span>
            </div>
            <div className="health-metric">
              <span className="metric-value">{weather.humidity}%</span>
              <span className="metric-label">Humidity</span>
            </div>
            <div className="health-metric">
              <span className="metric-value">{weather.windSpeed}</span>
              <span className="metric-label">Wind km/h</span>
            </div>
          </div>
          {weather.temperature >= 38 && (
            <p className="health-warning">Heat alert! Stay hydrated, avoid peak sun, and wear light clothing.</p>
          )}
        </div>
      </div>
    </div>
  );
}
