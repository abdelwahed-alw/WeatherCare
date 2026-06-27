import type { WeatherData } from '../types';
import { PsychologyIcon } from './Icons';

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
    <div className="wc-card p-lg animate-in">
      <h3 className="font-headline-md text-headline-md flex items-center gap-sm mb-md">
        <PsychologyIcon className="text-primary" />
        Today's Tips
      </h3>
      <ul className="space-y-sm">
        {tips.slice(0, 4).map((tip, i) => (
          <li key={i} className="flex items-start gap-sm text-body-md text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-sm flex-shrink-0 mt-0.5">water_drop</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
