export class ChatError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'ChatError';
  }
}

export class ThreadError extends ChatError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = 'ThreadError';
  }
}

export class AssistantError extends ChatError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = 'AssistantError';
  }
}