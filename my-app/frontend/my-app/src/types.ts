export type Condition = 'sunny' | 'partly-cloudy' | 'cloudy' | 'windy' | 'clear-night';

export type ActivityType = 'walk' | 'run' | 'work';

export type TabType = 'home' | 'activities' | 'health' | 'profile';

export interface ForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: Condition;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: Condition;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  airQuality: {
    aqi: number;
    pm25: number;
    level: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy';
  };
  forecast: ForecastDay[];
  dustLevel?: 'low' | 'moderate' | 'high';
  pollenLevel?: 'low' | 'moderate' | 'high';
}

export interface City {
  name: string;
  nameAr: string;
  nameFr: string;
  region: string;
  lat: number;
  lng: number;
}

export interface ClothingRecommendation {
  items: string[];
  description: string;
  icon: 'tshirt' | 'jacket' | 'pants' | 'hat' | 'sunglasses';
}

export interface SkincareRecommendation {
  spfLevel: 'low' | 'medium' | 'high' | 'very-high';
  spfValue: number;
  products: string[];
  description: string;
}

export interface HydrationRecommendation {
  liters: number;
  glasses: number;
  description: string;
}

export interface AllergyAlert {
  hasAlert: boolean;
  severity: 'low' | 'moderate' | 'high';
  message: string;
  triggers: string[];
}

export interface Recommendations {
  clothing: ClothingRecommendation;
  skincare: SkincareRecommendation;
  hydration: HydrationRecommendation;
  allergy: AllergyAlert;
}

// ─── Auth Types ─────────────────────────────────────────────────────────
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  preferences?: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  preferences: string[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export type AuthView = 'login' | 'register-step1' | 'register-step2';
