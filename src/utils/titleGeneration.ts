import { Message } from '../types/chat';

// Keywords related to orthopedics and traumatology
const MEDICAL_KEYWORDS = {
  anatomical: [
    'joelho', 'quadril', 'ombro', 'coluna', 'tornozelo', 'pé', 'mão', 'punho', 'cotovelo',
    'vertebra', 'menisco', 'ligamento', 'tendão', 'músculo', 'osso', 'articulação'
  ],
  conditions: [
    'fratura', 'luxação', 'entorse', 'lesão', 'artrose', 'artrite', 'tendinite',
    'ruptura', 'síndrome', 'inflamação', 'dor'
  ],
  procedures: [
    'cirurgia', 'artroplastia', 'artroscopia', 'fixação', 'redução', 'imobilização',
    'tratamento', 'reabilitação', 'prótese'
  ]
};

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

function extractMainTopic(messages: Message[]): string {
  // Get all keywords from user messages
  const allKeywords = messages
    .filter(msg => msg.isUser)
    .map(msg => findKeywords(msg.text))
    .flat();

  // Count keyword frequency
  const keywordCount = allKeywords.reduce((acc, keyword) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency and get top keywords
  const topKeywords = Object.entries(keywordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([keyword]) => keyword);

  return topKeywords;
}

function formatTitle(keywords: string[]): string {
  if (keywords.length === 0) return 'Nova Conversa';
  
  // Capitalize first letter of each word
  const formattedKeywords = keywords.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  );
  
  return formattedKeywords.join(' - ');
}

export function generateTitle(messages: Message[]): string {
  if (messages.length === 0) return 'Nova Conversa';
  
  const mainTopics = extractMainTopic(messages);
  return formatTitle(mainTopics);
}