import { z } from 'zod';
import { AssistantConfig } from '../types/assistant';

const assistantConfigSchema = z.object({
  ID: z.string().min(1),
  MODEL: z.string().min(1),
  SYSTEM_PROMPT: z.string().min(1)
});

export function validateAssistantConfig(config: AssistantConfig) {
  try {
    assistantConfigSchema.parse(config);
  } catch (error) {
    console.error('Invalid assistant configuration:', error);
    throw new Error('Invalid assistant configuration');
  }
}