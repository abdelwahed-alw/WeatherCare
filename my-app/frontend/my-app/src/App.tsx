import { useState, useEffect, useReducer } from 'react';
import type { WeatherData, ActivityType, TabType, Recommendations, City, AuthUser } from './types';
import { moroccanCities } from './data/moroccanCities';
import { fetchWeather, fetchRecommendations, login, register, fetchMe } from './api';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DesktopSidebar from './components/DesktopSidebar';
import HomeView from './components/HomeView';
import ActivitiesView from './components/ActivitiesView';
import HealthView from './components/HealthView';
import ProfileView from './components/ProfileView';
import LoginView from './components/LoginView';
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
      return { ...state, loading: true, error: null, weather: state.weather, recommendations: state.recommendations };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, weather: action.weather, recommendations: action.recommendations, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [city, setCity] = useState<City>(() => {
    const saved = localStorage.getItem('selected_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return moroccanCities[0];
  });
  const [activity, setActivity] = useState<ActivityType>('walk');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [authError, setAuthError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [fetchState, dispatch] = useReducer(fetchReducer, {
    loading: true,
    error: null,
    weather: null,
    recommendations: null,
  });

  useEffect(() => {
    if (token) {
      fetchMe(token)
        .then(({ user: u }) => {
          setUser(u);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          setToken(null);
        })
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0b1c30' : '#004ac6');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch({ type: 'FETCH_START' });
    Promise.all([
      fetchWeather(city.name),
      fetchRecommendations(city.name, activity),
    ]).then(([weatherData, recData]) => {
      dispatch({ type: 'FETCH_SUCCESS', weather: weatherData, recommendations: recData.recommendations });
    }).catch((err) => {
      dispatch({ type: 'FETCH_ERROR', error: err instanceof Error ? err.message : 'Unable to load weather data. Please try again.' });
    });
  }, [city, activity, retryCount, isLoggedIn]);

  const handleCityChange = (newCity: City) => {
    setCity(newCity);
    localStorage.setItem('selected_city', JSON.stringify(newCity));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActivityChange = (a: ActivityType) => {
    setActivity(a);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await login({ email, password });
      localStorage.setItem('auth_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setIsLoggedIn(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const res = await register({ name, email, password, preferences: [] });
      localStorage.setItem('auth_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setIsLoggedIn(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleRetry = () => {
    setRetryCount(n => n + 1);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#051424]">
        <div className="flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-primary dark:text-secondary text-5xl animate-pulse">wb_sunny</span>
          <p className="font-body-md text-on-surface-variant dark:text-on-surface-variant">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} onRegister={handleRegister} error={authError} onClearError={() => setAuthError('')} />;
  }

  const userName = user?.name || 'User';

  return (
    <div className="app">
      <DesktopSidebar
        active={activeTab}
        onTabChange={setActiveTab}
        city={city}
        onCityChange={handleCityChange}
        userName={userName}
      />

      <main className="main-content" id="main-content">
        <Header
          city={city}
          onCityChange={handleCityChange}
          userName={userName}
          onProfileClick={() => setActiveTab('profile')}
        />

        {fetchState.error && (
          <div className="error-state animate-in" role="alert">
            <div className="error-icon" aria-hidden="true">!</div>
            <p className="error-text">{fetchState.error}</p>
            <button className="btn-primary" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}

        {fetchState.loading && !fetchState.weather && !fetchState.error && (
          <div className="loading-state" aria-live="polite" role="status">
            <span className="sr-only">Loading weather data...</span>
            <div className="skeleton skeleton-weather" aria-hidden="true" />
            <div className="skeleton skeleton-card" aria-hidden="true" />
            <div className="skeleton skeleton-card" aria-hidden="true" />
            <div className="skeleton skeleton-card" aria-hidden="true" />
          </div>
        )}

        {!fetchState.error && fetchState.weather && fetchState.recommendations && (
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
                onLogout={handleLogout}
                city={city}
                onCityChange={handleCityChange}
                token={token}
                user={user}
              />
            )}
          </>
        )}

      </main>

      <BottomNav active={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
