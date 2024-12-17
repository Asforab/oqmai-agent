export function formatMarkdown(text: string): string {
  // Format bold text
  text = text.replace(/\*\*(.*?)\*\*/g, (_, content) => 
    `<strong class="text-white font-bold">${content}</strong>`
  );

  // Format italic text
  text = text.replace(/\*(.*?)\*/g, (_, content) => 
    `<em class="text-gray-300">${content}</em>`
  );

  return text;
}