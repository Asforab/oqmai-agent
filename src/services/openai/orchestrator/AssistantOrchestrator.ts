import { Logger } from '../utils/Logger';
import { AssistantResponse } from './types';
import { OrtobotStep } from './steps/OrtobotStep';
import { RefineQueryStep } from './steps/RefineQueryStep';
import { ValidationStep } from './steps/ValidationStep';

export class AssistantOrchestrator {
  private logger: Logger;
  private ortobotStep: OrtobotStep;
  private refineQueryStep: RefineQueryStep;
  private validationStep: ValidationStep;

  constructor() {
    this.logger = new Logger('AssistantOrchestrator');
    this.ortobotStep = new OrtobotStep();
    this.refineQueryStep = new RefineQueryStep();
    this.validationStep = new ValidationStep();
  }

  async orchestrateConversation(userMessage: string): Promise<AssistantResponse> {
    try {
      // 1. Initial Ortobot Processing
      const ortobotResponse = await this.ortobotStep.execute(userMessage);

      // 2. Query Refinement
      const refinedQuery = await this.refineQueryStep.execute(ortobotResponse);

      // 3. Final Ortobot Processing
      const ortobotFinalResponse = await this.ortobotStep.execute(refinedQuery);

      // 4. Validation
      const validatedResponse = await this.validationStep.execute(ortobotFinalResponse);

      return { text: validatedResponse };
    } catch (error) {
      this.logger.error('Orchestration error', { error });
      return {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }
}