import { OpenAIService } from './core/OpenAIService';

// Create and export singleton instance
export const openAIService = new OpenAIService();

// Export types
export type { AssistantResponse } from './core/types';