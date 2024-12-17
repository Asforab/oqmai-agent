import { Logger } from './Logger';
import { RetryOptions } from '../types';

const logger = new Logger('RetryUtil');

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffFactor = 1.5,
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

      const delay = delayMs * Math.pow(backoffFactor, attempt - 1);
      logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, { error });
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}