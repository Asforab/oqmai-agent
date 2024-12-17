import { z } from 'zod';
import type { OPENAI_MODELS, ERROR_CODES } from './constants';

export type OpenAIModel = typeof OPENAI_MODELS[keyof typeof OPENAI_MODELS];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

export interface AssistantConfig {
  ID: string;
  MODEL: OpenAIModel;
  SYSTEM_PROMPT: string;
}

export interface VectorStoreConfig {
  ID: string;
  CONFIG: {
    topK: number;
    threshold: number;
  };
}

export const configSchema = {
  env: z.object({
    OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
    ORGANIZATION_ID: z.string().min(1, "Organization ID is required"),
    ASSISTANT_ID: z.string().min(1, "Assistant ID is required"),
    REFINE_QUERY_BOT_ID: z.string().min(1, "Refine Query Bot ID is required"),
    VALIDATION_BOT_ID: z.string().min(1, "Validation Bot ID is required")
  })
};