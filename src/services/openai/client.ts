import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: import.meta.env.VITE_ORGANIZATION_ID,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v1'
  },
  dangerouslyAllowBrowser: true
});