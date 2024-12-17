import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
});

const env = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
};

try {
  envSchema.parse(env);
} catch (error) {
  console.error('Missing or invalid environment variables:', error);
  throw new Error('Missing or invalid environment variables');
}

export default env;