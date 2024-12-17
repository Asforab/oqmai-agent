import { env } from '../config';

export const clientConfig = {
  apiKey: env.OPENAI_API_KEY,
  organization: env.ORGANIZATION_ID,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v1'
  }
} as const;