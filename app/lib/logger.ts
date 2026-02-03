/**
 * Logger utility for conditional logging in development mode only.
 * In production, all logs are suppressed.
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log(...args: unknown[]): void {
    if (isDevelopment) {
      console.log(...args)
    }
  },

  warn(...args: unknown[]): void {
    if (isDevelopment) {
      console.warn(...args)
    }
  },

  error(...args: unknown[]): void {
    if (isDevelopment) {
      console.error(...args)
    }
  },

  info(...args: unknown[]): void {
    if (isDevelopment) {
      console.info(...args)
    }
  },
}
