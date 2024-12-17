import { z } from 'zod';

export const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  ORGANIZATION_ID: z.string().min(1, "Organization ID is required"),
  ASSISTANT_ID: z.string().min(1, "Assistant ID is required"),
  REFINE_QUERY_BOT_ID: z.string().min(1, "Refine Query Bot ID is required"),
  VALIDATION_BOT_ID: z.string().min(1, "Validation Bot ID is required")
});

export type EnvConfig = z.infer<typeof envSchema>;