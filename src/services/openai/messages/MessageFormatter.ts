import { Logger } from '../core/utils';
import { MessageContent, Citation } from './types';

export class MessageFormatter {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('MessageFormatter');
  }

  formatMessage(content: MessageContent, citations: Citation[]): string {
    try {
      let formattedContent = content.value;

      // Replace annotations with footnotes
      content.annotations.forEach((annotation, index) => {
        formattedContent = formattedContent.replace(
          annotation.text,
          `[${index}]`
        );
      });

      // Add citations as footnotes
      if (citations.length > 0) {
        formattedContent += '\n\n' + citations.map(citation => citation.text).join('\n');
      }

      return formattedContent;
    } catch (error) {
      this.logger.error('Failed to format message', { error });
      throw error;
    }
  }
}