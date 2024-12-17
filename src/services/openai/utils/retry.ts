import { Logger } from './Logger';

const logger = new Logger('RetryUtil');

interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    shouldRetry = () => true
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      logger.warn(`Attempt ${attempt} failed, retrying...`, { error });
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError;
}