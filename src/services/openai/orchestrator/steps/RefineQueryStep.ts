import { BaseStep } from './BaseStep';
import { ASSISTANT_CONFIG } from '../../config/assistants';

export class RefineQueryStep extends BaseStep {
  constructor() {
    super(ASSISTANT_CONFIG.REFINE_QUERY.ID, 'RefineQueryBot');
  }

  async execute(input: string): Promise<string> {
    return this.process(input);
  }
}