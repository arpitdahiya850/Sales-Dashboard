import { DashboardData, DailySaleItem, MonthlySaleItem, StaffPerformance } from '../types';

/**
 * Baseline master data for May 2026.
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
      staff_name: "Talha ",
      today_sales: 7,
      today_revenue: 6120.0,
      monthly_sales: 142,
      monthly_revenue: 114500,
      department: "Retail & MNP"
    },
    {
      staff_name: "Prabhat ",
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
      today_revenue: 0.0,
      monthly_sales: 6,
      monthly_revenue: 4139,
      department: "Regional Kiosks"
    },
    {
      staff_name: "Priya Sharma",
      today_sales: 0,
      today_revenue: 0,
      monthly_sales: 4,
      monthly_revenue: 2000,
      department: "Support & Addons"
    }
  ]
};

const STAFF_CONFIG = [
  { name: "Faizan", department: "Enterprise SIMs", weight: 0.31, avgPrice: 1053.42 },
  { name: "Talha ", department: "Retail & MNP", weight: 0.23, avgPrice: 874.28 },
  { name: "Prabhat ", department: "eSIM Activations", weight: 0.16, avgPrice: 870.10 },
  { name: "Ayesha Khan", department: "Postpaid Direct", weight: 0.12, avgPrice: 870.00 },
  { name: "Vikram Malhotra", department: "Tourist & 5G SIMs", weight: 0.08, avgPrice: 730.23 },
  { name: "Sneha Patel", department: "Corporate Fleets", weight: 0.05, avgPrice: 710.00 },
  { name: "Rohan Joshi", department: "Retail & MNP", weight: 0.03, avgPrice: 455.50 },
  { name: "Imran Sheikh ", department: "Regional Kiosks", weight: 0.015, avgPrice: 689.83 },
  { name: "Priya Sharma", department: "Support & Addons", weight: 0.005, avgPrice: 500.00 },
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Deterministic pseudo-random number generator from a seed string.
 */
function createSeededRNG(seedStr: string) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Generate full dashboard dataset dynamically based on any chosen date.
 */
export function generateDashboardData(targetDate: string): DashboardData {
  const [yearStr, monthStr, dayStr] = targetDate.split('-');
  const year = parseInt(yearStr, 10) || 2026;
  const month = parseInt(monthStr, 10) || 5;
  const day = parseInt(dayStr, 10) || 24;

  const daysInMonth = new Date(year, month, 0).getDate();
  const clampedDay = Math.max(1, Math.min(day, daysInMonth));
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(clampedDay).padStart(2, '0')}`;

  const isMay2026 = year === 2026 && month === 5;

  // 1. Generate Daily Sales array for the whole month
  const dailySales: DailySaleItem[] = [];
  let mtdOrders = 0;
  let mtdRevenue = 0;
  let todayOrders = 0;
  let todayRevenue = 0;

  if (isMay2026) {
    const baseMap = new Map(initialDashboardData.daily_sales.map(d => [d.date, d]));
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `2026-05-${String(d).padStart(2, '0')}`;
      let itemSales = 0;
      let itemRevenue = 0;

      if (baseMap.has(dStr)) {
        const item = baseMap.get(dStr)!;
        itemSales = item.sales;
        itemRevenue = item.revenue || (item.sales * 850);
      } else {
        const daySeedRng = createSeededRNG(`2026-05-${d}`);
        itemSales = Math.round(22 + daySeedRng() * 18);
        itemRevenue = Math.round(itemSales * (800 + daySeedRng() * 120));
      }

      dailySales.push({ date: dStr, sales: itemSales, revenue: itemRevenue });

      // Calculate Month-to-Date (MTD) cumulative up to the selected day
      if (d <= clampedDay) {
        mtdOrders += itemSales;
        mtdRevenue += itemRevenue;
      }

      if (d === clampedDay) {
        todayOrders = itemSales;
        todayRevenue = itemRevenue;
      }
    }
  } else {
    // Generate full month daily sales for any arbitrary year & month
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayOfWeek = new Date(year, month - 1, d).getDay(); // 0 is Sunday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const daySeedRng = createSeededRNG(dStr);
      // Realistic base range: 18 - 42 SIMs, with weekend volume bumps
      const base = 18 + Math.floor(daySeedRng() * 24) + (isWeekend ? 5 : 0);
      const revPerSim = 790 + Math.floor(daySeedRng() * 140);
      const rev = Math.round(base * revPerSim);

      dailySales.push({ date: dStr, sales: base, revenue: rev });

      if (d <= clampedDay) {
        mtdOrders += base;
        mtdRevenue += rev;
      }

      if (d === clampedDay) {
        todayOrders = base;
        todayRevenue = rev;
      }
    }
  }

  // Fallback safety
  if (todayOrders === 0) {
    todayOrders = 30;
    todayRevenue = 25500;
  }
  if (mtdOrders === 0) {
    mtdOrders = todayOrders;
    mtdRevenue = todayRevenue;
  }

  // 2. Generate Staff Leaderboard tailored for this date
  const dayRng = createSeededRNG(formattedDate);
  const staffList: StaffPerformance[] = [];
  let allocatedTodaySales = 0;
  let allocatedTodayRev = 0;
  let allocatedMonthSales = 0;
  let allocatedMonthRev = 0;

  // Distribute sales across staff with realistic performance weights
  const staffShares = STAFF_CONFIG.map((s, idx) => {
    const variance = (dayRng() - 0.5) * 0.08;
    const adjustedWeight = Math.max(0.01, s.weight + variance);
    return { ...s, index: idx, adjustedWeight };
  });

  const totalWeight = staffShares.reduce((sum, s) => sum + s.adjustedWeight, 0);
  const normalizedStaff = staffShares.map(s => ({
    ...s,
    normalizedWeight: s.adjustedWeight / totalWeight
  }));

  // Distribute today orders exactly matching todayOrders
  normalizedStaff.forEach((staff, i) => {
    let sToday = 0;
    if (i === normalizedStaff.length - 1) {
      sToday = Math.max(0, todayOrders - allocatedTodaySales);
    } else {
      sToday = Math.round(todayOrders * staff.normalizedWeight);
      if (allocatedTodaySales + sToday > todayOrders) {
        sToday = Math.max(0, todayOrders - allocatedTodaySales);
      }
    }
    allocatedTodaySales += sToday;

    // Distribute monthly orders matching mtdOrders
    let sMonth = 0;
    if (i === normalizedStaff.length - 1) {
      sMonth = Math.max(sToday, mtdOrders - allocatedMonthSales);
    } else {
      sMonth = Math.max(sToday, Math.round(mtdOrders * staff.normalizedWeight));
      if (allocatedMonthSales + sMonth > mtdOrders) {
        sMonth = Math.max(sToday, mtdOrders - allocatedMonthSales);
      }
    }
    allocatedMonthSales += sMonth;

    // Revenue calculation
    const todayRev = sToday > 0 
      ? Math.round(sToday * (staff.avgPrice * (0.95 + dayRng() * 0.1) * 10)) / 10
      : 0;
    const monthRev = Math.round(sMonth * staff.avgPrice);

    allocatedTodayRev += todayRev;
    allocatedMonthRev += monthRev;

    staffList.push({
      staff_name: staff.name,
      today_sales: sToday,
      today_revenue: todayRev,
      monthly_sales: sMonth,
      monthly_revenue: monthRev,
      department: staff.department
    });
  });

  // Adjust any today revenue difference onto top performer so sum matches exactly
  if (staffList.length > 0 && todayOrders > 0) {
    const revDiff = todayRevenue - allocatedTodayRev;
    staffList[0].today_revenue = Math.round((staffList[0].today_revenue + revDiff) * 10) / 10;
  }

  // Sort leaderboard by monthly_sales desc, then monthly_revenue desc
  staffList.sort((a, b) => b.monthly_sales - a.monthly_sales || b.monthly_revenue - a.monthly_revenue);

  // 3. Generate 5-Month Historical Sales Trend ending in the selected month
  const monthlySales: MonthlySaleItem[] = [];

  for (let i = 4; i >= 0; i--) {
    let m = month - i;
    let y = year;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    const mName = `${MONTH_NAMES[m - 1]} ${String(y).slice(-2)}`;
    const isCurrent = i === 0;

    let mSales = 0;
    let mRev = 0;

    if (isCurrent) {
      mSales = mtdOrders;
      mRev = mtdRevenue;
    } else {
      // Historical trend progression
      const historyRng = createSeededRNG(`${y}-${m}`);
      const factor = 0.55 + ((4 - i) * 0.11) + (historyRng() * 0.05);
      mSales = Math.round(mtdOrders * factor);
      mRev = Math.round(mtdRevenue * factor);
    }

    monthlySales.push({
      month_no: 5 - i,
      month: mName,
      sales: mSales,
      revenue: mRev,
      growth_rate: 0
    });
  }

  // Calculate growth rates
  for (let i = 0; i < monthlySales.length; i++) {
    if (i === 0) {
      monthlySales[i].growth_rate = 0;
    } else {
      const prev = monthlySales[i - 1].sales;
      const curr = monthlySales[i].sales;
      const rate = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
      monthlySales[i].growth_rate = Math.round(rate * 10) / 10;
    }
  }

  return {
    report_date: formattedDate,
    last_updated: `${formattedDate}T18:45:00+05:30`,
    daily_summary: {
      today_orders: todayOrders,
      today_revenue: todayRevenue,
      month_orders: mtdOrders,
      month_revenue: mtdRevenue
    },
    daily_sales: dailySales,
    monthly_sales: monthlySales,
    leaderboard: staffList
  };
}

/**
 * Production-ready simulation of an API fetch endpoint.
 * In a real-world backend, this would make an HTTP call:
 * e.g., const response = await fetch(`/api/sim-analytics?date=${date}`);
 * 
 * @param date YYYY-MM-DD string
 * @returns Promise<DashboardData>
 */
export async function fetchDashboardData(date: string = "2026-05-24"): Promise<DashboardData> {
  // Simulate rapid network roundtrip latency (200ms - 350ms for responsive UI)
  await new Promise((resolve) => setTimeout(resolve, 250));
  return generateDashboardData(date);
}

