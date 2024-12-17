import { ASSISTANT_CONFIG } from './config/assistants';
import { VECTOR_STORE } from './config/vector-store';
import { validateAssistantConfig } from './config/validation';

// Run validation immediately
validateAssistantConfig(ASSISTANT_CONFIG);

// Re-export configurations
export { ASSISTANT_CONFIG, VECTOR_STORE };

// Re-export types
export type { AssistantConfig, VectorStoreConfig } from './config/types';