import { z } from 'zod';
import { ServiceConfig } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { OpenAIError } from '../errors';

const configSchema = z.object({
  apiKey: z.string().min(1),
  organizationId: z.string().min(1),
  assistantId: z.string().min(1),
  validationBotId: z.string().min(1),
  refineQueryBotId: z.string().min(1)
});

export function validateServiceConfig(config: ServiceConfig): void {
  try {
    configSchema.parse(config);
  } catch (error) {
    throw new OpenAIError(
      ERROR_MESSAGES.INVALID_CONFIG,
      ERROR_CODES.CONFIGURATION,
      undefined,
      error
    );
  }
}