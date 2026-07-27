## MODIFIED Requirements

### Requirement: Blog Collection

The system SHALL provide a blog collection loaded from markdown and MDX files.

#### Scenario: Blog content loading

- **GIVEN** markdown or MDX files in src/content/blog/
- **WHEN** the site builds
- **THEN** files SHALL be loaded using glob loader matching `**/*.{md,mdx}`
- **AND** each file SHALL be validated against the content schema
- **AND** entries SHALL be queryable via getCollection('blog')

### Requirement: Projects Collection

The system SHALL provide a projects collection loaded from markdown and MDX files.

#### Scenario: Projects content loading

- **GIVEN** markdown or MDX files in src/content/projects/
- **WHEN** the site builds
- **THEN** files SHALL be loaded using glob loader matching `**/*.{md,mdx}`
- **AND** each file SHALL be validated against the content schema
- **AND** entries SHALL be queryable via getCollection('projects')
