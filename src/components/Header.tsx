import React from 'react';
import {
  Radio,
  Calendar,
  RotateCw,
  Sun,
  Moon,
  Signal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDate } from '../utils/formatters';

interface HeaderProps {
  reportDate: string;
  onDateChange: (newDate: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  lastUpdated?: string;
}

export const Header: React.FC<HeaderProps> = ({
  reportDate,
  onDateChange,
  onRefresh,
  isRefreshing,
  isDarkMode,
  onToggleDarkMode
}) => {
  const formattedTodayBadge = formatDate(reportDate, true);

  const handleStepDay = (delta: number) => {
    const [y, m, d] = reportDate.split('-').map(Number);
    const currentDate = new Date(y, m - 1, d);
    currentDate.setDate(currentDate.getDate() + delta);
    const nextY = currentDate.getFullYear();
    const nextM = String(currentDate.getMonth() + 1).padStart(2, '0');
    const nextD = String(currentDate.getDate()).padStart(2, '0');
    onDateChange(`${nextY}-${nextM}-${nextD}`);
  };

  const handlePresetClick = (dateStr: string) => {
    onDateChange(dateStr);
  };

  return (
    <header
      id="dashboard-header"
      className="bg-white dark:bg-slate-900 p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        
        {/* Title & Date Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                SIM Sales Dashboard
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                <Signal className="h-2.5 w-2.5 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active Performance for <strong className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2">{formattedTodayBadge}</strong>
            </p>
          </div>
        </div>

        {/* Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start md:self-auto">
          
          {/* Quick Date Presets */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 sm:p-1 border border-slate-200/60 dark:border-slate-700/60">
            <button
              id="preset-today"
              onClick={() => handlePresetClick('2026-05-24')}
              title="May 24, 2026 (Live sample day)"
              className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                reportDate === '2026-05-24'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs border border-slate-200/80 dark:border-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Today
            </button>
            <button
              id="preset-peak"
              onClick={() => handlePresetClick('2026-05-18')}
              title="May 18, 2026 (Peak day: 48 SIMs, ₹38.4k)"
              className={`px-2.5 sm:px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
                reportDate === '2026-05-18'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-xs border border-slate-200/80 dark:border-slate-600 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Peak Day
            </button>
            <button
              id="preset-trough"
              onClick={() => handlePresetClick('2026-05-07')}
              title="May 7, 2026 (Trough day: 11 SIMs, ₹8.9k)"
              className={`px-2.5 sm:px-3 py-1 text-xs rounded-md transition-all cursor-pointer ${
                reportDate === '2026-05-07'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs border border-slate-200/80 dark:border-slate-600 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Trough Day
            </button>
            <button
              id="preset-mid"
              onClick={() => handlePresetClick('2026-05-15')}
              title="May 15, 2026 (36 SIMs, ₹28.8k)"
              className={`hidden lg:inline-block px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer ${
                reportDate === '2026-05-15'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs border border-slate-200/80 dark:border-slate-600 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Mid Month
            </button>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

          {/* Date Picker Input with Prev / Next Steppers */}
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-2xs">
            <button
              id="date-prev-btn"
              onClick={() => handleStepDay(-1)}
              className="p-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Previous Day"
              aria-label="Previous Day"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              <label htmlFor="report-date-picker" className="sr-only">Select Report Date</label>
              <input
                id="report-date-picker"
                type="date"
                value={reportDate}
                onChange={(e) => {
                  if (e.target.value) {
                    onDateChange(e.target.value);
                  }
                }}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                title="Select Report Date"
              />
            </div>

            <button
              id="date-next-btn"
              onClick={() => handleStepDay(1)}
              className="p-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Next Day"
              aria-label="Next Day"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* High Density Theme Refresh Button (Indigo) */}
          <button
            id="refresh-dashboard-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            title="Refresh dashboard data"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-slate-600" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

