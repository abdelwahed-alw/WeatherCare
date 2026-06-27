import type { WeatherData, City, Recommendations, ActivityType, RegisterPayload, LoginPayload, AuthResponse, AuthUser } from './types';

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

// ─── Auth API ────────────────────────────────────────────────────────────

async function authFetch<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  return authFetch<AuthResponse>(`${BASE}/auth/register`, payload);
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return authFetch<AuthResponse>(`${BASE}/auth/login`, payload);
}

export async function fetchMe(token: string): Promise<{ user: AuthUser }> {
  const res = await fetch(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Session expired');
  return res.json();
}

export interface WeatherSceneImage {
  url: string;
  condition: string;
  activity: string;
  label: string;
}

export async function fetchWeatherImage(condition: string, activity: string): Promise<WeatherSceneImage> {
  return fetchJSON<WeatherSceneImage>(
    `${BASE}/weather/image?condition=${encodeURIComponent(condition)}&activity=${encodeURIComponent(activity)}`
  );
}

export async function updatePreferences(token: string, preferences: string[]): Promise<{ preferences: string[] }> {
  const res = await fetch(`${BASE}/auth/preferences`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ preferences }),
  });
  if (!res.ok) throw new Error('Failed to update preferences');
  return res.json();
}
