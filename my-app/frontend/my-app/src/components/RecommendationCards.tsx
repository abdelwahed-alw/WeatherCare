import { useRef, useState, useEffect } from 'react';
import type { ActivityType, Recommendations } from '../types';
import { CheckroomIcon, SunscreenIcon, WaterBottleIcon } from './Icons';

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
      icon: CheckroomIcon,
      content: (
        <div className="space-y-md">
          <p className="text-body-md text-on-surface-variant">{clothing.description}</p>
          <div className="flex gap-sm flex-wrap">
            {clothing.items.map((item) => (
              <div key={item} className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">checkroom</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'skincare',
      title: 'Skin Protection',
      icon: SunscreenIcon,
      content: (
        <div className="space-y-md">
          <div className="flex gap-sm flex-wrap">
            {skincare.products.map((p) => (
              <div key={p} className="flex flex-col items-center gap-xs p-md bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary">
                  {p === 'sunscreen' ? 'sunscreen' : 'moisture'}
                </span>
                <span className="text-label-sm text-on-surface-variant">
                  {p === 'sunscreen' ? `SPF ${skincare.spfValue}` : 'Moisturizer'}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-sm text-on-surface-variant mb-xs">
              <span>Protection</span>
              <span className="font-semibold text-primary">
                {skincare.spfLevel === 'very-high' ? 'Very High' : skincare.spfLevel.charAt(0).toUpperCase() + skincare.spfLevel.slice(1)}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500"
                style={{
                  width: `${skincare.spfValue <= 15 ? 25 : skincare.spfValue <= 30 ? 50 : skincare.spfValue <= 50 ? 75 : 100}%`,
                }}
              />
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">{skincare.description}</p>
        </div>
      ),
    },
    {
      id: 'hydration',
      title: 'Water Intake',
      icon: WaterBottleIcon,
      content: (
        <div className="space-y-md">
          <div className="flex items-center gap-md">
            <WaterBottleIcon size={36} className="text-primary" />
            <span className="text-[36px] font-bold text-primary">{hydration.liters}L</span>
            <span className="text-body-md text-outline">{hydration.glasses} glasses</span>
          </div>
          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-container to-primary transition-all duration-500"
              style={{ width: `${Math.min((hydration.liters / 4) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-sm">
            <span className="text-label-sm text-outline">Activity:</span>
            <div className="flex gap-xs">
              {(['work', 'run', 'walk'] as ActivityType[]).map((a) => (
                <button
                  key={a}
                  className={`px-md py-xs rounded-full text-label-sm transition-all ${
                    activity === a
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                  }`}
                  onClick={() => onActivityChange(a)}
                >
                  {a === 'work' ? 'Work' : a === 'run' ? 'Run' : 'Walk'}
                </button>
              ))}
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">{hydration.description}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-in">
      <div className="flex gap-lg overflow-x-auto snap-x snap-mandatory pb-sm" ref={scrollRef} style={{ scrollbarWidth: 'none' }}>
        {cards.map((card) => (
          <div key={card.id} className="flex-[0_0_100%] snap-start aura-card p-lg">
            <h3 className="font-headline-md text-headline-md flex items-center gap-sm mb-md">
              <card.icon className="text-primary" />
              {card.title}
            </h3>
            {card.content}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-sm mt-md">
        {cards.map((_c, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === idx ? 'w-6 bg-primary' : 'bg-outline-variant'
            }`}
            onClick={() => scrollTo(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
