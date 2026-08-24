import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Zap, Layers } from 'lucide-react';
import { MonthlySaleItem } from '../types';
import { formatINR, formatNumber } from '../utils/formatters';

interface MonthlySalesChartProps {
  data: MonthlySaleItem[];
  isDarkMode?: boolean;
}

export const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data, isDarkMode = false }) => {
  // Sort data ascending by month_no and calculate growth
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const sorted = [...data].sort((a, b) => a.month_no - b.month_no);

    return sorted.map((item, index) => {
      let growth = item.growth_rate;
      if (growth === undefined) {
        if (index === 0) {
          growth = 0;
        } else {
          const prev = sorted[index - 1].sales;
          growth = prev > 0 ? Math.round(((item.sales - prev) / prev) * 1000) / 10 : 0;
        }
      }
      return {
        ...item,
        calculatedGrowth: growth,
        revenue: item.revenue || (item.sales * 795)
      };
    });
  }, [data]);

  // Key monthly stats
  const { totalYTD, currentMonth, averageMonthlySales } = useMemo(() => {
    if (!sortedData || sortedData.length === 0) {
      return { totalYTD: 0, currentMonth: null, averageMonthlySales: 0 };
    }
    const sum = sortedData.reduce((acc, curr) => acc + curr.sales, 0);
    const avg = Math.round(sum / sortedData.length);
    const curr = sortedData[sortedData.length - 1];

    return {
      totalYTD: sum,
      currentMonth: curr,
      averageMonthlySales: avg
    };
  }, [sortedData]);

  // Custom Bar Label showing % Growth
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const item = sortedData[index];
    if (!item) return null;

    const isFirst = index === 0;
    const growth = item.calculatedGrowth;
    const growthText = isFirst ? 'Base' : `${growth > 0 ? '+' : ''}${growth}%`;

    return (
      <g>
        {/* Sales count label */}
        <text
          x={x + width / 2}
          y={y - 8}
          fill={isDarkMode ? '#e2e8f0' : '#1e293b'}
          textAnchor="middle"
          fontSize={11}
          fontWeight="600"
          fontFamily="monospace"
        >
          {value}
        </text>
        {/* Growth pill badge */}
        {!isFirst && (
          <g>
            <rect
              x={x + width / 2 - 20}
              y={y - 28}
              width={40}
              height={16}
              rx={4}
              fill={isDarkMode ? '#064e3b' : '#dcfce7'}
              stroke={isDarkMode ? '#059669' : '#86efac'}
              strokeWidth={1}
            />
            <text
              x={x + width / 2}
              y={y - 16}
              fill={isDarkMode ? '#34d399' : '#166534'}
              textAnchor="middle"
              fontSize={9.5}
              fontWeight="700"
            >
              {growthText}
            </text>
          </g>
        )}
      </g>
    );
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md text-xs min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              {item.month} (Month {item.month_no})
            </span>
            {item.calculatedGrowth !== 0 && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  item.calculatedGrowth > 0
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                }`}
              >
                {item.calculatedGrowth > 0 ? '+' : ''}{item.calculatedGrowth}% MoM
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Monthly Activations:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm font-mono">
                {formatNumber(item.sales)} SIMs
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Total Revenue:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 font-mono">
                {formatINR(item.revenue, false)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="monthly-sales-trend-container"
      className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Monthly Volume & Trajectory
          </h3>
        </div>

        {/* Current Month Badge */}
        {currentMonth && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 self-start sm:self-auto">
            <Zap className="h-3 w-3 text-indigo-500" />
            <span>Latest: {currentMonth.month} ({formatNumber(currentMonth.sales)})</span>
          </div>
        )}
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5">
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            YTD Volume
          </span>
          <p className="text-xs font-bold text-slate-800 dark:text-white font-mono">
            {formatNumber(totalYTD)} <span className="text-[10px] font-normal text-slate-400">SIMs</span>
          </p>
        </div>

        <div className="space-y-0.5 border-l border-slate-200 dark:border-slate-700 pl-2">
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Monthly Average
          </span>
          <p className="text-xs font-bold text-slate-800 dark:text-white font-mono">
            {formatNumber(averageMonthlySales)} <span className="text-[10px] font-normal text-slate-400">/mo</span>
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={sortedData}
            margin={{ top: 22, right: 8, left: -22, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDarkMode ? '#334155' : '#e2e8f0'}
              opacity={0.7}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
              domain={[0, (dataMax: number) => Math.ceil((dataMax + 100) / 100) * 100]}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="sales"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              label={renderCustomBarLabel}
            >
              {sortedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === sortedData.length - 1 ? '#6366f1' : isDarkMode ? '#4338ca' : '#818cf8'}
                />
              ))}
            </Bar>

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: '#f59e0b',
                stroke: isDarkMode ? '#0f172a' : '#ffffff',
                strokeWidth: 2
              }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Footnote */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-indigo-500" />
            <span>Monthly SIM Orders</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Growth Trajectory Line</span>
          </span>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Consistent upward velocity (+16.0% this month)
        </span>
      </div>
    </div>
  );
};
