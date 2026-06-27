/* ------------------------------------------------------------------ */
/* Mock UI Data — Extracted from all hardcoded strings across pages    */
/* Purpose: single source of truth for static text; swap with API     */
/* ------------------------------------------------------------------ */

export const homePage = {
  hero: {
    liveLabel: 'LIVE',
    feelsLikePrefix: 'Feels like',
    aqi: 'AQI',
    humidity: 'Humidity',
    wind: 'Wind',
  },
  whatToWear: {
    title: 'What to Wear',
    lightLayers: 'Light Layers',
    eyeProtection: 'Eye Protection',
    seeFullSuggestions: 'See Full Suggestions',
    uvHighText: 'UV levels are high. Grab your favorite polarized shades.',
    uvModerateText: 'UV levels are moderate. Sunglasses recommended.',
  },
  forecast: {
    title: '7-Day Forecast',
    fullDetails: 'Full Details',
    tomorrow: 'Tomorrow',
  },
  dailyInsight: {
    title: 'Daily Insight',
    outdoorScore: 'Outdoor Score',
    hydrationNeed: 'Hydration Need',
    quoteExtreme: '"The heat reminds us to slow down and listen to our bodies."',
    quoteWarm: '"Clear skies reflect a clear mind. Take 5 minutes to breathe today."',
    quoteCool: '"Cool breezes bring fresh energy. Perfect for a mindful walk."',
  },
  weatherVisual: {
    outdoorLabel: 'Outdoor Yoga: Recommended (2PM)',
    indoorLabel: 'Indoor Activities: Recommended',
  },
  planYourActivity: {
    title: 'Plan Your Activity',
  },
  activityCards: [
    { label: 'Walking', badge: 'EXCELLENT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { label: 'Running', badge: 'EXCELLENT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { label: 'Cycling', badge: 'GREAT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { label: 'Yoga', badge: 'EXCELLENT', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
    { label: 'Swimming', badge: 'GOOD', badgeClass: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  ],
};

export const activitiesPage = {
  todayFocus: {
    title: "Today's Focus",
    extremeHeat: 'Take it easy — extreme heat today. Stay hydrated.',
    warm: 'Warm conditions. Plan around peak sun hours.',
    optimal: 'Optimal conditions for performance and clarity.',
    cool: 'Cool and fresh. Perfect for an active day.',
  },
  bestTime: {
    optimalWindow: 'OPTIMAL WINDOW',
    morningClarity: 'Morning Clarity',
    description: 'The best time for your run is between 7:00 AM and 9:30 AM. Air quality is peak and UV index is moderate.',
  },
  hydrationPlan: {
    title: 'Hydration Plan',
    goal: 'Goal',
    goalReached: 'Goal reached! Stay hydrated!',
    glassesToTarget: 'glasses to reach your target.',
    wellDone: 'Well done!',
    keepItUp: 'Keep it up!',
    start: 'Start',
    history: 'History',
  },
  startActivity: {
    title: 'Start Activity',
    viewAll: 'View All',
  },
  activities: [
    { id: 'walk', label: 'Walking', icon: 'directions_walk', subtitle: '35 min session' },
    { id: 'run', label: 'Running', icon: 'directions_run', subtitle: '5.2 km target' },
    { id: 'work', label: 'Cycling', icon: 'directions_bike', subtitle: '12 km trail' },
    { id: 'yoga', label: 'Yoga', icon: 'self_improvement', subtitle: 'Mindful flow' },
    { id: 'swim', label: 'Swimming', icon: 'pool', subtitle: '20 laps goal' },
  ],
  insights: {
    airQuality: 'Air Quality',
    excellent: 'Excellent',
    moderate: 'Moderate',
    uvWarning: 'UV Warning',
    uvLevel: 'UV Level',
    highPollen: 'High pollen or dust levels detected today. Consider wearing a mask.',
    lowPollen: 'Low pollen levels detected today. Perfect for deep breathing exercises.',
    uvExtreme: 'UV is extreme. Avoid prolonged exposure between 10 AM and 4 PM.',
    uvHigh: 'UV peaks at midday. Apply SPF 30+ if staying outdoors for more than 15 mins.',
    uvLow: 'UV levels are comfortable. No special precautions needed.',
  },
};

export const healthPage = {
  header: {
    title: 'Health & Protection',
    subtitle: 'Your personalized environmental wellness guide for today.',
  },
  uvIndex: {
    title: 'UV Index',
    extremeRisk: 'EXTREME RISK',
    highRisk: 'HIGH RISK',
    peak: 'Peak',
    avoidSun: 'Avoid sun exposure between 10 AM and 4 PM.',
    limitSun: 'Limit sun exposure during midday hours.',
    comfortable: 'UV levels are comfortable today.',
    seekShade: 'Seek shade and wear a wide-brimmed hat.',
    wearSpf: 'Wear SPF 30+ and protective clothing.',
    noPrecautions: 'No special precautions needed.',
  },
  spfCard: {
    label: 'SPF Recommended',
    setTimer: 'Set Re-apply Timer',
    timerSet: 'Timer Set (2h)',
  },
  hydrationStatus: {
    title: 'Hydration Status',
    goal: 'Goal',
    reached: 'Reached',
  },
  allergyAlert: {
    title: 'Allergy Alert',
    riskLevel: 'Risk Level',
    highRisk: 'High Risk',
    moderateRisk: 'Moderate Risk',
    lowRisk: 'Low Risk',
    grassPollen: 'Grass Pollen',
    treePollen: 'Tree Pollen',
    dustMold: 'Dust & Mold',
  },
  wellnessRoutine: {
    title: 'Wellness Routine',
    subtitle: 'Based on your activity and current conditions.',
    eyeProtection: 'Eye Protection',
    wearSunglasses: 'Wear polarized sunglasses to reduce high-reflectance glare today.',
    sunglassesOptional: 'UV levels are mild. Sunglasses optional.',
    airQuality: 'Air Quality',
    aqiExcellent: 'Excellent',
    breathingExercise: 'Great time for light outdoor breathing exercises.',
    limitOutdoor: 'Limit strenuous outdoor activities.',
    notAvailable: 'Air quality data not available.',
  },
};

export const profilePage = {
  wellnessScore: 'Wellness Score',
  premiumMember: 'Premium Member',
  preferences: {
    title: 'Preferences',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch between light and dark themes',
    defaultCity: 'Default City',
    defaultCityDesc: 'Your primary location for forecasts',
    language: 'Language',
    languageDesc: 'Preferred interface language',
  },
  notifications: {
    title: 'Notifications',
    dailyAlerts: 'Daily alerts',
    dailyAlertsDesc: 'Morning summary and wellness tips.',
    heatWave: 'Heat wave',
    heatWaveDesc: 'Urgent alerts for extreme temperature rises.',
    allergy: 'Allergy',
    allergyDesc: 'High pollen or air quality warnings.',
  },
  account: {
    clearCache: 'Clear Data Cache',
    signOut: 'Sign Out',
    cacheCleared: 'Data cache cleared successfully.',
    signingOut: 'Signing out...',
  },
};

export const common = {
  appName: 'WeatherCare',
  profileEdit: 'Edit profile picture',
  fullDetails: 'Full Details',
  settings: 'Settings',
  footerTagline: 'Stay safe under the sun',
  languageEnglish: 'English (US)',
};
