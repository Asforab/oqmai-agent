import { marked } from 'marked';

export function createMarkdownRenderer() {
  const renderer = new marked.Renderer();
  
  renderer.heading = (text, level) => {
    const className = level === 1 ? 'text-xl font-bold text-orange-500 mb-4' :
                     level === 2 ? 'text-lg font-semibold text-orange-500 mb-3' :
                                 'text-base font-medium text-orange-500 mb-2';
    return `<div class="${className}">${text}</div>`;
  };

  renderer.list = (body, ordered) => {
    const type = ordered ? 'ol' : 'ul';
    return `<${type} class="pl-4 space-y-2 mb-4">${body}</${type}>`;
  };

  renderer.listitem = (text) => {
    return `<li class="text-white leading-relaxed">${text}</li>`;
  };

  renderer.paragraph = (text) => {
    return `<div class="mb-4 text-white leading-relaxed">${text}</div>`;
  };

  renderer.strong = (text) => {
    return `<span class="font-semibold text-orange-500">${text}</span>`;
  };

  return renderer;
}