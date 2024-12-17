export * from './headingFormatter';
export * from './listFormatter';
export * from './markdownFormatter';
export * from './paragraphFormatter';
export * from './textCleaner';

export function formatMessageWithStructure(text: string): string {
  // Clean the text first
  let formattedText = cleanText(text);
  
  // Process through each formatter in sequence
  formattedText = formatHeadings(formattedText);
  formattedText = formatLists(formattedText);
  formattedText = formatMarkdown(formattedText);
  formattedText = formatParagraphs(formattedText);
  
  return formattedText;
}