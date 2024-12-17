import { openai } from '../client';
import { Logger } from '../core/utils/Logger';
import { ASSISTANT_CONFIG } from '../config';

export class AssistantStatusChecker {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('AssistantStatusChecker');
  }

  async checkAssistantStatus(assistantId: string): Promise<boolean> {
    try {
      const assistant = await openai.beta.assistants.retrieve(assistantId);
      this.logger.info('Assistant status checked', {
        id: assistant.id,
        model: assistant.model
      });
      return true;
    } catch (error) {
      this.logger.error('Assistant check failed', { assistantId, error });
      return false;
    }
  }

  async checkAllAssistants(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    
    for (const [name, config] of Object.entries(ASSISTANT_CONFIG)) {
      results[name] = await this.checkAssistantStatus(config.ID);
    }

    return results;
  }
}