/* eslint-disable react-refresh/only-export-components */

interface IconProps {
  size?: number;
  className?: string;
}

export function MaterialIcon({ icon, size = 24, className = '' }: { icon: string; size?: number; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, width: size, height: size, lineHeight: '1' }}
    >
      {icon}
    </span>
  );
}

export function SunIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="light_mode" size={size} className={className} />;
}

export function CloudIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="cloud" size={size} className={className} />;
}

export function PartlyCloudyIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="partly_cloudy_day" size={size} className={className} />;
}

export function WindIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="air" size={size} className={className} />;
}

export function DropletIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="water_drop" size={size} className={className} />;
}

export function UVIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="uv" size={size} className={className} />;
}

export function TShirtIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="checkroom" size={size} className={className} />;
}

export function JacketIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="checkroom" size={size} className={className} />;
}

export function PantsIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="checkroom" size={size} className={className} />;
}

export function ShoeIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="footwear" size={size} className={className} />;
}

export function HatIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="sunglasses" size={size} className={className} />;
}

export function SunglassesIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="eyeglasses" size={size} className={className} />;
}

export function SunscreenIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="sunscreen" size={size} className={className} />;
}

export function MoisturizerIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="moisture" size={size} className={className} />;
}

export function WaterBottleIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="water_bottle" size={size} className={className} />;
}

export function WaterDropIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="water_drop" size={size} className={className} />;
}

export function MaskIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="mask" size={size} className={className} />;
}

export function SettingsIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="settings" size={size} className={className} />;
}

export function SearchIcon({ size = 20, className }: IconProps) {
  return <MaterialIcon icon="search" size={size} className={className} />;
}

export function HomeIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="home" size={size} className={className} />;
}

export function ActivityIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="fitness_center" size={size} className={className} />;
}

export function HeartIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="favorite" size={size} className={className} />;
}

export function ProfileIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="person" size={size} className={className} />;
}

export function LocationIcon({ size = 20, className }: IconProps) {
  return <MaterialIcon icon="location_on" size={size} className={className} />;
}

export function ClockIcon({ size = 16, className }: IconProps) {
  return <MaterialIcon icon="schedule" size={size} className={className} />;
}

export function WalkIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="directions_walk" size={size} className={className} />;
}

export function PoolIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="pool" size={size} className={className} />;
}

export function RunIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="directions_run" size={size} className={className} />;
}

export function ConstructionIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="construction" size={size} className={className} />;
}

export function ThermostatIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="thermostat" size={size} className={className} />;
}

export function ScheduleIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="schedule" size={size} className={className} />;
}

export function AirIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="air" size={size} className={className} />;
}

export function HumidityIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="humidity" size={size} className={className} />;
}

export function CheckCircleIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="check_circle" size={size} className={className} />;
}

export function PsychologyIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="psychology" size={size} className={className} />;
}

export function CalendarIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="calendar_month" size={size} className={className} />;
}

export function AddCircleIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="add_circle" size={size} className={className} />;
}

export function CheckroomIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="checkroom" size={size} className={className} />;
}

export function ApparelIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="apparel" size={size} className={className} />;
}

export function SelfImprovementIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="self_improvement" size={size} className={className} />;
}

export function HikingIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="hiking" size={size} className={className} />;
}

export function PedalBikeIcon({ size = 24, className }: IconProps) {
  return <MaterialIcon icon="pedal_bike" size={size} className={className} />;
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
