import { MessageContent, Citation } from './types';
import { formatFootnote } from './utils/formatting';

export class MessageFormatter {
  formatMessage(content: MessageContent, citations: Citation[]): string {
    let formattedContent = content.value;

    // Replace annotations with footnotes
    content.annotations.forEach((annotation, index) => {
      formattedContent = formattedContent.replace(
        annotation.text,
        formatFootnote(index)
      );
    });

    // Add citations as footnotes
    if (citations.length > 0) {
      formattedContent += '\n\n' + citations.map(citation => citation.text).join('\n');
    }

    return formattedContent;
  }
}