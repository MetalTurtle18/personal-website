# Content Collections

## Purpose

Provide a type-safe content management system for blog posts and projects using Astro's Content Layer API, enabling markdown-based content with schema validation, featured content display, and responsive listing pages.

## Requirements

### Requirement: Content Schema Definition

The system SHALL define a shared schema for blog and projects collections using Zod validation.

#### Scenario: Schema validation

- **GIVEN** a content file with frontmatter
- **WHEN** the collection is loaded
- **THEN** frontmatter SHALL be validated against the schema
- **AND** required fields SHALL be enforced
- **AND** optional fields SHALL have default values

#### Scenario: Required fields

- **GIVEN** a new content file
- **WHEN** creating frontmatter
- **THEN** title SHALL be required as string
- **AND** description SHALL be required as string
- **AND** pubDate SHALL be required and coerced to Date type

#### Scenario: Optional date fields

- **GIVEN** a content file
- **WHEN** updateDate field is provided
- **THEN** updateDate SHALL be coerced to Date type
- **WHEN** chronoDate field is provided
- **THEN** chronoDate SHALL be coerced to Date type

#### Scenario: Optional fields with defaults

- **GIVEN** a content file
- **WHEN** author field is omitted
- **THEN** author SHALL default to "Dorian Kolis"
- **WHEN** featured field is omitted
- **THEN** featured SHALL default to false

#### Scenario: Optional fields without defaults

- **GIVEN** a content file
- **WHEN** summary field is omitted
- **THEN** summary SHALL be undefined
- **WHEN** image field is omitted
- **THEN** image SHALL be undefined

### Requirement: Blog Collection

The system SHALL provide a blog collection loaded from markdown files.

#### Scenario: Blog content loading

- **GIVEN** markdown files in src/content/blog/
- **WHEN** the site builds
- **THEN** files SHALL be loaded using glob loader
- **AND** each file SHALL be validated against the content schema
- **AND** entries SHALL be queryable via getCollection('blog')

### Requirement: Projects Collection

The system SHALL provide a projects collection loaded from markdown files.

#### Scenario: Projects content loading

- **GIVEN** markdown files in src/content/projects/
- **WHEN** the site builds
- **THEN** files SHALL be loaded using glob loader
- **AND** each file SHALL be validated against the content schema
- **AND** entries SHALL be queryable via getCollection('projects')

### Requirement: Navigation Component

The system SHALL provide site-wide navigation with active state detection.

#### Scenario: Navigation links

- **GIVEN** any page on the site
- **WHEN** the page renders
- **THEN** navigation SHALL display links to: Home (/), About (/about), Projects (/projects), Blog (/blog)
- **AND** the current page link SHALL be visually indicated as active

#### Scenario: Active state detection

- **GIVEN** user is on /blog or /blog/post-1
- **WHEN** navigation renders
- **THEN** Blog link SHALL have active styling
- **GIVEN** user is on the home page (/)
- **WHEN** navigation renders
- **THEN** only Home link SHALL have active styling

### Requirement: Content Card Component

The system SHALL provide a reusable card component for displaying content previews.

#### Scenario: Card display

- **GIVEN** a content entry (blog post or project)
- **WHEN** rendering in a listing page
- **THEN** card SHALL display title, description, formatted publication date
- **AND** card SHALL link to the full content page
- **AND** optional image SHALL be displayed if provided

#### Scenario: Card hover effects

- **GIVEN** a content card
- **WHEN** user hovers over the card
- **THEN** card SHALL display elevation shadow
- **AND** card SHALL translate upward slightly
- **AND** image SHALL scale slightly if present

### Requirement: Markdown Post Layout

The system SHALL provide a layout for rendering individual markdown posts and projects.

#### Scenario: Post header rendering

- **GIVEN** a blog post or project
- **WHEN** rendering the individual page
- **THEN** layout SHALL display title, summary (if provided), publication date, and author
- **AND** optional hero image SHALL be displayed if provided

#### Scenario: Summary display

- **GIVEN** a post with summary field
- **WHEN** rendering the post page
- **THEN** summary SHALL be displayed below the title
- **GIVEN** a post without summary field
- **WHEN** rendering the post page
- **THEN** no summary section SHALL be shown

#### Scenario: Markdown prose styling

- **GIVEN** markdown content
- **WHEN** rendered in the layout
- **THEN** content SHALL have proper typography styling
- **AND** headings, paragraphs, lists, code blocks, and links SHALL be styled consistently

### Requirement: Blog Listing Page

The system SHALL provide a listing page displaying all blog posts.

#### Scenario: Blog posts display

- **GIVEN** blog posts exist in the collection
- **WHEN** user visits /blog
- **THEN** all posts SHALL be displayed as cards
- **AND** posts SHALL be sorted by publication date (newest first)

#### Scenario: Empty state

- **GIVEN** no blog posts exist
- **WHEN** user visits /blog
- **THEN** an empty state message SHALL be displayed

### Requirement: Blog Dynamic Routes

The system SHALL generate individual pages for each blog post.

#### Scenario: Blog post page generation

- **GIVEN** a blog post with id "post-1"
- **WHEN** site builds
- **THEN** a page SHALL be generated at /blog/post-1
- **AND** the page SHALL render using MarkdownPost layout
- **AND** markdown content SHALL be rendered as HTML

#### Scenario: Non-existent post

- **GIVEN** a request for a non-existent blog slug
- **WHEN** page renders
- **THEN** user SHALL be redirected to /404

### Requirement: Projects Listing Page

The system SHALL provide a listing page displaying all projects.

#### Scenario: Projects display

- **GIVEN** projects exist in the collection
- **WHEN** user visits /projects
- **THEN** all projects SHALL be displayed as cards
- **AND** projects SHALL be sorted by publication date (newest first)

#### Scenario: Empty state

- **GIVEN** no projects exist
- **WHEN** user visits /projects
- **THEN** an empty state message SHALL be displayed

### Requirement: Projects Dynamic Routes

The system SHALL generate individual pages for each project.

#### Scenario: Project page generation

- **GIVEN** a project with id "example-project"
- **WHEN** site builds
- **THEN** a page SHALL be generated at /projects/example-project
- **AND** the page SHALL render using MarkdownPost layout
- **AND** markdown content SHALL be rendered as HTML

#### Scenario: Non-existent project

- **GIVEN** a request for a non-existent project slug
- **WHEN** page renders
- **THEN** user SHALL be redirected to /404

### Requirement: Featured Content on Home Page

The system SHALL display featured blog posts and projects on the home page.

#### Scenario: Featured projects display

- **GIVEN** projects marked with featured: true
- **WHEN** home page renders
- **THEN** up to 3 featured projects SHALL be displayed
- **AND** projects SHALL be sorted by publication date (newest first)
- **AND** a "View all projects →" link SHALL be provided

#### Scenario: Featured posts display

- **GIVEN** blog posts marked with featured: true
- **WHEN** home page renders
- **THEN** up to 3 featured posts SHALL be displayed
- **AND** posts SHALL be sorted by publication date (newest first)
- **AND** a "View all posts →" link SHALL be provided

#### Scenario: No featured content

- **GIVEN** no content is marked as featured
- **WHEN** home page renders
- **THEN** featured sections SHALL not be displayed

### Requirement: Responsive Design

The system SHALL provide responsive layouts for mobile and desktop devices.

#### Scenario: Mobile navigation

- **GIVEN** user on mobile device (< 600px width)
- **WHEN** navigation renders
- **THEN** navigation links SHALL adjust spacing and sizing
- **AND** links SHALL wrap to multiple rows if needed

#### Scenario: Mobile content grid

- **GIVEN** user on mobile device (< 768px width)
- **WHEN** viewing blog or projects listing
- **THEN** content cards SHALL display in single column layout
- **AND** font sizes SHALL adjust for readability

## Technical Details

### File Locations

- Collections config: `src/content.config.ts`
- Blog content: `src/content/blog/*.md`
- Projects content: `src/content/projects/*.md`
- Navigation: `src/components/Navigation.astro`
- Content card: `src/components/ContentCard.astro`
- Markdown layout: `src/layouts/MarkdownPost.astro`
- Blog routes: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`
- Projects routes: `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`

### Content Schema

```typescript
{
  title: string
  description: string
  summary?: string
  pubDate: Date (coerced)
  updateDate?: Date (coerced)
  chronoDate?: string
  author: string (default: "Dorian Kolis")
  featured: boolean (default: false)
  image?: { url: string, alt: string }
}
```

### Astro 5.x Content Layer API

- Uses `glob()` loader from 'astro/loaders'
- Uses `render()` function from 'astro:content' to render markdown
- Returns `<Content />` component for rendering body

## Removed Features

Tag-based filtering and navigation were removed from the implementation. This includes:

- No tags field in content schema
- No TagList component
- No tag filtering sections on listing pages
- No tag-based route pages (blog/tags/[tag].astro, projects/tags/[tag].astro were not created)
