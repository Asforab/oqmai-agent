export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
}

export interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing?: boolean;
}