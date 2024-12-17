import { BaseStep } from './BaseStep';
import { ASSISTANT_CONFIG } from '../../config/assistants';

export class ValidationStep extends BaseStep {
  constructor() {
    super(ASSISTANT_CONFIG.VALIDATION.ID, 'ValidationBot');
  }

  async execute(input: string): Promise<string> {
    return this.process(input);
  }
}