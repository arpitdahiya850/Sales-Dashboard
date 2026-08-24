import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag,
  IndianRupee,
  PackageCheck,
  CreditCard,
  TrendingUp,
  Signal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { DailySalesChart } from './components/DailySalesChart';
import { MonthlySalesChart } from './components/MonthlySalesChart';
import { LeaderboardTable } from './components/LeaderboardTable';
import { LeaderboardMiniChart } from './components/LeaderboardMiniChart';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { DashboardData } from './types';
import { initialDashboardData, fetchDashboardData } from './data/mockData';
import { formatINR } from './utils/formatters';

export default function App() {
  const [data, setData] = useState<DashboardData>(initialDashboardData);
  const [reportDate, setReportDate] = useState<string>("2026-05-24");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sim_dashboard_theme');
      if (saved) return saved === 'dark';
      return false; // Default light theme as requested
    }
    return false;
  });

  // Sync dark mode class with HTML document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('sim_dashboard_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sim_dashboard_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Load dashboard data for a given date
  const loadData = useCallback(async (date: string, isRefreshAction = false) => {
    if (isRefreshAction) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Calls the stubbed fetchDashboardData which simulates real API fetching
      const response = await fetchDashboardData(date);
      setData(response);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Handle date change from Date Picker
  const handleDateChange = (newDate: string) => {
    setReportDate(newDate);
    loadData(newDate, false);
  };

  // Handle Refresh button click
  const handleRefresh = () => {
    loadData(reportDate, true);
  };

  // Derived metrics for KPI cards
  const { daily_summary, daily_sales, monthly_sales, leaderboard } = data;
  
  // Calculate average order value today: today_revenue / today_orders
  const avgOrderValueToday = daily_summary.today_orders > 0 
    ? daily_summary.today_revenue / daily_summary.today_orders 
    : 0;

  // Calculate average order value this month: month_revenue / month_orders
  const avgOrderValueMonth = daily_summary.month_orders > 0
    ? daily_summary.month_revenue / daily_summary.month_orders
    : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        reportDate={reportDate}
        onDateChange={handleDateChange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        lastUpdated={data.last_updated}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-6 py-4 space-y-3.5">
        
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* 1. KPI Summary Cards (Top Row, 4 Cards) */}
            <section aria-label="KPI Summary Cards">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                
                {/* Card 1: Today's Orders */}
                <KPICard
                  id="kpi-today-orders"
                  title="Today's Orders"
                  value={daily_summary.today_orders}
                  isCurrency={false}
                  icon={ShoppingBag}
                  colorScheme="blue"
                  subtitle={`Avg: ${(daily_summary.today_orders / 24).toFixed(1)}/hr pace`}
                  badgeText="Live Today"
                />

                {/* Card 2: Today's Revenue */}
                <KPICard
                  id="kpi-today-revenue"
                  title="Today's Revenue"
                  value={daily_summary.today_revenue}
                  isCurrency={true}
                  decimals={2}
                  icon={IndianRupee}
                  colorScheme="green"
                  subtitle={`AOV: ${formatINR(avgOrderValueToday, true)}`}
                  badgeText="+8.4% vs yday"
                />

                {/* Card 3: This Month's Orders */}
                <KPICard
                  id="kpi-month-orders"
                  title="This Month's Orders"
                  value={daily_summary.month_orders}
                  isCurrency={false}
                  icon={PackageCheck}
                  colorScheme="purple"
                  subtitle="94% of monthly target"
                  badgeText="594 Activated"
                />

                {/* Card 4: This Month's Revenue */}
                <KPICard
                  id="kpi-month-revenue"
                  title="This Month's Revenue"
                  value={daily_summary.month_revenue}
                  isCurrency={true}
                  decimals={0}
                  icon={CreditCard}
                  colorScheme="orange"
                  subtitle={`Avg: ${formatINR(avgOrderValueMonth, false)}/order`}
                  badgeText="+16% MoM"
                />
              </div>
            </section>

            {/* 2. Charts Row (Daily Trend + Monthly Trend) */}
            <section aria-label="Sales Analytics Charts" className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {/* Daily Sales Trend Chart */}
              <DailySalesChart
                data={daily_sales}
                isDarkMode={isDarkMode}
              />

              {/* Monthly Sales Trend Chart */}
              <MonthlySalesChart
                data={monthly_sales}
                isDarkMode={isDarkMode}
              />
            </section>

            {/* 3. Staff Performance & Leaderboard Section */}
            <section aria-label="Staff Leaderboard and Comparison">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
                
                {/* Staff Leaderboard Table (Spans 2 columns on large screens) */}
                <div className="lg:col-span-2">
                  <LeaderboardTable
                    data={leaderboard}
                    isDarkMode={isDarkMode}
                  />
                </div>

                {/* Leaderboard Mini Visual Bar Chart (Spans 1 column on large screens) */}
                <div className="lg:col-span-1">
                  <LeaderboardMiniChart
                    data={leaderboard}
                    isDarkMode={isDarkMode}
                  />
                </div>

              </div>
            </section>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-2.5 text-center text-[11px] text-slate-400 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <span>SIM Sales Operations Dashboard &copy; 2026</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> System Operational
            </span>
            <span>Locale: en-IN (₹)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
