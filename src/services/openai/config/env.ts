import { envSchema, type EnvConfig } from './schema';

const getEnvVariables = (): EnvConfig => ({
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  ORGANIZATION_ID: import.meta.env.VITE_ORGANIZATION_ID,
  ASSISTANT_ID: import.meta.env.VITE_ASSISTANT_ID,
  REFINE_QUERY_BOT_ID: import.meta.env.VITE_REFINE_QUERY_BOT_ID,
  VALIDATION_BOT_ID: import.meta.env.VITE_VALIDATION_BOT_ID,
});

const validateEnv = (env: EnvConfig) => {
  const result = envSchema.safeParse(env);
  
  if (!result.success) {
    const errors = result.error.errors
      .map(err => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    
    throw new Error(`Environment validation failed:\n${errors}`);
  }
  
  return env;
};

export const env = validateEnv(getEnvVariables());