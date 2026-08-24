/**
 * Utility formatters for Indian Rupee currency, numbers, dates and text
 */

/**
 * Formats a number into Indian Rupee currency representation:
 * E.g., 29006.4 => ₹29,006.40 or ₹29,006
 * E.g., 142148 => ₹1,42,148
 * E.g., 472087 => ₹4,72,087
 */
export function formatINR(value: number | null | undefined, includeDecimals = true): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '₹0';
  }

  const hasFractions = value % 1 !== 0;
  const showDecimals = includeDecimals && (hasFractions || (typeof includeDecimals === 'boolean' && includeDecimals));

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(value);
  } catch {
    // Fallback if Intl.NumberFormat fails in rare environment
    return `₹${value.toLocaleString('en-IN')}`;
  }
}

/**
 * Formats standard integer numbers with Indian numbering commas (e.g. 594 => 594, 12500 => 12,500)
 */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Formats a YYYY-MM-DD date string to "DD Mon" (e.g., "2026-05-01" => "01 May")
 * or "DD Mon YYYY" (e.g., "01 May 2026")
 */
export function formatDate(dateString: string, fullYear = false): string {
  if (!dateString) return '';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[monthIndex] || 'Mon';
      const dayFormatted = day < 10 ? `0${day}` : `${day}`;

      if (fullYear) {
        return `${dayFormatted} ${monthName} ${year}`;
      }
      return `${dayFormatted} ${monthName}`;
    }

    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      const options: Intl.DateTimeFormatOptions = fullYear
        ? { day: '2-digit', month: 'short', year: 'numeric' }
        : { day: '2-digit', month: 'short' };
      return d.toLocaleDateString('en-GB', options);
    }
    return dateString;
  } catch {
    return dateString;
  }
}

/**
 * Trims extra whitespace and sanitizes staff names (e.g. "Talha " => "Talha")
 */
export function sanitizeStaffName(name: string | null | undefined): string {
  if (!name) return 'Unknown Staff';
  return name.trim();
}

/**
 * Calculates percentage growth between two numbers
 */
export function calculateGrowth(current: number, previous: number): number {
  if (!previous || previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

/**
 * Formats a percentage with sign and symbol (e.g., +12.5%, -4.2%)
 */
export function formatPercentage(pct: number): string {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}
