export function getDefaultTitle(): string {
  return 'Nova Conversa';
}

export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

export function generateTitleFromMessage(text: string): string {
  // Remove special characters and extra spaces
  const cleanText = text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Get first sentence or first N words
  const firstSentence = cleanText.split(/[.!?]/)[0];
  const words = firstSentence.split(' ');
  
  if (words.length <= 4) {
    return truncateText(firstSentence);
  }
  
  // Get first 4 meaningful words (longer than 2 characters)
  const meaningfulWords = words
    .filter(word => word.length > 2)
    .slice(0, 4)
    .join(' ');
    
  return truncateText(meaningfulWords);
}