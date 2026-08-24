import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-3.5 animate-pulse" id="dashboard-skeleton-loader">
      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-6 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-2.5 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 2 Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-[210px] w-full bg-slate-100 dark:bg-slate-800/60 rounded-lg flex items-center justify-center">
              <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table Skeleton */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-6 w-44 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="h-8 w-full bg-slate-100 dark:bg-slate-800/50 rounded flex items-center px-3 justify-between">
              <div className="h-3 w-8 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-2.5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
