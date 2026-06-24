import type { WeatherData, City, Recommendations, ActivityType } from './types';

const BASE = '/api';

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchCities(search?: string): Promise<City[]> {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  return fetchJSON<City[]>(`${BASE}/cities${params}`);
}

interface WeatherResponse {
  city: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  airQuality: { aqi: number; pm25: number; level: string };
  dustLevel: string;
  pollenLevel: string;
  forecast: { day: string; tempHigh: number; tempLow: number; condition: string }[];
}

export async function fetchWeather(cityName: string): Promise<WeatherData> {
  const data = await fetchJSON<WeatherResponse>(`${BASE}/weather?city=${encodeURIComponent(cityName)}`);
  return data as unknown as WeatherData;
}

interface RecommendationsResponse {
  city: string;
  weather: WeatherData;
  recommendations: Recommendations;
}

export async function fetchRecommendations(cityName: string, activity: ActivityType): Promise<RecommendationsResponse> {
  return fetchJSON<RecommendationsResponse>(
    `${BASE}/weather/recommendations?city=${encodeURIComponent(cityName)}&activity=${activity}`
  );
}
