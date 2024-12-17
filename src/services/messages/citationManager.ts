import OpenAI from 'openai';
import { MessageAnnotation, Citation } from './types';
import { MessageError } from './errors/MessageError';
import { validateAnnotation } from './utils/validation';
import { formatCitationText } from './utils/formatting';
import { ERROR_MESSAGES, CITATION_FORMATS } from './constants';

export class CitationManager {
  constructor(private client: OpenAI) {}

  async createCitation(annotation: MessageAnnotation, index: number): Promise<Citation> {
    try {
      validateAnnotation(annotation);

      if (annotation.file_citation) {
        const citedFile = await this.client.files.retrieve(annotation.file_citation.file_id);
        return {
          index,
          text: formatCitationText(CITATION_FORMATS.FILE_QUOTE, {
            index,
            quote: annotation.file_citation.quote,
            filename: citedFile.filename
          })
        };
      }

      if (annotation.file_path) {
        const citedFile = await this.client.files.retrieve(annotation.file_path.file_id);
        return {
          index,
          text: formatCitationText(CITATION_FORMATS.FILE_DOWNLOAD, {
            index,
            filename: citedFile.filename
          })
        };
      }

      throw new MessageError(
        ERROR_MESSAGES.INVALID_ANNOTATION,
        'INVALID_ANNOTATION'
      );
    } catch (error) {
      throw new MessageError(
        ERROR_MESSAGES.CITATION_FAILED,
        'CITATION_ERROR',
        error
      );
    }
  }
}