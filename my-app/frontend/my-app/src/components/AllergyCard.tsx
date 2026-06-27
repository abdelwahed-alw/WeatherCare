import type { AllergyAlert } from '../types';
import { AirIcon } from './Icons';

interface AllergyCardProps {
  alert: AllergyAlert;
}

export default function AllergyCard({ alert }: AllergyCardProps) {
  if (!alert.hasAlert) {
    return (
      <div className="wc-card p-lg animate-in">
        <div className="flex items-center gap-sm mb-sm">
          <AirIcon size={22} className="text-primary" />
          <h3 className="font-headline-md text-headline-md">Allergy & Health</h3>
        </div>
        <p className="text-body-md text-success font-medium">Low allergy risk today. Enjoy your day!</p>
      </div>
    );
  }

  return (
    <div className={`wc-card p-lg animate-in ${alert.severity === 'high' ? 'border-error-container bg-error-container/10' : ''}`}>
      <div className="flex items-center gap-sm mb-sm">
        <AirIcon size={22} className={alert.severity === 'high' ? 'text-error' : 'text-primary'} />
        <h3 className="font-headline-md text-headline-md">Allergy Alert</h3>
        {alert.severity === 'high' && (
          <span className="px-sm py-xs bg-error text-on-error text-label-sm rounded-full font-bold">High Risk</span>
        )}
      </div>
      {alert.triggers.length > 0 && (
        <div className="flex gap-xs mb-sm flex-wrap">
          {alert.triggers.map((t) => (
            <span key={t} className="px-sm py-xs bg-error-container text-on-error-container text-xs font-medium rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}
      <p className="text-body-md text-on-surface-variant">{alert.message}</p>
    </div>
  );
}
