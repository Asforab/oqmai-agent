import { Logger } from './utils/Logger';
import { OpenAIError } from './errors/OpenAIError';
import { AgentOrchestrator } from './agents/AgentOrchestrator';
import type { AssistantResponse } from './types';

export class OpenAIService {
  private logger: Logger;
  private orchestrator: AgentOrchestrator;

  constructor() {
    this.logger = new Logger('OpenAIService');
    this.orchestrator = new AgentOrchestrator();
  }

  async generateResponse(message: string): Promise<AssistantResponse> {
    try {
      const response = await this.orchestrator.orchestrateConversation(message);
      return { text: response };
    } catch (error) {
      this.logger.error('Failed to generate response', { error });
      return {
        text: 'Desculpe, ocorreu um erro ao gerar a resposta.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async checkAssistantsStatus(): Promise<Record<string, boolean>> {
    try {
      return await this.orchestrator.getAgentStatuses();
    } catch (error) {
      this.logger.error('Failed to check assistants status', { error });
      throw new OpenAIError(
        'Failed to check assistants status',
        'ASSISTANT_STATUS_ERROR',
        undefined,
        error
      );
    }
  }
}