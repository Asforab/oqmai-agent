import OpenAI from 'openai';
import { OPENAI_CONFIG } from './constants';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  organization: OPENAI_CONFIG.ORGANIZATION_ID,
  dangerouslyAllowBrowser: true
});