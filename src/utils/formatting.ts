import { Message } from '../types/chat';

export function formatMessageWithStructure(text: string): string {
  // Split text into paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  // Process each paragraph
  return paragraphs.map(paragraph => {
    // Handle numbered lists
    if (/^\d+\.\s/.test(paragraph)) {
      return `<div class="pl-4 space-y-2">${paragraph}</div>`;
    }
    
    // Handle bullet points
    if (/^[-•]\s/.test(paragraph)) {
      return `<div class="pl-4 space-y-2">${paragraph}</div>`;
    }
    
    // Handle headers
    if (/^(#{1,3})\s/.test(paragraph)) {
      const level = paragraph.match(/^(#{1,3})\s/)?.[1].length || 1;
      const text = paragraph.replace(/^#{1,3}\s/, '');
      const className = level === 1 ? 'text-xl font-bold text-orange-500 mb-4' :
                       level === 2 ? 'text-lg font-semibold text-orange-500 mb-3' :
                                   'text-base font-medium text-orange-500 mb-2';
      return `<div class="${className}">${text}</div>`;
    }
    
    // Handle emphasis
    paragraph = paragraph.replace(/\*\*([^*]+)\*\*/g, '<span class="text-orange-500 font-semibold">$1</span>');
    
    // Regular paragraph
    return `<div class="mb-4">${paragraph}</div>`;
  }).join('\n');
}