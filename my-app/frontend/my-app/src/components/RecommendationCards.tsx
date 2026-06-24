import { useRef, useState, useEffect } from 'react';
import type { ActivityType, Recommendations } from '../types';
import { getClothingIcon, SunscreenIcon, MoisturizerIcon, WaterBottleIcon } from './Icons';

interface RecommendationCardsProps {
  recommendations: Recommendations;
  activity: ActivityType;
  onActivityChange: (a: ActivityType) => void;
}

export default function RecommendationCards({ recommendations, activity, onActivityChange }: RecommendationCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { clothing, skincare, hydration } = recommendations;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActiveSlide(idx);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (idx: number) => {
    scrollRef.current?.children[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveSlide(idx);
  };

  const cards = [
    {
      id: 'clothing',
      title: 'What to Wear',
      content: (
        <div className="rec-card-content">
          <div className="rec-clothing-icons">
            {clothing.items.map((item) => (
              <div key={item} className="clothing-icon-wrap">
                {getClothingIcon(item, 28)}
              </div>
            ))}
          </div>
          <p className="rec-desc">{clothing.description}</p>
        </div>
      ),
    },
    {
      id: 'skincare',
      title: 'Skin Protection',
      content: (
        <div className="rec-card-content">
          <div className="rec-skincare-icons">
            {skincare.products.map((p) => (
              <div key={p} className="skincare-icon-wrap">
                {p === 'sunscreen' ? <SunscreenIcon size={28} /> : <MoisturizerIcon size={28} />}
                <span>{p === 'sunscreen' ? `SPF ${skincare.spfValue}` : 'Moisturizer'}</span>
              </div>
            ))}
          </div>
          <div className="protection-bar">
            <div className="protection-label">
              <span>Protection</span>
              <span className="protection-level">{skincare.spfLevel === 'very-high' ? 'Very High' : skincare.spfLevel.charAt(0).toUpperCase() + skincare.spfLevel.slice(1)}</span>
            </div>
            <div className="protection-track">
              <div
                key={skincare.spfValue}
                className="protection-fill"
                style={{
                  width: `${skincare.spfValue <= 15 ? 25 : skincare.spfValue <= 30 ? 50 : skincare.spfValue <= 50 ? 75 : 100}%`,
                }}
              />
            </div>
          </div>
          <p className="rec-desc">{skincare.description}</p>
        </div>
      ),
    },
    {
      id: 'hydration',
      title: 'Water Intake',
      content: (
        <div className="rec-card-content">
          <div className="hydration-main">
            <WaterBottleIcon size={36} />
            <span className="hydration-amount">{hydration.liters}L</span>
            <span className="hydration-glasses">{hydration.glasses} glasses</span>
          </div>
          <div className="hydration-track">
            <div
              key={hydration.liters}
              className="hydration-fill"
              style={{ width: `${Math.min((hydration.liters / 4) * 100, 100)}%` }}
            />
          </div>
          <div className="activity-selector">
            <span className="selector-label">Activity:</span>
            <div className="selector-btns">
              {(['work', 'run', 'walk'] as ActivityType[]).map((a) => (
                <button
                  key={a}
                  className={`selector-btn ${activity === a ? 'active' : ''}`}
                  onClick={() => onActivityChange(a)}
                >
                  {a === 'work' ? 'Work' : a === 'run' ? 'Run' : 'Walk'}
                </button>
              ))}
            </div>
          </div>
          <p className="rec-desc">{hydration.description}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="recommendations-section animate-in animate-in-delay-2">
      <div className="rec-carousel" ref={scrollRef}>
        {cards.map((card, i) => (
          <div key={card.id} className={`rec-card glass-card animate-in animate-in-delay-${i + 1}`}>
            <h3 className="rec-card-title">{card.title}</h3>
            {card.content}
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {cards.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${activeSlide === idx ? 'active' : ''}`}
            onClick={() => scrollTo(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
