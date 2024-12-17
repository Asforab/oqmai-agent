import { marked } from 'marked';

interface FormattingOptions {
  removeHtml?: boolean;
  useMarkdown?: boolean;
  useLists?: boolean;
}

export function formatText(text: string, options: FormattingOptions = {}): string {
  const {
    removeHtml = true,
    useMarkdown = true,
    useLists = true,
  } = options;

  // Remove HTML tags if specified
  let formattedText = removeHtml ? 
    text.replace(/<[^>]*>/g, '') : text;

  // Remove extra whitespace and line breaks
  formattedText = formattedText
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Convert numbered lists to markdown format if specified
  if (useLists) {
    formattedText = formattedText.replace(
      /(\d+)[.)]?\s+([^\n]+)/g,
      (_, number, content) => `${number}. ${content.trim()}`
    );
  }

  // Convert to markdown if specified
  if (useMarkdown) {
    const renderer = new marked.Renderer();
    
    renderer.paragraph = (text) => text + '\n\n';
    renderer.list = (body, ordered) => {
      const items = body
        .split('\n')
        .filter(item => item.trim())
        .map(item => item.trim())
        .join('\n');
      return ordered ? items : items.replace(/^\*/gm, '•');
    };

    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true,
    });

    formattedText = marked(formattedText);
  }

  return formattedText.trim();
}