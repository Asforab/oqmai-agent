export function cleanText(text: string): string {
  return text
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Normalize line breaks
    .replace(/\n\s*\n/g, '\n\n')
    // Remove leading/trailing whitespace
    .trim();
}