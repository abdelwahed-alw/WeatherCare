WeatherCare Agent
Overview
WeatherCare is an AI-powered assistant that turns raw weather data into practical, health-focused recommendations for users in Marrakech and any other city in Morocco. It focuses on what to wear, how to protect the skin, how much water to drink, and how to adapt if the user has allergies.
Goals
Help users make safe, comfortable daily decisions based on real-time and forecast weather.
Translate complex metrics (UV index, humidity, wind speed, air quality) into simple actions.
Support mobile-first usage while remaining fully functional on desktop.
Prioritize Marrakech as the default city while allowing users to select any Moroccan city.
Core Capabilities
Fetch current and forecast weather data for a given location:
Default: Marrakech.
Any user-selected city in Morocco via a city search or location selector.
Interpret key metrics:
Temperature, humidity, wind speed.
UV index and, when available, air-quality/pollen indicators.
Generate personalized recommendations:
Clothing layers and fabric type (light cotton, jacket, hat, sunglasses, etc.).
Skincare suggestions (sunscreen SPF level, moisturizer, lip balm).
Hydration guidance (approximate liters of water per day, adjusted for activity level).
Allergy alerts and mitigation tips when dust/pollen is high.
Inputs
Location:
City name or coordinates.
If no location is provided, default to Marrakech.
The system should support all major Moroccan cities (e.g., Casablanca, Rabat, Fes, Tangier, Agadir, Oujda, etc.).
Time context: Now, today, or a specific date/time window.
User profile (optional but recommended):
Gender (for tailoring wording or product categories only, not for limiting features).
Activity type (work outdoors, running, casual walking, indoor work).
Skin profile (sensitive/normal, burns easily/rarely).
Allergy profile (dust, pollen, other).
Outputs
The agent returns a structured JSON response that can be rendered by the web UI:
{
  "location": "Marrakech",
  "datetime": "2026-06-24T09:30:00Z",
  "weather": {
    "temperature": 38,
    "humidity": 15,
    "wind_speed": 12,
    "uv_index": 9,
    "air_quality_level": "high-dust"
  },
  "recommendations": {
    "clothing": {
      "summary": "Light, breathable cotton clothes with a hat and sunglasses.",
      "items": ["light t-shirt", "loose pants or shorts", "wide-brim hat", "UV-protection sunglasses"]
    },
    "skincare": {
      "summary": "Use high SPF sunscreen and a light moisturizer.",
      "spf_level": "50+",
      "products": ["broad-spectrum sunscreen", "hydrating face cream", "lip balm"]
    },
    "hydration": {
      "summary": "Aim for 2.5–3 liters of water today, more if running or working outdoors.",
      "liters": 2.8
    },
    "allergy": {
      "risk_level": "high",
      "summary": "Dust levels are high. Consider wearing a mask and avoid outdoor activity at midday.",
      "actions": ["wear protective mask", "keep windows closed during peak dust hours"]
    }
  }
}
Note: The location field should reflect the actual selected city (e.g., "Casablanca", "Agadir") when the user chooses a different Moroccan city. The structure stays the same.
Decision Logic (High Level)
Clothing: Map temperature + wind + humidity into comfort bands (e.g., cool, warm, hot, extreme heat) and choose layers accordingly.
Skincare: Map UV index into SPF ranges (e.g., low, medium, high, very high) and suggest product types.
Hydration: Start from a base daily intake and increase it according to temperature and selected activity type.
Allergy: If dust/pollen indicators exceed defined thresholds, raise risk level and add practical mitigation tips.
Location Handling
On initial load, the agent assumes Marrakech as the default city.
If the front-end provides a location value (city or coordinates), the agent:
Uses this location for all weather queries.
Returns the city name in the location field of the JSON.
The front-end can offer a city search box or a list of Moroccan cities; the agent remains agnostic and simply consumes the selected location.
Integration in the Web App
The agent is exposed via a REST API endpoint (e.g., POST /api/recommendations) implemented in Node.js.
The front-end (mobile-first) sends:
Selected location (default: Marrakech).
Time context.
User profile (activity, skin, allergy).
The agent returns JSON recommendations that the UI renders as animated cards and widgets, with icons and micro-interactions tailored to mobile and desktop.
Example User Flow
User opens the web app on their phone.
By default, the app selects Marrakech and fetches weather + recommendations.
The user can open a location selector and choose any other Moroccan city (e.g., Rabat).
Front-end calls the agent endpoint with the new location and user profile.
Agent returns a JSON payload with updated clothing, skincare, hydration, and allergy advice for that city.
The UI displays this information in clear, visually appealing cards with icons and subtle animations.
Non-Goals
The agent does not prescribe medical treatment or replace a doctor.
It does not make long-term climate predictions; it focuses on short-term, practical guidance.
Future Extensions
Support multi-country usage while still providing a Morocco-first experience.
Add historical trends (e.g., typical temperatures in each season, per city).
Include push notifications or reminders for hydration and sunscreen re-application.