import type { WeatherData } from '../types';
import { SunIcon, DropletIcon } from './Icons';

interface TipsWidgetProps {
  weather: WeatherData;
}

export default function TipsWidget({ weather }: TipsWidgetProps) {
  const tips: string[] = [];
  const { temperature, uvIndex, humidity } = weather;

  if (temperature >= 38) {
    tips.push('Avoid outdoor activities between 12pm and 4pm.');
    tips.push('Wear light-colored, loose-fitting clothing.');
  } else if (temperature >= 32) {
    tips.push('Stay in the shade during peak sun hours.');
    tips.push('Keep a water bottle with you at all times.');
  }

  if (uvIndex >= 8) {
    tips.push('Apply SPF 50+ sunscreen every 2 hours.');
  } else if (uvIndex >= 6) {
    tips.push('Wear UV-protective sunglasses and a hat.');
  }

  if (humidity < 20) {
    tips.push('Use a hydrating mist and drink extra water.');
  }

  if (tips.length === 0) {
    tips.push('Enjoy the pleasant weather today!');
    tips.push('Stay hydrated and protect your skin.');
  }

  return (
    <div className="tips-widget glass-card animate-in animate-in-delay-4">
      <h3 className="widget-title">
        <SunIcon size={18} />
        Today's Tips
      </h3>
      <ul className="tips-list">
        {tips.slice(0, 4).map((tip, i) => (
          <li key={i} className="tip-item">
            <DropletIcon size={14} />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
