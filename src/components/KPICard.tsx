import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CountUp } from './CountUp';

export interface KPICardProps {
  id: string;
  title: string;
  value: number;
  isCurrency?: boolean;
  decimals?: number;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'positive' | 'neutral' | 'accent';
  icon: LucideIcon;
  colorScheme: 'blue' | 'green' | 'purple' | 'orange';
}

const colorStyles = {
  blue: {
    borderLeft: 'border-l-blue-500 dark:border-l-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    badge: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500'
  },
  green: {
    borderLeft: 'border-l-emerald-500 dark:border-l-emerald-500',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    badge: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500'
  },
  purple: {
    borderLeft: 'border-l-purple-500 dark:border-l-purple-500',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    badge: 'text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500'
  },
  orange: {
    borderLeft: 'border-l-amber-500 dark:border-l-amber-500',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    badge: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-amber-500'
  }
};

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  isCurrency = false,
  decimals = 0,
  subtitle,
  badgeText,
  icon: Icon,
  colorScheme
}) => {
  const styles = colorStyles[colorScheme];

  return (
    <div
      id={id}
      className={`bg-white dark:bg-slate-900 p-4 rounded-xl border-l-4 ${styles.borderLeft} shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-150 hover:shadow-md flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-start mb-1.5">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <span className={`${styles.iconBg} p-1.5 rounded-lg inline-flex items-center justify-center shrink-0`}>
            <Icon className="w-4 h-4" />
          </span>
        </div>

        <div className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white font-mono">
          <CountUp
            end={value}
            isCurrency={isCurrency}
            decimals={decimals}
          />
        </div>
      </div>

      {(badgeText || subtitle) && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px]">
          {badgeText && (
            <span className={`font-medium ${styles.badge}`}>
              {badgeText}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 dark:text-slate-500 truncate ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

