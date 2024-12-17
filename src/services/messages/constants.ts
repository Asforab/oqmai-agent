export const ERROR_MESSAGES = {
  INVALID_ANNOTATION: 'Invalid annotation type',
  RETRIEVAL_FAILED: 'Failed to retrieve message',
  CITATION_FAILED: 'Failed to create citation',
  PROCESSING_FAILED: 'Failed to process message',
  EMPTY_CONTENT: 'Message content is empty',
} as const;

export const CITATION_FORMATS = {
  FILE_QUOTE: '[{index}] {quote} from {filename}',
  FILE_DOWNLOAD: '[{index}] Click <here> to download {filename}',
  FOOTNOTE: '[{index}]',
} as const;