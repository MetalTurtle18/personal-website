## ADDED Requirements

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

The system SHALL apply an optional width to a standalone captioned image using a trailing bracket.

#### Scenario: Pixel width

- **GIVEN** a markdown image with a trailing `[400]`
- **WHEN** the article renders
- **THEN** the figure SHALL have `max-width: 400px` applied

#### Scenario: Percentage width

- **GIVEN** a markdown image with a trailing `[50%]`
- **WHEN** the article renders
- **THEN** the figure SHALL have `max-width: 50%` applied

#### Scenario: Width ignored in grids

- **GIVEN** a grid of adjacent images where one has a trailing width bracket
- **WHEN** the article renders
- **THEN** the width bracket SHALL be consumed and ignored in the grid layout

### Requirement: Adjacent Image Grids

The system SHALL render two or more adjacent image lines (no blank line between) as a masonry image grid.

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
