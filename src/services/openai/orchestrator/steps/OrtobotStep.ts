import { BaseStep } from './BaseStep';
import { ASSISTANT_CONFIG } from '../../config/assistants';

export class OrtobotStep extends BaseStep {
  constructor() {
    super(ASSISTANT_CONFIG.ORTOBOT.ID, 'Ortobot');
  }

  async execute(input: string): Promise<string> {
    return this.process(input);
  }
}