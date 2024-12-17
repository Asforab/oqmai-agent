import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  VITE_ORGANIZATION_ID: z.string().min(1, "Organization ID is required"),
  VITE_ASSISTANT_ID: z.string().min(1, "Assistant ID is required"),
  VITE_REFINE_QUERY_BOT_ID: z.string().min(1, "Refine Query Bot ID is required"),
  VITE_VALIDATION_BOT_ID: z.string().min(1, "Validation Bot ID is required")
});

export function validateConfig() {
  try {
    const env = {
      VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
      VITE_ORGANIZATION_ID: import.meta.env.VITE_ORGANIZATION_ID,
      VITE_ASSISTANT_ID: import.meta.env.VITE_ASSISTANT_ID,
      VITE_REFINE_QUERY_BOT_ID: import.meta.env.VITE_REFINE_QUERY_BOT_ID,
      VITE_VALIDATION_BOT_ID: import.meta.env.VITE_VALIDATION_BOT_ID
    };

    const result = envSchema.safeParse(env);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n');
      
      throw new Error(`Environment validation failed:\n${errors}`);
    }
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw new Error('Invalid configuration');
  }
}