# captioned-images Specification

## Purpose
TBD - created by archiving change unify-image-grids. Update Purpose after archive.
## Requirements
### Requirement: Captioned Figure Rendering

The system SHALL render a single markdown image with a title attribute as a `<figure>` element with a caption.

#### Scenario: Image with caption

- **GIVEN** a markdown image with a title attribute `![alt](url "caption")`
- **WHEN** the article renders
- **THEN** the image SHALL render as a `<figure>` containing an `<img>` and `<figcaption>`
- **AND** the `<img>` SHALL carry a `data-caption` attribute set to the caption

#### Scenario: Image without caption

- **GIVEN** a markdown image without a title attribute `![alt](url)`
- **WHEN** the article renders
- **THEN** no `<figure>` or `<figcaption>` SHALL be generated
- **AND** the image SHALL render exactly as a plain markdown image

### Requirement: Image Width Control

The system SHALL apply an optional width to a captioned image or image grid using a trailing bracket.

#### Scenario: Pixel width

- **GIVEN** a markdown image with a trailing `[400]`
- **WHEN** the article renders
- **THEN** the figure SHALL have `max-width: 400px` applied

#### Scenario: Percentage width

- **GIVEN** a markdown image with a trailing `[50%]`
- **WHEN** the article renders
- **THEN** the figure SHALL have `max-width: 50%` applied

#### Scenario: Grid width

- **GIVEN** an image grid whose first image line has a trailing width bracket
- **WHEN** the article renders
- **THEN** the `.image-grid` container SHALL have that `max-width` applied

#### Scenario: Bracket after non-first grid image

- **GIVEN** an image grid where a width bracket follows a non-first image line
- **WHEN** the article renders
- **THEN** the bracket SHALL be consumed and ignored, and the grid SHALL render at full width

### Requirement: Adjacent Image Grids

The system SHALL render two or more adjacent image lines (no blank line between) as a fixed-row image grid.

#### Scenario: Adjacent images become grid

- **GIVEN** two or more image lines with no blank line between them
- **WHEN** the article renders
- **THEN** the images SHALL render inside a `<div class="image-grid">`
- **AND** each image SHALL be wrapped in its own `<figure>`

#### Scenario: Separated images remain separate

- **GIVEN** image lines separated by a blank line
- **WHEN** the article renders
- **THEN** each image SHALL render as its own standalone figure, not a grid

### Requirement: Bare Image Preservation

The system SHALL leave bare single images unchanged.

#### Scenario: Bare image renders as today

- **GIVEN** a single image with no caption and no width
- **WHEN** the article renders
- **THEN** the image SHALL render identically to standard markdown image rendering
- **AND** the image SHALL remain clickable to open the lightbox

### Requirement: Responsive Grid Columns

The system SHALL render image grids with a fluid number of columns based on container width.

#### Scenario: Desktop columns

- **GIVEN** a container width of approximately 750px
- **WHEN** an image grid renders
- **THEN** approximately three columns SHALL be displayed

#### Scenario: Mobile single column

- **GIVEN** a narrow mobile container
- **WHEN** an image grid renders
- **THEN** images SHALL stack in a single column

### Requirement: Figure and Grid Centering

The system SHALL center standalone figures and image-grid containers within the content pane.

#### Scenario: Width-limited standalone figure centered

- **GIVEN** a standalone figure with a width applied via a trailing bracket
- **WHEN** the article renders
- **THEN** the figure SHALL be horizontally centered in the content pane

#### Scenario: Width-limited grid centered

- **GIVEN** an image grid with a width applied via its first image's bracket
- **WHEN** the article renders
- **THEN** the `.image-grid` container SHALL be horizontally centered

#### Scenario: Full-width items unaffected

- **GIVEN** a figure or grid at full content width
- **WHEN** the article renders
- **THEN** it SHALL span the full content pane width, appearing centered

