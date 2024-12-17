export interface AssistantConfig {
  ID: string;
  MODEL: string;
  SYSTEM_PROMPT: string;
}

export interface AssistantResponse {
  text: string;
  error?: string;
}

export interface AssistantMessage {
  role: 'assistant' | 'user';
  content: string;
}