import { z } from 'zod';
import { ASSISTANT_CONFIG } from './constants';

const assistantConfigSchema = z.object({
  ID: z.string().min(1),
  MODEL: z.string().min(1),
  SYSTEM_PROMPT: z.string().min(1)
});

export function validateAssistantConfig() {
  try {
    Object.values(ASSISTANT_CONFIG).forEach(config => {
      assistantConfigSchema.parse(config);
    });
  } catch (error) {
    console.error('Invalid assistant configuration:', error);
    throw new Error('Invalid assistant configuration');
  }
}