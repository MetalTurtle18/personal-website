import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contentImage',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'File Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Human-readable label; for your reference only',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        accept:
          'image/jpg,image/png,image/gif,image/svg+xml,image/webp,image/tiff,image/vnd.adobe.photoshop,image/',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
      media: 'image',
    },
  },
});
