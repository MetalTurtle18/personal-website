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

// 2. Auto-set lightbox ids for groups of images
export function lightboxIndexer() {
  return (tree) => {
    // Make a new 6-digit hex id
    const newLightboxId = () => Math.floor(Math.random() * 0xffffff).toString(16);
    let currentLightboxId = newLightboxId();
    let figureCounter = 1;
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'ImageGrid') {
        // For a new ImageGrid, we know the next n figures belong to the same group, which n is the number of children of this grid
        figureCounter = node.children.length;
        currentLightboxId =
          node.attributes.filter((a) => a.name === 'lightbox')[0]?.value ?? newLightboxId(); // If the user has a lightbox id on a group, use that for all the children of the group
      } else if (node.name === 'Figure' && figureCounter == 0) {
        // Otherwise, we are either in a figure that is part of a group, or, if the counter has reacher zero, we must be in a new independent figure
        figureCounter = 1;
        currentLightboxId = newLightboxId();
      }
      if (node.name === 'Figure') {
        figureCounter--;
        node.attributes = node.attributes || [];
        if (!node.attributes.some((a) => a.name === 'lightbox'))
          // Avoid overwriting the id if the user specified one manually
          node.attributes.push({
            type: 'mdxJsxAttribute',
            name: 'lightbox',
            value: currentLightboxId,
          });
      }
    });
  };
}

// 3. Custom Video Embedder (YouTube Example)
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
