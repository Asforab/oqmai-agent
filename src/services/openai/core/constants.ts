export const ERROR_CODES = {
  CONFIGURATION: 'CONFIGURATION_ERROR',
  ASSISTANT: 'ASSISTANT_ERROR',
  THREAD: 'THREAD_ERROR',
  MESSAGE: 'MESSAGE_ERROR',
  ORCHESTRATION: 'ORCHESTRATION_ERROR',
  VALIDATION: 'VALIDATION_ERROR'
} as const;

export const ERROR_MESSAGES = {
  INVALID_CONFIG: 'Invalid OpenAI configuration',
  ASSISTANT_CONFIG_FAILED: 'Failed to configure assistant',
  THREAD_CREATE_FAILED: 'Failed to create thread',
  MESSAGE_PROCESS_FAILED: 'Failed to process message',
  ORCHESTRATION_FAILED: 'Failed to orchestrate conversation',
  VALIDATION_FAILED: 'Failed to validate response'
} as const;

export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  DELAY_MS: 1000,
  BACKOFF_FACTOR: 1.5
} as const;