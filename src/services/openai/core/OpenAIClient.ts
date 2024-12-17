import OpenAI from 'openai';
import { validateConfig } from '../config/validation';

validateConfig();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION_ID,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v1'
  }
});