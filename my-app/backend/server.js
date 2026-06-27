const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Auth Store (in-memory) ─────────────────────────────────────────────
const users = [];
const sessions = new Map();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return salt + ':' + derivedKey.toString('hex');
}

function verifyPassword(password, hash) {
  const [salt, key] = hash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }
  const token = header.slice(7);
  const user = sessions.get(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  req.user = user;
  req.token = token;
  next();
}

// ─── Moroccan Cities Database ───────────────────────────────────────
const cities = [
  { name: 'Marrakech', nameAr: 'مراكش', nameFr: 'Marrakech', region: 'Marrakech-Safi', lat: 31.6295, lng: -7.9811 },
  { name: 'Casablanca', nameAr: 'الدار البيضاء', nameFr: 'Casablanca', region: 'Casablanca-Settat', lat: 33.5731, lng: -7.5898 },
  { name: 'Rabat', nameAr: 'الرباط', nameFr: 'Rabat', region: 'Rabat-Salé-Kénitra', lat: 34.0209, lng: -6.8416 },
  { name: 'Fes', nameAr: 'فاس', nameFr: 'Fès', region: 'Fès-Meknès', lat: 34.0181, lng: -5.0078 },
  { name: 'Tangier', nameAr: 'طنجة', nameFr: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma', lat: 35.7673, lng: -5.7998 },
  { name: 'Agadir', nameAr: 'أكادير', nameFr: 'Agadir', region: 'Souss-Massa', lat: 30.4278, lng: -9.5981 },
  { name: 'Meknes', nameAr: 'مكناس', nameFr: 'Meknès', region: 'Fès-Meknès', lat: 33.8935, lng: -5.5473 },
  { name: 'Oujda', nameAr: 'وجدة', nameFr: 'Oujda', region: 'Oriental', lat: 34.6814, lng: -1.9085 },
  { name: 'Kenitra', nameAr: 'القنيطرة', nameFr: 'Kénitra', region: 'Rabat-Salé-Kénitra', lat: 34.2610, lng: -6.5802 },
  { name: 'Tetouan', nameAr: 'تطوان', nameFr: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma', lat: 35.5723, lng: -5.3681 },
  { name: 'Safi', nameAr: 'آسفي', nameFr: 'Safi', region: 'Marrakech-Safi', lat: 32.2992, lng: -9.2372 },
  { name: 'Essaouira', nameAr: 'الصويرة', nameFr: 'Essaouira', region: 'Marrakech-Safi', lat: 31.5085, lng: -9.7595 },
  { name: 'Laayoune', nameAr: 'العيون', nameFr: 'Laâyoune', region: 'Laâyoune-Sakia El Hamra', lat: 27.1253, lng: -13.1625 },
  { name: 'Dakhla', nameAr: 'الداخلة', nameFr: 'Dakhla', region: 'Dakhla-Oued Ed-Dahab', lat: 23.6852, lng: -15.9577 },
  { name: 'Chefchaouen', nameAr: 'شفشاون', nameFr: 'Chefchaouen', region: 'Tanger-Tétouan-Al Hoceïma', lat: 35.1688, lng: -5.2636 },
  { name: 'Ouarzazate', nameAr: 'ورزازات', nameFr: 'Ouarzazate', region: 'Drâa-Tafilalet', lat: 30.9335, lng: -6.9370 },
  { name: 'Ifrane', nameAr: 'إفران', nameFr: 'Ifrane', region: 'Fès-Meknès', lat: 33.5228, lng: -5.1109 },
  { name: 'Beni Mellal', nameAr: 'بني ملال', nameFr: 'Béni Mellal', region: 'Béni Mellal-Khénifra', lat: 32.3360, lng: -6.3608 },
  { name: 'El Jadida', nameAr: 'الجديدة', nameFr: 'El Jadida', region: 'Casablanca-Settat', lat: 33.2546, lng: -8.5079 },
  { name: 'Taza', nameAr: 'تازة', nameFr: 'Taza', region: 'Fès-Meknès', lat: 34.2133, lng: -4.0135 },
  { name: 'Nador', nameAr: 'الناظور', nameFr: 'Nador', region: 'Oriental', lat: 35.1746, lng: -2.9335 },
  { name: 'Settat', nameAr: 'سطات', nameFr: 'Settat', region: 'Casablanca-Settat', lat: 33.0010, lng: -7.6166 },
  { name: 'Khouribga', nameAr: 'خريبكة', nameFr: 'Khouribga', region: 'Béni Mellal-Khénifra', lat: 32.8821, lng: -6.9055 },
];

// ─── Seeded Random (deterministic per city) ─────────────────────────
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const conditions = ['sunny', 'partly-cloudy', 'cloudy', 'windy'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Generate Weather Data ───────────────────────────────────────────
function generateWeather(city) {
  const seed = city.lat * 1000 + city.lng * 100;
  const baseTemp = 28 + (city.lat - 30) * 0.5;
  const coastal = Math.abs(city.lng + 6) < 3 ? -3 : 2;
  const elevation = city.name === 'Ifrane' ? -12 : city.name === 'Ouarzazate' ? 2 : 0;
  const variation = (seededRandom(seed) - 0.5) * 12;
  const temp = Math.round(baseTemp + coastal + elevation + variation);

  const condIdx = Math.floor(seededRandom(seed + 200) * 4);
  const condition = conditions[condIdx];
  const feelsLike = temp + (seededRandom(seed + 100) > 0.6 ? 3 : -1);

  const humidity = Math.round(20 + seededRandom(city.lat) * 40);
  const windSpeed = Math.round(5 + seededRandom(city.lng) * 25);
  const uvIndex = Math.min(Math.round(2 + seededRandom(city.lat * city.lng) * 9), 11);

  const aqi = Math.round(30 + seededRandom(city.lat + 500) * 120);
  let aqiLevel = 'good';
  if (aqi > 150) aqiLevel = 'unhealthy';
  else if (aqi > 100) aqiLevel = 'unhealthy-sensitive';
  else if (aqi > 50) aqiLevel = 'moderate';

  const dust = seededRandom(city.lat + 300);
  const pollen = seededRandom(city.lng + 400);

  const now = new Date();
  const forecast = [];
  for (let i = 0; i < 7; i++) {
    const dSeed = seed + i * 100;
    const dVar = (seededRandom(dSeed) - 0.5) * 12;
    const dTemp = temp + Math.round(dVar);
    const dIdx = Math.floor(seededRandom(dSeed + 200) * 4);
    forecast.push({
      day: dayNames[(now.getDay() + i) % 7],
      tempHigh: dTemp + 2,
      tempLow: dTemp - 4,
      condition: conditions[dIdx],
    });
  }

  return {
    temperature: temp,
    feelsLike,
    condition,
    humidity,
    windSpeed,
    uvIndex,
    airQuality: { aqi, pm25: Math.round(aqi * 0.6), level: aqiLevel },
    dustLevel: dust > 0.7 ? 'high' : dust > 0.4 ? 'moderate' : 'low',
    pollenLevel: pollen > 0.75 ? 'high' : pollen > 0.45 ? 'moderate' : 'low',
    forecast,
  };
}

// ─── Generate Recommendations from Weather ────────────────────────────
function getRecommendations(weather, activity) {
  const { temperature: temp, uvIndex: uv, humidity } = weather;

  // --- Clothing ---
  let clothingItems, clothingDesc;
  if (temp >= 38) {
    clothingItems = ['tshirt', 'pants', 'hat', 'sunglasses'];
    clothingDesc = 'Light cotton clothes, wide hat & UV sunglasses. Avoid dark colors.';
  } else if (temp >= 32) {
    clothingItems = ['tshirt', 'pants', 'hat', 'sunglasses'];
    clothingDesc = 'Light & breathable fabrics. Hat and sunglasses recommended.';
  } else if (temp >= 25) {
    clothingItems = ['tshirt', 'pants', 'sunglasses'];
    clothingDesc = 'Comfortable light clothes. Sunglasses handy.';
  } else if (temp >= 18) {
    clothingItems = ['tshirt', 'pants'];
    clothingDesc = 'Mild weather – light layers work well.';
  } else if (temp >= 12) {
    clothingItems = ['tshirt', 'jacket', 'pants'];
    clothingDesc = 'Light jacket or hoodie recommended.';
  } else {
    clothingItems = ['jacket', 'pants', 'hat'];
    clothingDesc = 'Warm jacket needed – it\'s cool today.';
  }

  // --- Skincare ---
  let spfValue, spfLevel, skincareProducts, skincareDesc;
  if (uv >= 8) {
    spfValue = 50; spfLevel = 'very-high';
    skincareProducts = ['sunscreen', 'moisturizer'];
    skincareDesc = 'Extreme UV! SPF 50+ broad spectrum. Re-apply every 2 hours.';
  } else if (uv >= 6) {
    spfValue = 50; spfLevel = 'high';
    skincareProducts = ['sunscreen', 'moisturizer'];
    skincareDesc = 'High UV. SPF 50 recommended. Don\'t forget your lips!';
  } else if (uv >= 3) {
    spfValue = 30; spfLevel = 'medium';
    skincareProducts = ['sunscreen'];
    skincareDesc = 'Moderate UV. SPF 30 is sufficient.';
  } else {
    spfValue = 15; spfLevel = 'low';
    skincareProducts = ['moisturizer'];
    skincareDesc = 'Low UV. Daily moisturizer with SPF 15 is fine.';
  }
  if (humidity < 20) {
    skincareProducts.push('moisturizer');
    skincareDesc += ' Very dry air – use a hydrating moisturizer.';
  }
  skincareProducts = [...new Set(skincareProducts)];

  // --- Hydration ---
  let base = 1.5;
  if (temp > 38) base += 1.5;
  else if (temp > 32) base += 1.0;
  else if (temp > 28) base += 0.5;
  if (humidity < 20) base += 0.5;

  let extra = 0, actDesc = '';
  if (activity === 'run') { extra = 1.0; actDesc = 'Running increases fluid loss significantly.'; }
  else if (activity === 'work') { extra = 0.75; actDesc = 'Outdoor work requires extra hydration.'; }
  else { extra = 0.25; actDesc = 'Casual walking – stay hydrated.'; }

  const total = Math.round((base + extra) * 10) / 10;

  // --- Allergy ---
  let hasAlert = false, sev = 'low', msg = '', triggers = [];
  if (weather.dustLevel === 'high') {
    hasAlert = true; sev = 'high'; triggers.push('Dust');
    msg = 'High dust levels today. Wear a mask outdoors and keep windows closed.';
  } else if (weather.pollenLevel === 'high') {
    hasAlert = true; sev = 'high'; triggers.push('Pollen');
    msg = 'High pollen count. Limit outdoor time in the morning.';
  } else if (weather.dustLevel === 'moderate' || weather.pollenLevel === 'moderate') {
    hasAlert = true; sev = 'moderate';
    if (weather.dustLevel === 'moderate') triggers.push('Dust');
    if (weather.pollenLevel === 'moderate') triggers.push('Pollen');
    msg = 'Moderate allergy risk. Consider taking precautions if you\'re sensitive.';
  }

  return {
    clothing: { items: clothingItems, description: clothingDesc, icon: 'tshirt' },
    skincare: { spfLevel, spfValue, products: skincareProducts, description: skincareDesc },
    hydration: { liters: total, glasses: Math.ceil(total / 0.25), description: `Drink ${total}L (${Math.ceil(total / 0.25)} glasses) today. ${actDesc}` },
    allergy: { hasAlert, severity: sev, message: msg, triggers },
  };
}

// ─── Auth Routes ─────────────────────────────────────────────────────────

// POST /api/auth/register – create account
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, preferences } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const user = {
    id: users.length + 1,
    name,
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    preferences: Array.isArray(preferences) ? preferences : [],
    createdAt: new Date().toISOString(),
  };
  users.push(user);

  const token = generateToken();
  sessions.set(token, { id: user.id, name: user.name, email: user.email, preferences: user.preferences });

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, preferences: user.preferences },
  });
});

// POST /api/auth/login – sign in
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken();
  sessions.set(token, { id: user.id, name: user.name, email: user.email, preferences: user.preferences });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, preferences: user.preferences },
  });
});

// GET /api/auth/me – current user (requires Bearer token)
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/preferences – update preferences
app.put('/api/auth/preferences', authMiddleware, (req, res) => {
  const { preferences } = req.body;
  if (!Array.isArray(preferences)) {
    return res.status(400).json({ error: 'Preferences must be an array' });
  }
  const user = users.find(u => u.id === req.user.id);
  if (user) user.preferences = preferences;
  req.user.preferences = preferences;
  sessions.set(req.token, req.user);
  res.json({ preferences });
});

// ─── API Routes ───────────────────────────────────────────────────────

// GET /api/message – original hello-world
app.get('/api/message', (req, res) => {
  res.json({ message: 'hello in sever' });
});

// GET /api/cities – list all cities, optional ?search=...
app.get('/api/cities', (req, res) => {
  const { search } = req.query;
  let result = cities;
  if (search) {
    const q = String(search).toLowerCase();
    result = cities.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.nameAr.includes(q) ||
      c.nameFr.toLowerCase().includes(q)
    );
  }
  res.json(result);
});

// GET /api/weather?city=Marrakech
app.get('/api/weather', (req, res) => {
  const cityName = req.query.city;
  if (!cityName) return res.status(400).json({ error: 'City name is required (e.g. ?city=Marrakech)' });

  const city = cities.find(c => c.name.toLowerCase() === String(cityName).toLowerCase());
  if (!city) return res.status(404).json({ error: `City "${cityName}" not found` });

  const weather = generateWeather(city);
  res.json({ city: city.name, ...weather });
});

// GET /api/weather/recommendations?city=Marrakech&activity=walk
app.get('/api/weather/recommendations', (req, res) => {
  const cityName = req.query.city;
  const activity = req.query.activity || 'walk';

  if (!cityName) return res.status(400).json({ error: 'City name is required' });
  if (!['walk', 'run', 'work'].includes(activity)) return res.status(400).json({ error: 'Activity must be walk, run, or work' });

  const city = cities.find(c => c.name.toLowerCase() === String(cityName).toLowerCase());
  if (!city) return res.status(404).json({ error: `City "${cityName}" not found` });

  const weather = generateWeather(city);
  const recommendations = getRecommendations(weather, activity);
  res.json({ city: city.name, weather, recommendations });
});

// ─── Weather Scene Images ────────────────────────────────────────────
const weatherImages = {
  sunny: [
    { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', label: 'Clear skies and golden sunshine' },
    { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', label: 'Bright day with warm sunlight' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', label: 'Perfect beach weather ahead' },
  ],
  'partly-cloudy': [
    { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80', label: 'Clouds drifting across a blue sky' },
    { url: 'https://images.unsplash.com/photo-1534088568595-a33ab4c2f494?w=800&q=80', label: 'Soft cloud cover with breaks of sun' },
  ],
  cloudy: [
    { url: 'https://images.unsplash.com/photo-1530908295418-a12e126966a4?w=800&q=80', label: 'Overcast sky with diffused light' },
    { url: 'https://images.unsplash.com/photo-1499346036226-38c6b92d9b5f?w=800&q=80', label: 'Cloudy day with calm atmosphere' },
  ],
  windy: [
    { url: 'https://images.unsplash.com/photo-1536241397839-b1e34dd9d4b0?w=800&q=80', label: 'Wind sweeping through the landscape' },
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', label: 'Breezy conditions with moving clouds' },
  ],
  default: [
    { url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80', label: 'A calm weather day' },
  ],
};

// GET /api/weather/image?condition=sunny&activity=walk
app.get('/api/weather/image', (req, res) => {
  const { condition, activity } = req.query;
  const images = weatherImages[condition] || weatherImages.default;
  const img = images[Math.floor(Math.random() * images.length)];
  res.json({ ...img, condition: condition || 'unknown', activity: activity || 'walk' });
});

// ─── Health check ─────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error Handler ───────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Seed Demo User ─────────────────────────────────────────────────
(function seedDemoUser() {
  const email = 'demo@aura.com';
  if (users.find(u => u.email === email)) return;
  const user = {
    id: users.length + 1,
    name: 'Demo User',
    email,
    passwordHash: hashPassword('password123'),
    preferences: ['daily', 'allergy'],
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  console.log('🌱 Demo user seeded: demo@aura.com / password123');
})();

// ─── Start ────────────────────────────────────────────────────────────
const server = app.listen(port, () => {
  console.log(`✅ Marrakech WeatherCare API running on http://localhost:${port}`);
});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
    process.exit(1);
  }
  console.error('❌ Server error:', err);
});
