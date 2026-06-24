import type { AllergyAlert } from '../types';
import { MaskIcon } from './Icons';

interface AllergyCardProps {
  alert: AllergyAlert;
}

export default function AllergyCard({ alert }: AllergyCardProps) {
  if (!alert.hasAlert) {
    return (
      <div className="allergy-card glass-card animate-in animate-in-delay-3">
        <div className="allergy-header">
          <MaskIcon size={22} />
          <h3>Allergy & Health</h3>
        </div>
        <p className="allergy-safe">Low allergy risk today. Enjoy your day!</p>
      </div>
    );
  }

  return (
    <div className={`allergy-card glass-card animate-in animate-in-delay-3 ${alert.severity === 'high' ? 'alert-high' : 'alert-moderate'}`}>
      <div className="allergy-header">
        <MaskIcon size={22} />
        <h3>Allergy Alert</h3>
        {alert.severity === 'high' && <span className="allergy-badge">High Risk</span>}
      </div>
      <div className="allergy-triggers">
        {alert.triggers.map((t) => (
          <span key={t} className="trigger-tag">{t}</span>
        ))}
      </div>
      <p className="allergy-message">{alert.message}</p>
    </div>
  );
}
