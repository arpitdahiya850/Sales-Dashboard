import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { Award, IndianRupee } from 'lucide-react';
import { StaffPerformance } from '../types';
import { formatINR, sanitizeStaffName, formatNumber } from '../utils/formatters';

interface LeaderboardMiniChartProps {
  data: StaffPerformance[];
  isDarkMode?: boolean;
}

export const LeaderboardMiniChart: React.FC<LeaderboardMiniChartProps> = ({ data, isDarkMode = false }) => {
  // Sort top 6-8 by monthly revenue for clean horizontal bar visualization
  const chartData = React.useMemo(() => {
    return [...data]
      .sort((a, b) => b.monthly_revenue - a.monthly_revenue)
      .slice(0, 7)
      .map((item, index) => ({
        name: sanitizeStaffName(item.staff_name),
        revenue: item.monthly_revenue,
        sales: item.monthly_sales,
        rank: index + 1
      }))
      .reverse(); // Reverse so highest appears on top of vertical list
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3 shadow-lg backdrop-blur-md text-xs min-w-[170px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <span>#{item.rank} {item.name}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Monthly Revenue:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                {formatINR(item.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total SIMs Sold:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 font-mono">
                {formatNumber(item.sales)} units
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (rank: number) => {
    if (rank === 1) return '#f59e0b'; // Amber Gold
    if (rank === 2) return '#94a3b8'; // Slate Silver
    if (rank === 3) return '#d97706'; // Warm Bronze
    return isDarkMode ? '#3b82f6' : '#60a5fa'; // Blue
  };

  return (
    <div
      id="leaderboard-mini-chart"
      className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Revenue by Staff (Top Performers)
        </h3>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
          Ranked by Gross ₹
        </span>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 4, right: 24, left: 10, bottom: 4 }}
          >
            <XAxis
              type="number"
              hide
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDarkMode ? '#cbd5e1' : '#475569', fontWeight: 500 }}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              radius={[0, 4, 4, 0]}
              barSize={12}
            >
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={getBarColor(entry.rank)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>#1</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>#2</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
            <span>#3</span>
          </span>
        </div>
        <span>Top 7 Staff</span>
      </div>
    </div>
  );
};
