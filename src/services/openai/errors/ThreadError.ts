import { OpenAIError } from './OpenAIError';

export class ThreadError extends OpenAIError {
  constructor(message: string, cause?: unknown) {
    super(message, undefined, undefined, cause);
    this.name = 'ThreadError';
  }
}