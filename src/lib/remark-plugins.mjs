import { visit } from 'unist-util-visit';

// 1. Custom SmartyPants (Dashes & Ellipses)
export function localSmartyPants() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      node.value = node.value
        .replace(/---/g, '\u2014') // em dash
        .replace(/--/g, '\u2013') // en dash
        .replace(/\.\.\./g, '\u2026'); // ellipsis
    });
  };
}

// 2. Custom Video Embedder (YouTube Example)
export function localEmbedder() {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      if (node.children.length !== 1 || node.children[0].type !== 'text') return;

      const text = node.children[0].value;
      const youtubeMatch = text.match(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );

      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        node.type = 'html';
        node.value = `
          <div class="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>`;
      }
    });
  };
}
