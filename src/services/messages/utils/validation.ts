import { MessageContent, MessageAnnotation } from '../types';

export function validateMessageContent(content: MessageContent): void {
  if (!content.value) {
    throw new Error('Message content is empty');
  }
  
  if (!Array.isArray(content.annotations)) {
    throw new Error('Invalid annotations format');
  }
}

export function validateAnnotation(annotation: MessageAnnotation): void {
  if (!annotation.text) {
    throw new Error('Annotation text is missing');
  }
  
  if (annotation.file_citation && !annotation.file_citation.file_id) {
    throw new Error('File citation is missing file ID');
  }
  
  if (annotation.file_path && !annotation.file_path.file_id) {
    throw new Error('File path is missing file ID');
  }
}