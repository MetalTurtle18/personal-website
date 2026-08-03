# lightbox Specification

## Purpose
TBD - created by archiving change add-image-grid-lightbox. Update Purpose after archive.
## Requirements
### Requirement: Lightbox Activation

The system SHALL open a lightbox when any image in article prose is clicked.

#### Scenario: Click standalone markdown image

- **GIVEN** an article with a standard markdown image `![alt](url)`
- **WHEN** user clicks the image
- **THEN** a lightbox dialog SHALL open displaying the image full-screen
- **AND** a dark backdrop SHALL overlay the page

#### Scenario: Click grid image

- **GIVEN** an article with a markdown image grid (adjacent `![alt](url)` lines rendered as a fixed-row grid)
- **WHEN** user clicks an image within the grid
- **THEN** the same lightbox dialog SHALL open with that image

### Requirement: Lightbox Navigation

The system SHALL support keyboard navigation between images on the page.

#### Scenario: Arrow key navigation

- **GIVEN** the lightbox is open
- **WHEN** user presses ArrowRight
- **THEN** the next image on the page SHALL be displayed
- **WHEN** user presses ArrowLeft
- **THEN** the previous image on the page SHALL be displayed

#### Scenario: Escape to close

- **GIVEN** the lightbox is open
- **WHEN** user presses Escape
- **THEN** the lightbox SHALL close
- **AND** focus SHALL return to the triggering image

#### Scenario: Backdrop click to close

- **GIVEN** the lightbox is open
- **WHEN** user clicks the backdrop (outside the image)
- **THEN** the lightbox SHALL close

### Requirement: Lightbox Captions

The system SHALL display image captions in the lightbox when available.

#### Scenario: Image with caption

- **GIVEN** the lightbox is open on an image with a caption
- **WHEN** the lightbox renders
- **THEN** the caption text SHALL display below the image

#### Scenario: Image without caption

- **GIVEN** the lightbox is open on an image without a caption
- **WHEN** the lightbox renders
- **THEN** no caption element SHALL be shown

### Requirement: Image Position Indicator

The system SHALL show the current image position among all page images.

#### Scenario: Position display

- **GIVEN** the lightbox is open
- **WHEN** viewing an image
- **THEN** a position indicator (e.g., "3 / 12") SHALL be visible
