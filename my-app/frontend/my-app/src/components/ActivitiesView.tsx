import type { WeatherData, ActivityType, Recommendations } from '../types';
import { ActivityIcon, WaterBottleIcon, ClockIcon, SunIcon } from './Icons';

interface ActivitiesViewProps {
  weather: WeatherData;
  recommendations: Recommendations;
  activity: ActivityType;
  onActivityChange: (a: ActivityType) => void;
}

const activityDetails: Record<ActivityType, { label: string; icon: string; desc: string }> = {
  walk: { label: 'Walking', icon: 'walk', desc: 'Casual walking in urban or park areas' },
  run: { label: 'Running', icon: 'run', desc: 'Outdoor running or jogging' },
  work: { label: 'Outdoor Work', icon: 'work', desc: 'Construction, farming, or manual labor' },
};

export default function ActivitiesView({ weather, recommendations, activity, onActivityChange }: ActivitiesViewProps) {
  const temp = weather.temperature;
  const bestHours = temp >= 38 ? 'Before 8am or after 7pm' : temp >= 32 ? 'Before 10am or after 6pm' : 'Anytime';
  const heatRisk = temp >= 38 ? 'Extreme' : temp >= 32 ? 'High' : temp >= 25 ? 'Moderate' : 'Low';

  return (
    <div className="tab-view animate-in">
      <h2 className="tab-view-title">Activities</h2>
      <p className="tab-view-sub">Choose your activity for personalized hydration & tips</p>

      <div className="activity-grid">
        {(Object.entries(activityDetails) as [ActivityType, typeof activityDetails['walk']][]).map(([key, detail]) => (
          <button
            key={key}
            className={`activity-option glass-card ${activity === key ? 'active' : ''}`}
            onClick={() => onActivityChange(key)}
          >
            <ActivityIcon size={28} />
            <div className="activity-option-info">
              <span className="activity-option-label">{detail.label}</span>
              <span className="activity-option-desc">{detail.desc}</span>
            </div>
            {activity === key && <span className="activity-check">✓</span>}
          </button>
        ))}
      </div>

      <div className="activity-details glass-card">
        <h3 className="widget-title">
          <WaterBottleIcon size={20} />
          Hydration Plan
        </h3>
        <div className="hydrate-big">
          <span className="hydrate-amount">{recommendations.hydration.liters}L</span>
          <span className="hydrate-label">recommended today</span>
        </div>
        <div className="hydration-track">
          <div className="hydration-fill" style={{ width: `${Math.min((recommendations.hydration.liters / 4) * 100, 100)}%` }} />
        </div>
        <p className="rec-desc">{recommendations.hydration.description}</p>
      </div>

      <div className="activity-tips glass-card">
        <h3 className="widget-title">
          <ClockIcon size={18} />
          Best Time for Outdoor Activity
        </h3>
        <div className="tip-row">
          <SunIcon size={18} />
          <span><strong>Heat risk:</strong> {heatRisk}</span>
        </div>
        <div className="tip-row">
          <ClockIcon size={18} />
          <span><strong>Best hours:</strong> {bestHours}</span>
        </div>
        {temp >= 32 && (
          <p className="rec-desc" style={{ marginTop: 8 }}>
            Limit strenuous outdoor activities during peak heat. Take frequent breaks in the shade.
          </p>
        )}
      </div>
    </div>
  );
}
