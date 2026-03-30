import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { media } from 'sanity-plugin-media';

export default defineConfig({
  name: 'default',
  title: 'dekolis.com',

  projectId: 'kigxwafh',
  dataset: 'production',

  plugins: [structureTool(), media()],

  schema: {
    types: schemaTypes,
  },
});
