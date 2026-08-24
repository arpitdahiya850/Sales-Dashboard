import { DashboardData } from '../types';

/**
 * Embedded sample data matching the exact required schema.
 * Represents SIM card sales operations for May 2026.
 */
export const initialDashboardData: DashboardData = {
  report_date: "2026-05-24",
  last_updated: "2026-05-24T18:45:00+05:30",
  daily_summary: {
    today_orders: 34,
    today_revenue: 29006.4,
    month_orders: 594,
    month_revenue: 472087
  },
  daily_sales: [
    { date: "2026-05-01", sales: 23, revenue: 18400 },
    { date: "2026-05-02", sales: 28, revenue: 22400 },
    { date: "2026-05-03", sales: 19, revenue: 15200 },
    { date: "2026-05-04", sales: 25, revenue: 19800 },
    { date: "2026-05-05", sales: 31, revenue: 24600 },
    { date: "2026-05-06", sales: 18, revenue: 14400 },
    { date: "2026-05-07", sales: 11, revenue: 8900 }, // Lowest sales day (trough)
    { date: "2026-05-08", sales: 22, revenue: 17500 },
    { date: "2026-05-09", sales: 27, revenue: 21600 },
    { date: "2026-05-10", sales: 30, revenue: 24000 },
    { date: "2026-05-11", sales: 24, revenue: 19200 },
    { date: "2026-05-12", sales: 29, revenue: 23100 },
    { date: "2026-05-13", sales: 33, revenue: 26400 },
    { date: "2026-05-14", sales: 26, revenue: 20800 },
    { date: "2026-05-15", sales: 36, revenue: 28800 },
    { date: "2026-05-16", sales: 41, revenue: 32800 },
    { date: "2026-05-17", sales: 38, revenue: 30400 },
    { date: "2026-05-18", sales: 48, revenue: 38400 }, // Highest sales day (peak)
    { date: "2026-05-19", sales: 35, revenue: 27900 },
    { date: "2026-05-20", sales: 29, revenue: 23200 },
    { date: "2026-05-21", sales: 32, revenue: 25600 },
    { date: "2026-05-22", sales: 26, revenue: 20750 },
    { date: "2026-05-23", sales: 30, revenue: 24100 },
    { date: "2026-05-24", sales: 34, revenue: 29006.4 } // Today
  ],
  monthly_sales: [
    { month_no: 1, month: "Jan 26", sales: 322, revenue: 256000, growth_rate: 0 },
    { month_no: 2, month: "Feb 26", sales: 389, revenue: 308500, growth_rate: 20.8 },
    { month_no: 3, month: "Mar 26", sales: 445, revenue: 354000, growth_rate: 14.4 },
    { month_no: 4, month: "Apr 26", sales: 512, revenue: 408000, growth_rate: 15.1 },
    { month_no: 5, month: "May 26", sales: 594, revenue: 472087, growth_rate: 16.0 }
  ],
  leaderboard: [
    {
      staff_name: "Faizan",
      today_sales: 10,
      today_revenue: 10534.2,
      monthly_sales: 186,
      monthly_revenue: 142148,
      department: "Enterprise SIMs"
    },
    {
      staff_name: "Talha ", // Trailing space intentionally present to test trimming
      today_sales: 7,
      today_revenue: 6120.0,
      monthly_sales: 142,
      monthly_revenue: 114500,
      department: "Retail & MNP"
    },
    {
      staff_name: "Prabhat ", // Trailing space intentionally present to test trimming
      today_sales: 5,
      today_revenue: 4350.5,
      monthly_sales: 98,
      monthly_revenue: 78900,
      department: "eSIM Activations"
    },
    {
      staff_name: "Ayesha Khan",
      today_sales: 4,
      today_revenue: 3480.0,
      monthly_sales: 72,
      monthly_revenue: 58200,
      department: "Postpaid Direct"
    },
    {
      staff_name: "Vikram Malhotra",
      today_sales: 3,
      today_revenue: 2190.7,
      monthly_sales: 45,
      monthly_revenue: 39400,
      department: "Tourist & 5G SIMs"
    },
    {
      staff_name: "Sneha Patel",
      today_sales: 2,
      today_revenue: 1420.0,
      monthly_sales: 26,
      monthly_revenue: 21600,
      department: "Corporate Fleets"
    },
    {
      staff_name: "Rohan Joshi",
      today_sales: 2,
      today_revenue: 911.0,
      monthly_sales: 15,
      monthly_revenue: 11200,
      department: "Retail & MNP"
    },
    {
      staff_name: "Imran Sheikh ",
      today_sales: 1,
      today_revenue: 0.0, // Edge case: zero revenue with 1 trial SIM sale
      monthly_sales: 6,
      monthly_revenue: 4139,
      department: "Regional Kiosks"
    },
    {
      staff_name: "Priya Sharma",
      today_sales: 0, // Edge case: zero today sales
      today_revenue: 0,
      monthly_sales: 4,
      monthly_revenue: 2000,
      department: "Support & Addons"
    }
  ]
};

/**
 * Production-ready simulation of an API fetch endpoint.
 * In a real-world backend, this would make an HTTP call:
 * e.g., const response = await fetch(`/api/sim-analytics?date=${date}`);
 * 
 * @param date YYYY-MM-DD string
 * @returns Promise<DashboardData>
 */
export async function fetchDashboardData(date: string = "2026-05-24"): Promise<DashboardData> {
  // Simulate network roundtrip latency (400ms - 800ms)
  await new Promise((resolve) => setTimeout(resolve, 450));

  // If fetching for a specific date, slightly vary the today metrics to reflect realistic daily updates
  if (date === "2026-05-24") {
    return JSON.parse(JSON.stringify(initialDashboardData));
  }

  // Generate dynamic date data if another date is selected
  const clone = JSON.parse(JSON.stringify(initialDashboardData)) as DashboardData;
  clone.report_date = date;
  
  // Find if date exists in daily_sales
  const matchedDay = clone.daily_sales.find(d => d.date === date);
  if (matchedDay) {
    clone.daily_summary.today_orders = matchedDay.sales;
    clone.daily_summary.today_revenue = matchedDay.revenue || (matchedDay.sales * 850);
  } else {
    // Generate deterministic values for newly picked date
    const hash = date.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
    const simulatedOrders = 20 + (hash % 25);
    const simulatedRevenue = simulatedOrders * (800 + (hash % 150));
    clone.daily_summary.today_orders = simulatedOrders;
    clone.daily_summary.today_revenue = simulatedRevenue;
  }

  return clone;
}
