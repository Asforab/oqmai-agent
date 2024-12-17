import { openAIService } from './openai/index';

// Re-export the singleton instance
export { openAIService };

// Re-export types
export type { AssistantResponse } from './openai/core/types';