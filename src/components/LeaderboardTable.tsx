import React, { useState, useMemo } from 'react';
import {
  Search,
  Trophy,
  Medal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  User,
  Zap,
  TrendingUp,
  Sparkles,
  X,
  IndianRupee
} from 'lucide-react';
import { StaffPerformance, SortField, SortDirection, SortConfig } from '../types';
import { formatINR, formatNumber, sanitizeStaffName } from '../utils/formatters';

interface LeaderboardTableProps {
  data: StaffPerformance[];
  isDarkMode?: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, isDarkMode = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'monthly_sales',
    direction: 'desc'
  });

  // Calculate highest monthly sales among all staff to base 100% relative progress bar
  const maxMonthlySales = useMemo(() => {
    if (!data || data.length === 0) return 1;
    return Math.max(...data.map((s) => s.monthly_sales || 0), 1);
  }, [data]);

  // Handle column header clicks for sorting
  const handleSort = (field: SortField) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return {
        field,
        direction: field === 'staff_name' ? 'asc' : 'desc'
      };
    });
  };

  // Process data: clean names, filter by search query, and sort
  const processedData = useMemo(() => {
    if (!data) return [];

    // Map items with sanitized staff name and initial rank based on default monthly_sales
    const mapped = data.map((item, originalIndex) => {
      const cleanName = sanitizeStaffName(item.staff_name);
      return {
        ...item,
        cleanName,
        originalRank: originalIndex + 1,
        // Guarantee numbers are safe
        today_sales: item.today_sales ?? 0,
        today_revenue: item.today_revenue ?? 0,
        monthly_sales: item.monthly_sales ?? 0,
        monthly_revenue: item.monthly_revenue ?? 0,
      };
    });

    // Filter by search query (case-insensitive)
    const filtered = mapped.filter((item) =>
      item.cleanName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    // Apply sorting
    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.field === 'staff_name') {
        comparison = a.cleanName.localeCompare(b.cleanName);
      } else if (sortConfig.field === 'rank') {
        comparison = a.originalRank - b.originalRank;
      } else {
        const valA = a[sortConfig.field] || 0;
        const valB = b[sortConfig.field] || 0;
        comparison = valA - valB;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, searchQuery, sortConfig]);

  // Helper to render sort arrow indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
    );
  };

  // Render rank badge (Gold #1, Silver #2, Bronze #3, Standard #4+)
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/80 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
          <Trophy className="h-3 w-3 text-amber-500 fill-amber-500" />
          <span>#1</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-[11px]">
          <Medal className="h-3 w-3 text-slate-400 fill-slate-400" />
          <span>#2</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-900/10 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800 text-amber-900 dark:text-amber-400 font-bold text-[11px]">
          <Medal className="h-3 w-3 text-amber-700 fill-amber-700" />
          <span>#3</span>
        </div>
      );
    }
    return (
      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-[10px] font-mono">
        {rank}
      </span>
    );
  };

  return (
    <div
      id="staff-leaderboard-container"
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
    >
      {/* Header & Controls */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
            <Trophy className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Staff Leaderboard
            </h3>
          </div>
        </div>

        {/* Search & Filter Input */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              id="staff-search-input"
              type="text"
              placeholder="Search staff name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table id="staff-leaderboard-table" className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              {/* Rank */}
              <th
                onClick={() => handleSort('rank')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Rank</span>
                  {renderSortIndicator('rank')}
                </div>
              </th>

              {/* Staff Name */}
              <th
                onClick={() => handleSort('staff_name')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Staff Member</span>
                  {renderSortIndicator('staff_name')}
                </div>
              </th>

              {/* Today Sales */}
              <th
                onClick={() => handleSort('today_sales')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Today Sales</span>
                  {renderSortIndicator('today_sales')}
                </div>
              </th>

              {/* Today Revenue */}
              <th
                onClick={() => handleSort('today_revenue')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Today Rev</span>
                  {renderSortIndicator('today_revenue')}
                </div>
              </th>

              {/* Monthly Sales & Relative Bar */}
              <th
                onClick={() => handleSort('monthly_sales')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Monthly SIMs</span>
                  {renderSortIndicator('monthly_sales')}
                </div>
              </th>

              {/* Monthly Revenue */}
              <th
                onClick={() => handleSort('monthly_revenue')}
                className="py-2.5 px-3 cursor-pointer select-none group hover:text-slate-900 dark:hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Monthly Rev</span>
                  {renderSortIndicator('monthly_revenue')}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
            {processedData.length > 0 ? (
              processedData.map((staff) => {
                const relativePercentage = Math.min(
                  100,
                  Math.round((staff.monthly_sales / maxMonthlySales) * 100)
                );
                const isTopThree = staff.originalRank <= 3;
                const hasZeroToday = staff.today_sales === 0;

                return (
                  <tr
                    key={staff.cleanName}
                    className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 ${
                      staff.originalRank === 1
                        ? 'bg-amber-50/20 dark:bg-amber-950/10'
                        : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      {renderRankBadge(staff.originalRank)}
                    </td>

                    {/* Staff Name & Department */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shrink-0 ${
                            staff.originalRank === 1
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                              : staff.originalRank === 2
                              ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                              : staff.originalRank === 3
                              ? 'bg-amber-200/60 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          }`}
                        >
                          {staff.cleanName.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-semibold text-slate-800 dark:text-white flex items-center gap-1">
                          <span>{staff.cleanName}</span>
                          {staff.originalRank === 1 && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                              Top Gun
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Today's Sales */}
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      {hasZeroToday ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                          0
                        </span>
                      ) : (
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">
                          {formatNumber(staff.today_sales)}
                        </span>
                      )}
                    </td>

                    {/* Today's Revenue */}
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      {staff.today_revenue === 0 ? (
                        <span className="text-slate-400 dark:text-slate-500 font-mono text-xs">₹0</span>
                      ) : (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          {formatINR(staff.today_revenue, false)}
                        </span>
                      )}
                    </td>

                    {/* Monthly Sales + Progress Bar */}
                    <td className="py-2 px-3 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-white font-mono min-w-[28px]">
                          {formatNumber(staff.monthly_sales)}
                        </span>
                        <div className="h-1.5 w-16 sm:w-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              staff.originalRank === 1
                                ? 'bg-amber-500'
                                : staff.originalRank === 2
                                ? 'bg-slate-400 dark:bg-slate-300'
                                : staff.originalRank === 3
                                ? 'bg-amber-600'
                                : 'bg-indigo-600 dark:bg-indigo-500'
                            }`}
                            style={{ width: `${relativePercentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                          {relativePercentage}%
                        </span>
                      </div>
                    </td>

                    {/* Monthly Revenue */}
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      <span className="font-bold text-slate-800 dark:text-white font-mono">
                        {formatINR(staff.monthly_revenue, false)}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <User className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                    <p className="font-medium text-xs">No staff members found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Clear search query
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with summary metadata */}
      <div className="p-2.5 px-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/20">
        <span>
          Showing <strong className="text-slate-700 dark:text-slate-200">{processedData.length}</strong> of{' '}
          {data.length} members
        </span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>Top: <strong className="text-slate-800 dark:text-slate-200">Faizan</strong> (186 SIMs • ₹1,42,148)</span>
        </div>
      </div>
    </div>
  );
};
