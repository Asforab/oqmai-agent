export interface AssistantStatusResult {
  id: string;
  name: string;
  status: 'online' | 'offline';
  error?: string;
  model?: string;
  tools?: string[];
}

export interface AssistantStatusResponse {
  results: AssistantStatusResult[];
  timestamp: number;
  error?: string;
}