import { z } from 'zod';
import { Logger } from './Logger';

const logger = new Logger('Validation');

export function validateMessage(message: unknown): string {
  const schema = z.string().min(1).max(4000);
  
  try {
    return schema.parse(message);
  } catch (error) {
    logger.error('Message validation failed', { error });
    throw new Error('Invalid message format');
  }
}

export function validateAssistantId(id: unknown): string {
  const schema = z.string().regex(/^asst_/);
  
  try {
    return schema.parse(id);
  } catch (error) {
    logger.error('Assistant ID validation failed', { error });
    throw new Error('Invalid assistant ID format');
  }
}