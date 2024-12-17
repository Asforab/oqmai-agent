export interface AssistantMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface AssistantResponse {
  text: string;
  error?: string;
}

export interface AssistantThread {
  id: string;
  messages: AssistantMessage[];
}

export interface AssistantRun {
  id: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  error?: {
    message: string;
  };
}