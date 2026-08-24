import React, { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number; // duration in ms
  isCurrency?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1000,
  isCurrency = false,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrame: number;
    const startValue = 0;
    const endValue = Number(end) || 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease-out cubic curve: 1 - pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = startValue + (endValue - startValue) * easeOut;
      setCurrent(val);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCurrent(endValue);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  const formattedValue = isCurrency
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(current)
    : new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(current);

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
