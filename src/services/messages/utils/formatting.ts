import { CITATION_FORMATS } from '../constants';

export function formatCitationText(template: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}

export function formatFootnote(index: number): string {
  return formatCitationText(CITATION_FORMATS.FOOTNOTE, { index });
}