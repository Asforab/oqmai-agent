import { Message } from '../../types/chat';

export interface MessageAnnotation {
  text: string;
  file_citation?: {
    file_id: string;
    quote: string;
  };
  file_path?: {
    file_id: string;
  };
}

export interface MessageContent {
  value: string;
  annotations: MessageAnnotation[];
}

export interface Citation {
  index: number;
  text: string;
}