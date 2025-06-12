/**
 * Generates the Calendly URL with the current month parameter
 * The month parameter automatically updates on the first of each month
 * Format: YYYY-MM (e.g., 2025-06 for June 2025)
 */
export function getCalendlyUrl(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // getMonth() returns 0-11, so add 1
  
  return `https://calendly.com/official-ssello/30min?back=1&month=${year}-${month}`
}

/**
 * Gets the base Calendly URL without parameters (for special cases if needed)
 */
export function getBaseCalendlyUrl(): string {
  return 'https://calendly.com/official-ssello'
} 