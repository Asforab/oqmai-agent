import { env } from './env';
import { OPENAI_MODELS } from './constants';
import { SYSTEM_PROMPTS } from './prompts';
import type { AssistantConfig } from './types';

export const ASSISTANT_CONFIG: Record<string, AssistantConfig> = {
  ORTOBOT: {
    ID: env.ASSISTANT_ID,
    MODEL: OPENAI_MODELS.GPT4,
    SYSTEM_PROMPT: SYSTEM_PROMPTS.ORTOBOT
  },
  REFINE_QUERY: {
    ID: env.REFINE_QUERY_BOT_ID,
    MODEL: OPENAI_MODELS.GPT4,
    SYSTEM_PROMPT: SYSTEM_PROMPTS.REFINE_QUERY
  },
  VALIDATION: {
    ID: env.VALIDATION_BOT_ID,
    MODEL: OPENAI_MODELS.GPT4,
    SYSTEM_PROMPT: SYSTEM_PROMPTS.VALIDATION
  }
} as const;