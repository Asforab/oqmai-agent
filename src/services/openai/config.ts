import { z } from 'zod';
import { OPENAI_MODELS } from './config/constants';
import { SYSTEM_PROMPTS } from './config/prompts';
import { env } from './config/env';

// Define the configuration schema
const configSchema = z.object({
  assistants: z.object({
    ORTOBOT: z.object({
      ID: z.string(),
      MODEL: z.string(),
      SYSTEM_PROMPT: z.string()
    }),
    REFINE_QUERY: z.object({
      ID: z.string(),
      MODEL: z.string(),
      SYSTEM_PROMPT: z.string()
    }),
    VALIDATION: z.object({
      ID: z.string(),
      MODEL: z.string(),
      SYSTEM_PROMPT: z.string()
    })
  }),
  vectorStore: z.object({
    ID: z.string(),
    CONFIG: z.object({
      topK: z.number(),
      threshold: z.number()
    })
  })
});

// Create the configuration object
const config = {
  assistants: {
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
  },
  vectorStore: {
    ID: 'vs_NEP3a8I7bWXplxQMuWRIFUSY',
    CONFIG: {
      topK: 3,
      threshold: 0.7
    }
  }
} as const;

// Validate configuration
const result = configSchema.safeParse(config);

if (!result.success) {
  const errors = result.error.errors
    .map(err => `${err.path.join('.')}: ${err.message}`)
    .join('\n');
  
  throw new Error(`Configuration validation failed:\n${errors}`);
}

// Export validated configuration
export const ASSISTANT_CONFIG = config.assistants;
export const VECTOR_STORE = config.vectorStore;

// Export types
export type AssistantConfig = typeof config.assistants[keyof typeof config.assistants];
export type VectorStoreConfig = typeof config.vectorStore;