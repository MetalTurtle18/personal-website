import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pdfDocument',
  title: 'Document',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'File Name',
      type: 'string',
      description:
        'Used in the URL: /document/[name] — include the .pdf extension (e.g. poster.pdf)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-z0-9-]+\.pdf$/)
          .error(
            'Must be lowercase letters, numbers, or hyphens, ending in .pdf (e.g. poster.pdf)'
          ),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Human-readable label; for your reference only',
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
    },
  },
});
