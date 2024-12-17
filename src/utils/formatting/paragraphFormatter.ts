export function formatParagraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .filter(paragraph => paragraph.trim())
    .map(paragraph => {
      // Skip if already wrapped in HTML
      if (paragraph.startsWith('<')) return paragraph;
      
      return `<div class="mb-4 text-gray-200 leading-[1.8]">${paragraph}</div>`;
    })
    .join('\n');
}