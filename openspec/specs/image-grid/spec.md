# image-grid Specification

## Purpose
TBD - created by archiving change add-image-grid-lightbox. Update Purpose after archive.
## Requirements
### Requirement: Grid Layout Modes

The system SHALL provide an `<ImageGrid>` component supporting multiple layout modes.

#### Scenario: Two-column layout

- **WHEN** layout prop is `2col`
- **THEN** images SHALL render in two equal-width columns
- **AND** images SHALL maintain aspect ratio

#### Scenario: Three-column layout

- **WHEN** layout prop is `3col`
- **THEN** images SHALL render in three equal-width columns

#### Scenario: Four-column layout

- **WHEN** layout prop is `4col`
- **THEN** images SHALL render in four equal-width columns

#### Scenario: Masonry layout

- **WHEN** layout prop is `masonry`
- **THEN** images SHALL render in a staggered column layout using CSS columns

#### Scenario: Hero layout

- **WHEN** layout prop is `hero`
- **THEN** the first image SHALL occupy approximately 65% width
- **AND** remaining images SHALL stack vertically beside it

#### Scenario: 1-2 layout

- **WHEN** layout prop is `1-2`
- **THEN** the first image SHALL span full width
- **AND** remaining images SHALL render in two columns below

### Requirement: Responsive Grid Behavior

The system SHALL collapse grid layouts to single column on small screens.

#### Scenario: Mobile breakpoint

- **GIVEN** viewport width is 768px or less
- **WHEN** an ImageGrid renders
- **THEN** all layout modes SHALL collapse to single column
- **AND** images SHALL maintain full width

### Requirement: Image Captions

The system SHALL display optional captions beneath grid images.

#### Scenario: Caption present

- **GIVEN** an image with a caption prop
- **WHEN** the grid renders
- **THEN** the caption SHALL display below the image
- **AND** caption text SHALL be styled as small, muted text

#### Scenario: Caption absent

- **GIVEN** an image without a caption prop
- **WHEN** the grid renders
- **THEN** no caption element SHALL be rendered

### Requirement: Grid Image Sources

The system SHALL accept remote image URLs as grid image sources.

#### Scenario: Remote URL images

- **GIVEN** images array with remote URL strings
- **WHEN** the grid renders
- **THEN** each image SHALL render as an `<img>` tag with the provided src and alt

