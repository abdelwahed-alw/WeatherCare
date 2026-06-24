import type { City } from '../types';

export const moroccanCities: City[] = [
  { name: 'Marrakech', nameAr: 'مراكش', nameFr: 'Marrakech', region: 'Marrakech-Safi', latitude: 31.6295, longitude: -7.9811 },
  { name: 'Casablanca', nameAr: 'الدار البيضاء', nameFr: 'Casablanca', region: 'Casablanca-Settat', latitude: 33.5731, longitude: -7.5898 },
  { name: 'Rabat', nameAr: 'الرباط', nameFr: 'Rabat', region: 'Rabat-Salé-Kénitra', latitude: 34.0209, longitude: -6.8416 },
  { name: 'Fes', nameAr: 'فاس', nameFr: 'Fès', region: 'Fès-Meknès', latitude: 34.0181, longitude: -5.0078 },
  { name: 'Tangier', nameAr: 'طنجة', nameFr: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.7673, longitude: -5.7998 },
  { name: 'Agadir', nameAr: 'أكادير', nameFr: 'Agadir', region: 'Souss-Massa', latitude: 30.4278, longitude: -9.5981 },
  { name: 'Meknes', nameAr: 'مكناس', nameFr: 'Meknès', region: 'Fès-Meknès', latitude: 33.8935, longitude: -5.5473 },
  { name: 'Oujda', nameAr: 'وجدة', nameFr: 'Oujda', region: 'Oriental', latitude: 34.6814, longitude: -1.9085 },
  { name: 'Kenitra', nameAr: 'القنيطرة', nameFr: 'Kénitra', region: 'Rabat-Salé-Kénitra', latitude: 34.2610, longitude: -6.5802 },
  { name: 'Tetouan', nameAr: 'تطوان', nameFr: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.5723, longitude: -5.3681 },
  { name: 'Safi', nameAr: 'آسفي', nameFr: 'Safi', region: 'Marrakech-Safi', latitude: 32.2992, longitude: -9.2372 },
  { name: 'Essaouira', nameAr: 'الصويرة', nameFr: 'Essaouira', region: 'Marrakech-Safi', latitude: 31.5085, longitude: -9.7595 },
  { name: 'Laayoune', nameAr: 'العيون', nameFr: 'Laâyoune', region: 'Laâyoune-Sakia El Hamra', latitude: 27.1253, longitude: -13.1625 },
  { name: 'Dakhla', nameAr: 'الداخلة', nameFr: 'Dakhla', region: 'Dakhla-Oued Ed-Dahab', latitude: 23.6852, longitude: -15.9577 },
  { name: 'Chefchaouen', nameAr: 'شفشاون', nameFr: 'Chefchaouen', region: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.1688, longitude: -5.2636 },
  { name: 'Ouarzazate', nameAr: 'ورزازات', nameFr: 'Ouarzazate', region: 'Drâa-Tafilalet', latitude: 30.9335, longitude: -6.9370 },
  { name: 'Ifrane', nameAr: 'إفران', nameFr: 'Ifrane', region: 'Fès-Meknès', latitude: 33.5228, longitude: -5.1109 },
  { name: 'Beni Mellal', nameAr: 'بني ملال', nameFr: 'Béni Mellal', region: 'Béni Mellal-Khénifra', latitude: 32.3360, longitude: -6.3608 },
  { name: 'El Jadida', nameAr: 'الجديدة', nameFr: 'El Jadida', region: 'Casablanca-Settat', latitude: 33.2546, longitude: -8.5079 },
  { name: 'Taza', nameAr: 'تازة', nameFr: 'Taza', region: 'Fès-Meknès', latitude: 34.2133, longitude: -4.0135 },
  { name: 'Nador', nameAr: 'الناظور', nameFr: 'Nador', region: 'Oriental', latitude: 35.1746, longitude: -2.9335 },
  { name: 'Settat', nameAr: 'سطات', nameFr: 'Settat', region: 'Casablanca-Settat', latitude: 33.0010, longitude: -7.6166 },
  { name: 'Khouribga', nameAr: 'خريبكة', nameFr: 'Khouribga', region: 'Béni Mellal-Khénifra', latitude: 32.8821, longitude: -6.9055 },
];

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return moroccanCities.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.nameAr.includes(q) ||
    c.nameFr.toLowerCase().includes(q)
  ).slice(0, 6);
}

export function getCityByName(name: string): City | undefined {
  return moroccanCities.find(c => c.name.toLowerCase() === name.toLowerCase());
}
