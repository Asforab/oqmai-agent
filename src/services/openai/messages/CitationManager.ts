import { openai } from '../core/OpenAIClient';
import { OpenAIError } from '../core/errors';
import { Logger } from '../core/utils';
import { MessageAnnotation, Citation } from './types';

export class CitationManager {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('CitationManager');
  }

  async processCitations(annotations: MessageAnnotation[]): Promise<Citation[]> {
    try {
      return await Promise.all(
        annotations.map((annotation, index) => this.createCitation(annotation, index))
      );
    } catch (error) {
      this.logger.error('Failed to process citations', { error });
      throw new OpenAIError(
        'Failed to process citations',
        'CITATION_PROCESSING_ERROR',
        undefined,
        error
      );
    }
  }

  private async createCitation(annotation: MessageAnnotation, index: number): Promise<Citation> {
    try {
      if (annotation.file_citation) {
        const citedFile = await openai.files.retrieve(annotation.file_citation.file_id);
        return {
          index,
          text: `[${index}] ${annotation.file_citation.quote} from ${citedFile.filename}`
        };
      }

      if (annotation.file_path) {
        const citedFile = await openai.files.retrieve(annotation.file_path.file_id);
        return {
          index,
          text: `[${index}] Click <here> to download ${citedFile.filename}`
        };
      }

      throw new OpenAIError('Invalid annotation type', 'INVALID_ANNOTATION_ERROR');
    } catch (error) {
      this.logger.error('Failed to create citation', { error, annotation });
      throw error;
    }
  }
}