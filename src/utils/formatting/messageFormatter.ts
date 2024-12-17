import { formatHeadings } from './headingFormatter';
import { formatLists } from './listFormatter';
import { formatMarkdown } from './markdownFormatter';
import { formatParagraphs } from './paragraphFormatter';
import { cleanText } from './textCleaner';

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