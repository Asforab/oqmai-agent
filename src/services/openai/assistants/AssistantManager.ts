import OpenAI from 'openai';
import { VECTOR_STORE } from '../config/constants';
import { OpenAIError } from '../errors/OpenAIError';

export class AssistantManager {
  constructor(private openai: OpenAI) {}

  async configureAssistant(assistantId: string) {
    try {
      const assistant = await this.openai.beta.assistants.retrieve(assistantId);
      
      await this.openai.beta.assistants.update(assistant.id, {
        tool_resources: {
          file_search: {
            vector_store_ids: [VECTOR_STORE.ID]
          }
        }
      });

      return assistant;
    } catch (error) {
      throw new OpenAIError(
        'Failed to configure assistant',
        'ASSISTANT_CONFIG_ERROR',
        undefined,
        error
      );
    }
  }
}