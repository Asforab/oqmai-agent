export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function getDefaultTitle(): string {
  return 'Nova Conversa';
}