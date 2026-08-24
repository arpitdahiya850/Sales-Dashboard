export interface DailySummary {
  today_orders: number;
  today_revenue: number;
  month_orders: number;
  month_revenue: number;
}

export interface DailySaleItem {
  date: string; // YYYY-MM-DD
  sales: number;
  revenue?: number;
}

export interface MonthlySaleItem {
  month_no: number;
  month: string; // e.g. "Jan 26"
  sales: number;
  revenue?: number;
  growth_rate?: number; // % change from previous month
}

export interface StaffPerformance {
  staff_name: string;
  today_sales: number;
  today_revenue: number;
  monthly_sales: number;
  monthly_revenue: number;
  avatar_seed?: string;
  department?: string;
}

export interface DashboardData {
  daily_summary: DailySummary;
  daily_sales: DailySaleItem[];
  monthly_sales: MonthlySaleItem[];
  leaderboard: StaffPerformance[];
  report_date?: string;
  last_updated?: string;
}

export type SortField = 'rank' | 'staff_name' | 'today_sales' | 'today_revenue' | 'monthly_sales' | 'monthly_revenue';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
