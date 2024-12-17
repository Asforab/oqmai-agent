import { Message } from '../../types/chat';
import { MEDICAL_KEYWORDS } from './constants';

function findKeywords(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const keywords = new Set<string>();
  
  for (const word of words) {
    for (const category of Object.values(MEDICAL_KEYWORDS)) {
      if (category.some(keyword => word.includes(keyword))) {
        keywords.add(word);
      }
    }
  }
  
  return Array.from(keywords);
}

function extractMainTopic(messages: Message[]): string[] {
  const allKeywords = messages
    .filter(msg => msg.isUser)
    .map(msg => findKeywords(msg.text))
    .flat();

  const keywordCount = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(keywordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([keyword]) => keyword);
}

function formatTitle(keywords: string[]): string {
  if (keywords.length === 0) return 'Nova Conversa';
  
  return keywords
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' - ');
}

export function generateTitle(messages: Message[]): string {
  if (messages.length === 0) return 'Nova Conversa';
  
  const mainTopics = extractMainTopic(messages);
  return formatTitle(mainTopics);
}