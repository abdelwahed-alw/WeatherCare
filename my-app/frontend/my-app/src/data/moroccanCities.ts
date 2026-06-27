import type { City } from '../types';

export const moroccanCities: City[] = [
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
