# WeatherCare

A mobile-first AI-powered weather and wellness web application that provides personalized health recommendations based on real-time weather data for Moroccan cities.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com)

## Features

- **Current Weather** — Temperature, feels-like, UV index, humidity, wind speed, air quality (AQI + PM2.5), dust/pollen levels
- **7-Day Forecast** — Day-by-day high/low temperatures with weather condition icons
- **Clothing Recommendations** — What to wear based on temperature bands
- **Skincare Advice** — SPF recommendation based on UV index
- **Hydration Tracking** — Smart water intake in liters/glasses adjusted for temperature, humidity, and activity; circular progress ring with +250ml/+500ml logging
- **Allergy Alerts** — Dust/pollen level warnings with mitigation tips
- **Activity Planning** — Activity suitability ratings (Poor/Moderate/Good/Excellent) for Walking, Running, Cycling, Yoga, Swimming
- **UV Monitor** — Visual gauge with re-apply sunscreen timer
- **City Search** — 23 Moroccan cities with multi-language search (English, Arabic, French)
- **User Authentication** — Register/Login with scrypt password hashing and Bearer token sessions
- **Dark Mode** — Toggle between light and dark themes, respects system preference
- **Multi-language i18n** — English, French, Arabic with full RTL support for Arabic
- **Responsive Design** — Mobile-first with bottom navigation, desktop sidebar for larger screens
- **Accessibility** — Skip-to-content link, ARIA labels, keyboard navigation, screen reader support, reduced-motion support

## Tech Stack

### Frontend
- **React 19** with TypeScript 6
- **Vite 8** for build tooling
- **Tailwind CSS 3** with a custom Material Design 3 color palette (50+ color tokens)
- **Geist** (primary font), **Cairo** (Arabic), **Material Symbols** (icons)

### Backend
- **Node.js** with **Express 5**
- **In-memory auth** with scrypt password hashing
- **Seeded random weather generation** — deterministic weather data based on city coordinates (no external API required)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Backend Setup

```bash
cd my-app/backend
npm install
npm run dev     # Starts on http://localhost:5000 with --watch
```

### Frontend Setup

```bash
cd my-app/frontend/my-app
npm install
npm run dev     # Starts on http://localhost:5173 (Vite dev server)
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

### Build for Production

```bash
cd my-app/frontend/my-app
npm run build      # Outputs to dist/
npm run preview    # Preview the built app
```

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/weather?city=` | GET | Weather data for a city |
| `/api/weather/recommendations?city=&activity=` | GET | Weather data + personalized recommendations |
| `/api/cities?search=` | GET | List/search Moroccan cities |
| `/api/auth/register` | POST | Create an account |
| `/api/auth/login` | POST | Sign in |
| `/api/auth/me` | GET | Current user info (requires Bearer token) |
| `/api/auth/preferences` | PUT | Update notification preferences |
| `/api/health` | GET | Health check |

## Supported Cities

23 Moroccan cities including Marrakech, Casablanca, Rabat, Fes, Tangier, Agadir, Meknes, Oujda, Kenitra, Tetouan, Safi, Essaouira, Laayoune, Dakhla, Chefchaouen, Ouarzazate, Ifrane, Beni Mellal, El Jadida, Taza, Nador, Settat, and Khouribga.

## Languages

- **English** (default)
- **French**
- **Arabic** with full RTL layout support

## Project Structure

```
WeatherCare/
├── my-app/
│   ├── backend/
│   │   ├── server.js          # Express API server
│   │   └── package.json
│   └── frontend/
│       └── my-app/
│           ├── src/
│           │   ├── components/   # React UI components
│           │   ├── data/         # City data, mock generators
│           │   ├── i18n/         # Translations, locale context
│           │   ├── utils/        # Recommendation logic
│           │   ├── App.tsx       # Main app component
│           │   ├── api.ts        # API client
│           │   └── types.ts      # TypeScript definitions
│           ├── index.html
│           ├── tailwind.config.js
│           └── vite.config.ts
├── Agent.md                 # AI agent specification
└── README.md
```

## License

ISC (backend) / private (frontend)
