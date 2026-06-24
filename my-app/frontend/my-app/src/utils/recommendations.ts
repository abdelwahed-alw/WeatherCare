import type { WeatherData, ActivityType, Recommendations } from '../types';

export function getRecommendations(weather: WeatherData, activity: ActivityType): Recommendations {
  const temp = weather.temperature;
  const uv = weather.uvIndex;
  const humidity = weather.humidity;

  let clothingItems: string[];
  let clothingDesc: string;

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

  let spfValue: number;
  let spfLevel: Recommendations['skincare']['spfLevel'];
  let skincareProducts: string[];
  let skincareDesc: string;

  if (uv >= 8) {
    spfValue = 50;
    spfLevel = 'very-high';
    skincareProducts = ['sunscreen', 'moisturizer'];
    skincareDesc = 'Extreme UV! SPF 50+ broad spectrum. Re-apply every 2 hours.';
  } else if (uv >= 6) {
    spfValue = 50;
    spfLevel = 'high';
    skincareProducts = ['sunscreen', 'moisturizer'];
    skincareDesc = 'High UV. SPF 50 recommended. Don\'t forget your lips!';
  } else if (uv >= 3) {
    spfValue = 30;
    spfLevel = 'medium';
    skincareProducts = ['sunscreen'];
    skincareDesc = 'Moderate UV. SPF 30 is sufficient.';
  } else {
    spfValue = 15;
    spfLevel = 'low';
    skincareProducts = ['moisturizer'];
    skincareDesc = 'Low UV. Daily moisturizer with SPF 15 is fine.';
  }

  if (humidity < 20) {
    skincareProducts.push('moisturizer');
    skincareDesc += ' Very dry air – use a hydrating moisturizer.';
  }

  let baseLiters = 1.5;
  if (temp > 38) baseLiters += 1.5;
  else if (temp > 32) baseLiters += 1.0;
  else if (temp > 28) baseLiters += 0.5;

  if (humidity < 20) baseLiters += 0.5;

  let activityExtra: number;
  let activityDesc: string;
  if (activity === 'run') {
    activityExtra = 1.0;
    activityDesc = 'Running increases fluid loss significantly.';
  } else if (activity === 'work') {
    activityExtra = 0.75;
    activityDesc = 'Outdoor work requires extra hydration.';
  } else {
    activityExtra = 0.25;
    activityDesc = 'Casual walking – stay hydrated.';
  }

  const totalLiters = Math.round((baseLiters + activityExtra) * 10) / 10;
  const glasses = Math.ceil(totalLiters / 0.25);

  let allergyHasAlert = false;
  let allergySeverity: Recommendations['allergy']['severity'] = 'low';
  let allergyMessage = '';
  const triggers: string[] = [];

  if (weather.dustLevel === 'high') {
    allergyHasAlert = true;
    allergySeverity = 'high';
    triggers.push('Dust');
    allergyMessage = 'High dust levels today. Wear a mask outdoors and keep windows closed.';
  } else if (weather.pollenLevel === 'high') {
    allergyHasAlert = true;
    allergySeverity = 'high';
    triggers.push('Pollen');
    allergyMessage = 'High pollen count. Limit outdoor time in the morning.';
  } else if (weather.dustLevel === 'moderate' || weather.pollenLevel === 'moderate') {
    allergyHasAlert = true;
    allergySeverity = 'moderate';
    if (weather.dustLevel === 'moderate') triggers.push('Dust');
    if (weather.pollenLevel === 'moderate') triggers.push('Pollen');
    allergyMessage = 'Moderate allergy risk. Consider taking precautions if you\'re sensitive.';
  }

  return {
    clothing: { items: clothingItems, description: clothingDesc, icon: 'tshirt' },
    skincare: {
      spfLevel,
      spfValue,
      products: [...new Set(skincareProducts)],
      description: skincareDesc,
    },
    hydration: {
      liters: totalLiters,
      glasses,
      description: `Drink ${totalLiters}L (${glasses} glasses) today. ${activityDesc}`,
    },
    allergy: {
      hasAlert: allergyHasAlert,
      severity: allergySeverity,
      message: allergyMessage,
      triggers,
    },
  };
}
