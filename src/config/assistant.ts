import { ASSISTANT_ID } from './constants';
import { openai } from './openai';

export async function getOrCreateAssistant() {
  try {
    return await openai.beta.assistants.retrieve(ASSISTANT_ID);
  } catch (error) {
    console.error('Error retrieving assistant:', error);
    throw new Error('Failed to initialize assistant');
  }
}