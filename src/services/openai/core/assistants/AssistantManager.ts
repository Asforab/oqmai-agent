import OpenAI from 'openai';
import { ASSISTANT_CONFIG } from '../../config/constants';
import { OpenAIError } from '../errors/OpenAIError';
import { Logger } from '../utils/Logger';

export class AssistantManager {
  private logger: Logger;

  constructor(private openai: OpenAI) {
    this.logger = new Logger('AssistantManager');
  }

  async retrieveAssistant(assistantId: string) {
    try {
      return await this.openai.beta.assistants.retrieve(assistantId);
    } catch (error) {
      this.logger.error('Failed to retrieve assistant', { assistantId, error });
      throw new OpenAIError(
        'Failed to retrieve assistant',
        'ASSISTANT_RETRIEVAL_ERROR',
        undefined,
        error
      );
    }
  }

  async checkAllAssistants(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const [name, config] of Object.entries(ASSISTANT_CONFIG)) {
      try {
        await this.retrieveAssistant(config.ID);
        results[name] = true;
      } catch (error) {
        this.logger.error('Assistant check failed', { name, error });
        results[name] = false;
      }
    }

    return results;
  }
}