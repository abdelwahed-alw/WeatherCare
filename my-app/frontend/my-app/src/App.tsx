import { useState, useEffect, useReducer } from 'react';
import type { WeatherData, ActivityType, TabType, Recommendations, City } from './types';
import { moroccanCities } from './data/moroccanCities';
import { fetchWeather, fetchRecommendations } from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DesktopSidebar from './components/DesktopSidebar';
import HomeView from './components/HomeView';
import ActivitiesView from './components/ActivitiesView';
import HealthView from './components/HealthView';
import ProfileView from './components/ProfileView';
import './App.css';

interface FetchState {
  loading: boolean;
  error: string | null;
  weather: WeatherData | null;
  recommendations: Recommendations | null;
}

type FetchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; weather: WeatherData; recommendations: Recommendations }
  | { type: 'FETCH_ERROR'; error: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, weather: action.weather, recommendations: action.recommendations, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function App() {
  const [city, setCity] = useState<City>(moroccanCities[0]);
  const [activity, setActivity] = useState<ActivityType>('walk');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [retryCount, setRetryCount] = useState(0);
  const [fetchState, dispatch] = useReducer(fetchReducer, {
    loading: true,
    error: null,
    weather: null,
    recommendations: null,
  });
  const userName = 'Ahmed';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    Promise.all([
      fetchWeather(city.name),
      fetchRecommendations(city.name, activity),
    ]).then(([weatherData, recData]) => {
      dispatch({ type: 'FETCH_SUCCESS', weather: weatherData, recommendations: recData.recommendations });
    }).catch((err) => {
      dispatch({ type: 'FETCH_ERROR', error: err instanceof Error ? err.message : 'Unable to load weather data. Please try again.' });
    });
  }, [city, activity, retryCount]);

  const handleCityChange = (newCity: City) => {
    setCity(newCity);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActivityChange = (a: ActivityType) => {
    setActivity(a);
  };

  const handleRetry = () => {
    setRetryCount(n => n + 1);
  };

  return (
    <div className="app">
      <DesktopSidebar
        active={activeTab}
        onTabChange={setActiveTab}
        city={city}
        onCityChange={handleCityChange}
        userName={userName}
      />

      <main className="main-content">
        <Header
          city={city}
          onCityChange={handleCityChange}
        />

        {fetchState.error && (
          <div className="error-state animate-in">
            <div className="error-icon">!</div>
            <p className="error-text">{fetchState.error}</p>
            <button className="btn-primary" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}

        {fetchState.loading && !fetchState.error && (
          <div className="loading-state">
            <div className="skeleton skeleton-weather" />
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-card" />
          </div>
        )}

        {!fetchState.loading && !fetchState.error && fetchState.weather && fetchState.recommendations && (
          <>
            {activeTab === 'home' && (
              <HomeView
                weather={fetchState.weather}
                recommendations={fetchState.recommendations}
                cityName={city.name}
              />
            )}

            {activeTab === 'activities' && (
              <ActivitiesView
                weather={fetchState.weather}
                recommendations={fetchState.recommendations}
                activity={activity}
                onActivityChange={handleActivityChange}
              />
            )}

            {activeTab === 'health' && (
              <HealthView
                weather={fetchState.weather}
                recommendations={fetchState.recommendations}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                userName={userName}
                isDark={isDark}
                onToggleDark={() => setIsDark(!isDark)}
              />
            )}
          </>
        )}

        <div className="bottom-spacer" />
      </main>

      <BottomNav active={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
