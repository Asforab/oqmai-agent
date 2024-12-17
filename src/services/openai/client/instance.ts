import OpenAI from 'openai';
import { clientConfig } from './config';

export const openai = new OpenAI({
  ...clientConfig,
  dangerouslyAllowBrowser: true
});