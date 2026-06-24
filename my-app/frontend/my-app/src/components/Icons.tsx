/* eslint-disable react-refresh/only-export-components */

interface IconProps {
  size?: number;
  className?: string;
}

export function SunIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function CloudIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.5 19a4.5 4.5 0 1 0-3.5-7.9A6 6 0 1 0 6 19h11.5z" />
    </svg>
  );
}

export function PartlyCloudyIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="5" />
      <path d="M17.5 19a4.5 4.5 0 1 0-3.5-7.9A6 6 0 1 0 6 19h11.5z" />
    </svg>
  );
}

export function WindIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

export function DropletIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

export function UVIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m-10-10h2m16 0h2" />
      <path d="M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41" />
      <path d="M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">UV</text>
    </svg>
  );
}

export function TShirtIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 4h4c0 1.1.9 2 2 2s2-.9 2-2h4l3 5-4 3-1-1v7H8v-7l-1 1-4-3 3-5z" />
    </svg>
  );
}

export function HatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c-4.97 0-9 2.46-9 5.5S7.03 14 12 14s9-2.46 9-5.5S16.97 3 12 3z" />
      <path d="M3 8.5V12c0 2.76 4.03 5 9 5s9-2.24 9-5V8.5" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
    </svg>
  );
}

export function SunglassesIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12c0-2.5 2-5 4-5s4 2 4 4-2 3-4 3-4-1-4-2z" />
      <path d="M14 12c0-2.5 2-5 4-5s4 2 4 4-2 3-4 3-4-1-4-2z" />
      <path d="M6 7l1 3" />
      <path d="M18 7l-1 3" />
    </svg>
  );
}

export function SunscreenIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="2" width="8" height="20" rx="2" />
      <line x1="10" y1="6" x2="14" y2="6" />
      <line x1="10" y1="10" x2="14" y2="10" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

export function MoisturizerIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c-2 4-5 7-5 10a5 5 0 0 0 10 0c0-3-3-6-5-10z" />
      <path d="M10 12h4" />
      <path d="M12 10v4" />
    </svg>
  );
}

export function WaterBottleIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2h4" />
      <path d="M10 2v3h4V2" />
      <rect x="8" y="5" width="8" height="17" rx="2" />
      <line x1="12" y1="8" x2="12" y2="10" />
      <line x1="12" y1="13" x2="12" y2="15" />
      <line x1="12" y1="18" x2="12" y2="20" />
    </svg>
  );
}

export function MaskIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10c0-2 1.5-4 3-4h12c1.5 0 3 2 3 4v4c0 2-1.5 4-3 4H6c-1.5 0-3-2-3-4v-4z" />
      <path d="M8 10h8" />
      <path d="M8 14h6" />
    </svg>
  );
}

export function SettingsIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function SearchIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function HomeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function ActivityIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export function HeartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ProfileIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LocationIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function JacketIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 4h3c0 1 1.5 2 3 2s3-1 3-2h3l2 4-3 2v10H7V10L4 8l2-4z" />
      <line x1="12" y1="6" x2="12" y2="16" />
    </svg>
  );
}

export function PantsIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12l-1 18h-4v-8h-2v8H7L6 3z" />
    </svg>
  );
}

export function ShoeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 16c2-1 5-2 9-2s7 1 9 2" />
      <path d="M3 18c2-1 5-2 9-2s7 1 9 2" />
      <path d="M3 14c2-1 5-2 9-2s7 1 9 2" />
      <path d="M3 12c2-1 5-2 9-2s7 1 9 2" />
    </svg>
  );
}

export function getWeatherIcon(condition: string, size = 32, className?: string) {
  switch (condition) {
    case 'sunny': return <SunIcon size={size} className={className} />;
    case 'partly-cloudy': return <PartlyCloudyIcon size={size} className={className} />;
    case 'cloudy': return <CloudIcon size={size} className={className} />;
    case 'windy': return <WindIcon size={size} className={className} />;
    default: return <SunIcon size={size} className={className} />;
  }
}

export function getClothingIcon(item: string, size = 20, className?: string) {
  switch (item) {
    case 'tshirt': return <TShirtIcon size={size} className={className} />;
    case 'jacket': return <JacketIcon size={size} className={className} />;
    case 'pants': return <PantsIcon size={size} className={className} />;
    case 'hat': return <HatIcon size={size} className={className} />;
    case 'sunglasses': return <SunglassesIcon size={size} className={className} />;
    case 'shoes': return <ShoeIcon size={size} className={className} />;
    default: return <TShirtIcon size={size} className={className} />;
  }
}
