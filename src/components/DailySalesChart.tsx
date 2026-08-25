import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine
} from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Sparkles, Filter } from 'lucide-react';
import { DailySaleItem } from '../types';
import { formatDate, formatINR, formatNumber } from '../utils/formatters';

interface DailySalesChartProps {
  data: DailySaleItem[];
  isDarkMode?: boolean;
  selectedDate?: string;
  onDateChange?: (newDate: string) => void;
}

export const DailySalesChart: React.FC<DailySalesChartProps> = ({
  data,
  isDarkMode = false,
  selectedDate,
  onDateChange
}) => {
  const [rangeFilter, setRangeFilter] = useState<'all' | '14d' | '7d'>('all');

  // Filtered data based on selection
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (rangeFilter === '7d') {
      return data.slice(-7);
    }
    if (rangeFilter === '14d') {
      return data.slice(-14);
    }
    return data;
  }, [data, rangeFilter]);

  // Formatted data for chart consumption
  const chartData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      formattedDate: formatDate(item.date),
      fullDateStr: formatDate(item.date, true),
      revenue: item.revenue || (item.sales * 853),
      isSelected: item.date === selectedDate
    }));
  }, [filteredData, selectedDate]);

  const selectedItem = useMemo(() => {
    return chartData.find((item) => item.date === selectedDate);
  }, [chartData, selectedDate]);

  // Find Peak (Highest) and Trough (Lowest) sales days
  const { peakDay, troughDay, avgSales, totalSalesInRange } = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return { peakDay: null, troughDay: null, avgSales: 0, totalSalesInRange: 0 };
    }

    let peak = chartData[0];
    let trough = chartData[0];
    let sum = 0;

    chartData.forEach((item) => {
      sum += item.sales;
      if (item.sales > peak.sales) peak = item;
      if (item.sales < trough.sales) trough = item;
    });

    const avg = sum / chartData.length;

    return {
      peakDay: peak,
      troughDay: trough,
      avgSales: Math.round(avg * 10) / 10,
      totalSalesInRange: sum
    };
  }, [chartData]);

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const isPeak = peakDay && item.date === peakDay.date;
      const isTrough = troughDay && item.date === troughDay.date;
      const isCurrentActive = item.date === selectedDate;

      return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md text-xs min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              {item.fullDateStr}
            </span>
            <div className="flex items-center gap-1">
              {isCurrentActive && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
                  Active
                </span>
              )}
              {isPeak && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  Peak
                </span>
              )}
              {isTrough && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                  Lowest
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">SIM Cards Sold:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm font-mono">
                {formatNumber(item.sales)} units
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Est. Revenue:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 font-mono">
                {formatINR(item.revenue, false)}
              </span>
            </div>
          </div>

          {onDateChange && !isCurrentActive && (
            <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium text-center">
              Click to view this day's report
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleChartClick = (chartState: any) => {
    if (onDateChange && chartState && chartState.activePayload && chartState.activePayload.length) {
      const clickedDate = chartState.activePayload[0].payload.date;
      if (clickedDate) {
        onDateChange(clickedDate);
      }
    }
  };

  return (
    <div
      id="daily-sales-trend-container"
      className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between"
    >
      {/* Header with Title and Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Daily Sales Trend
          </h3>
          {peakDay && (
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/50 dark:border-blue-900/50">
              Peak: {peakDay.sales}
            </span>
          )}
        </div>

        {/* Range Selector Pill */}
        <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto text-xs">
          <button
            id="filter-daily-all"
            onClick={() => setRangeFilter('all')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
              rangeFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Month
          </button>
          <button
            id="filter-daily-14d"
            onClick={() => setRangeFilter('14d')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
              rangeFilter === '14d'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            14D
          </button>
          <button
            id="filter-daily-7d"
            onClick={() => setRangeFilter('7d')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
              rangeFilter === '7d'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            7D
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-3 gap-2 mb-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <Sparkles className="h-2.5 w-2.5 text-blue-500" />
            <span>Avg Sales</span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-white font-mono">
            {avgSales} <span className="text-[10px] font-normal text-slate-400">/day</span>
          </p>
        </div>

        {peakDay && (
          <div className="space-y-0.5 border-l border-slate-200 dark:border-slate-700 pl-2">
            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-2.5 w-2.5" />
              <span>Highest</span>
            </div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono truncate">
              {peakDay.sales} <span className="text-[10px] font-normal text-slate-400">({peakDay.formattedDate})</span>
            </p>
          </div>
        )}

        {troughDay && (
          <div className="space-y-0.5 border-l border-slate-200 dark:border-slate-700 pl-2">
            <div className="flex items-center gap-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
              <ArrowDownRight className="h-2.5 w-2.5" />
              <span>Lowest</span>
            </div>
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono truncate">
              {troughDay.sales} <span className="text-[10px] font-normal text-slate-400">({troughDay.formattedDate})</span>
            </p>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
            data={chartData}
            margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
            onClick={handleChartClick}
            className={onDateChange ? 'cursor-pointer' : ''}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDarkMode ? '#334155' : '#e2e8f0'}
              opacity={0.7}
            />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
              interval={rangeFilter === 'all' ? 3 : 0}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
              domain={[0, (dataMax: number) => Math.ceil((dataMax + 8) / 5) * 5]}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Average sales reference line */}
            <ReferenceLine
              y={avgSales}
              stroke={isDarkMode ? '#64748b' : '#94a3b8'}
              strokeDasharray="4 4"
              strokeWidth={1}
            />

            {/* Active Selected Day Reference Dot */}
            {selectedItem && (
              <ReferenceDot
                x={selectedItem.formattedDate}
                y={selectedItem.sales}
                r={7}
                fill="#4f46e5"
                stroke="#ffffff"
                strokeWidth={3}
              />
            )}

            {/* Highest Day Reference Dot */}
            {peakDay && peakDay.date !== selectedDate && (
              <ReferenceDot
                x={peakDay.formattedDate}
                y={peakDay.sales}
                r={5}
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth={2}
              />
            )}

            {/* Lowest Day Reference Dot */}
            {troughDay && troughDay.date !== selectedDate && (
              <ReferenceDot
                x={troughDay.formattedDate}
                y={troughDay.sales}
                r={5}
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth={2}
              />
            )}

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#salesGradient)"
              activeDot={{
                r: 6,
                fill: '#4f46e5',
                stroke: isDarkMode ? '#0f172a' : '#ffffff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Footnote */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-900" />
            <span className="font-medium text-indigo-700 dark:text-indigo-300">Selected Day</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Peak Day</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>Lowest Day</span>
          </span>
        </div>
        <span className="font-mono text-slate-600 dark:text-slate-300 font-medium">
          Total in range: {formatNumber(totalSalesInRange)} SIMs
        </span>
      </div>
    </div>
  );
};
