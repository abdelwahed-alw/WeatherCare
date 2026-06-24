import type { WeatherData, Condition, City } from '../types';

const conditions: Condition[] = ['sunny', 'partly-cloudy', 'cloudy', 'windy'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function getDailyTemp(city: City, dayOffset: number): { temp: number; feelsLike: number; condition: Condition } {
  const seed = city.latitude * 1000 + city.longitude * 100 + dayOffset;
  const baseTemp = 28 + (city.latitude - 30) * 0.5;
  const coastalEffect = Math.abs(city.longitude + 6) < 3 ? -3 : 2;
  const elevationEffect = city.name === 'Ifrane' ? -12 : city.name === 'Ouarzazate' ? 2 : 0;
  const variation = (seededRandom(seed) - 0.5) * 12;
  const temp = Math.round(baseTemp + coastalEffect + elevationEffect + variation);
  const feelsLike = temp + (seededRandom(seed + 100) > 0.6 ? 3 : -1);
  const condIdx = Math.floor(seededRandom(seed + 200) * 4);
  return { temp, feelsLike, condition: conditions[condIdx] };
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function fetchWeatherData(city: City): WeatherData {
  const today = getDailyTemp(city, 0);
  const forecast: WeatherData['forecast'] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = getDailyTemp(city, i);
    forecast.push({
      day: dayNames[(now.getDay() + i) % 7],
      tempHigh: d.temp + 2,
      tempLow: d.temp - 4,
      condition: d.condition,
    });
  }

  const humidity = Math.round(20 + seededRandom(city.latitude) * 40);
  const windSpeed = Math.round(5 + seededRandom(city.longitude) * 25);
  const uvIndex = Math.round(2 + seededRandom(city.latitude * city.longitude) * 9);

  const aqiBase = 30 + seededRandom(city.latitude + 500) * 120;
  const aqi = Math.round(aqiBase);

  let level: WeatherData['airQuality']['level'] = 'good';
  if (aqi > 150) level = 'unhealthy';
  else if (aqi > 100) level = 'unhealthy-sensitive';
  else if (aqi > 50) level = 'moderate';

  const dustRand = seededRandom(city.latitude + 300);
  const dustLevel = dustRand > 0.7 ? 'high' : dustRand > 0.4 ? 'moderate' : 'low';
  const pollenRand = seededRandom(city.longitude + 400);
  const pollenLevel = pollenRand > 0.75 ? 'high' : pollenRand > 0.45 ? 'moderate' : 'low';

  return {
    temperature: today.temp,
    feelsLike: today.feelsLike,
    condition: today.condition,
    humidity,
    windSpeed,
    uvIndex: Math.min(uvIndex, 11),
    airQuality: { aqi, pm25: Math.round(aqi * 0.6), level },
    forecast,
    dustLevel,
    pollenLevel,
  };
}

export function fetchWeatherWithDelay(city: City, delay = 800): Promise<WeatherData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fetchWeatherData(city)), delay);
  });
}
