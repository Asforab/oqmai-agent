export function formatHeadings(text: string): string {
  return text.replace(/^(#{1,3})\s+(.*)$/gm, (_, level, content) => {
    const headingLevel = level.length;
    const className = headingLevel === 1 ? 'text-xl font-bold text-orange-500 mb-4' :
                     headingLevel === 2 ? 'text-lg font-semibold text-orange-500 mb-3' :
                                        'text-base font-medium text-orange-500 mb-2';
    return `<div class="${className}">${content}</div>`;
  });
}