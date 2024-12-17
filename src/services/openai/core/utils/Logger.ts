export class Logger {
  constructor(private context: string) {}

  info(message: string, data?: Record<string, unknown>) {
    console.log(`[${this.context}] ${message}`, data || '');
  }

  error(message: string, data?: Record<string, unknown>) {
    console.error(`[${this.context}] ERROR: ${message}`, data || '');
  }

  warn(message: string, data?: Record<string, unknown>) {
    console.warn(`[${this.context}] WARN: ${message}`, data || '');
  }

  debug(message: string, data?: Record<string, unknown>) {
    console.debug(`[${this.context}] DEBUG: ${message}`, data || '');
  }
}