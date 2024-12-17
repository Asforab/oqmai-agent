import { z } from 'zod';

const configSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  ASSISTANT_ID: z.string().min(1),
  ORGANIZATION_ID: z.string().min(1),
  MODEL: z.string().min(1),
});

export const config = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  ASSISTANT_ID: 'asst_XJpV80i5Vog9OG23dfQLTvv5',
  ORGANIZATION_ID: 'org-U1VywXTMCkWgzlQOfx6k7Nvm',
  MODEL: 'gpt-4o-mini-2024-07-18',
} as const;

try {
  configSchema.parse(config);
} catch (error) {
  console.error('Invalid configuration:', error);
  throw new Error('Invalid configuration');
}