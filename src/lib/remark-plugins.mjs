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

// 3. Custom Image Figures & Masonry Grids
export function localImageFigure() {
  return (tree) => {
    visit(tree, 'paragraph', (node, _index, parent) => {
      // Only transform top-level paragraphs
      if (parent.type !== 'root') return;

      // Filter out whitespace-only text nodes (e.g. spacing between inline images)
      const children = node.children.filter(
        (child) => !(child.type === 'text' && child.value.trim() === '')
      );
      if (children.length === 0) return;

      // Accept only pure-image paragraphs, optionally ending in a `[width]` text node
      const images = [];
      let width = null;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === 'image') {
          images.push(child);
          continue;
        }
        if (child.type === 'text' && images.length > 0 && !width && i === children.length - 1) {
          const match = child.value.trim().match(/^\[(\d+(?:\.\d+)?(?:%?))\]$/);
          if (match) {
            width = match[1].endsWith('%') ? match[1] : `${match[1]}px`;
            continue;
          }
        }
        // Any other content (text before images, links, emphasis, etc.) → leave untouched
        return;
      }

      if (images.length === 0) return;

      // Bare single image with no caption and no width → render exactly as before
      if (images.length === 1 && !images[0].title && !width) return;

      const escapeHtml = (value) =>
        value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');

      const buildContent = (img) => {
        const src = escapeHtml(img.url);
        const alt = escapeHtml(img.alt);
        const caption = img.title ? escapeHtml(img.title) : '';
        const dataCaption = caption ? ` data-caption="${caption}"` : '';
        const figcaption = caption ? `\n        <figcaption>${caption}</figcaption>\n      ` : '';
        return `        <img src="${src}" alt="${alt}"${dataCaption} />${figcaption}`;
      };

      if (images.length > 1) {
        const figures = images
          .map((img) => `      <figure class="image-figure">\n${buildContent(img)}\n      </figure>`)
          .join('\n');
        node.type = 'html';
        node.value = `<div class="image-grid">\n${figures}\n      </div>`;
      } else {
        const widthStyle = width ? ` style="max-width: ${escapeHtml(width)}"` : '';
        node.type = 'html';
        node.value = `<figure class="image-figure"${widthStyle}>\n      ${buildContent(images[0])}\n      </figure>`;
      }

      delete node.children;
      delete node.position;
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
