import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: 'media',
      title: 'Média (Hangtár / Videótár)',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Keresőbarát link (Slug)',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Szerző',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Borítókép',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternatív szöveg (Alt)',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Kategóriák',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Közzététel ideje',
      type: 'datetime',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audiofájl hivatkozás',
      type: 'url',
      fieldset: 'media',
      description: 'Mária Rádió MP3 fájl közvetlen címe.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Videó hivatkozás vagy beágyazó URL',
      type: 'url',
      fieldset: 'media',
      description: 'Mediaklikk beágyazó URL, YouTube hivatkozás vagy közvetlen videófájl link.',
    }),
    defineField({
      name: 'body',
      title: 'Tartalom leírása',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      hasAudio: 'audioUrl',
      hasVideo: 'videoUrl',
    },
    prepare({ title, author, media, hasAudio, hasVideo }) {
      const badges = [hasAudio && 'Hang', hasVideo && 'Videó'].filter(Boolean).join(' + ')
      const subtitle = [author ? `by ${author}` : null, badges ? `[${badges}]` : null]
        .filter(Boolean)
        .join(' ')

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})