export function formatLists(text: string): string {
  // Format numbered lists
  text = text.replace(/^\d+\.\s+(.+)$/gm, (_, content) => {
    return `<div class="pl-4 mb-3">• ${content}</div>`;
  });

  // Format bullet points
  text = text.replace(/^[-•]\s+(.+)$/gm, (_, content) => {
    return `<div class="pl-4 mb-3">• ${content}</div>`;
  });

  return text;
}