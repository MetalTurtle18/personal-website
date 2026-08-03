## MODIFIED Requirements

### Requirement: Lightbox Activation

The system SHALL open a lightbox when any image in article prose is clicked.

#### Scenario: Click standalone markdown image

- **GIVEN** an article with a standard markdown image `![alt](url)`
- **WHEN** user clicks the image
- **THEN** a lightbox dialog SHALL open displaying the image full-screen
- **AND** a dark backdrop SHALL overlay the page

#### Scenario: Click grid image

- **GIVEN** an article with a markdown image grid (adjacent `![alt](url)` lines rendered as a masonry grid)
- **WHEN** user clicks an image within the grid
- **THEN** the same lightbox dialog SHALL open with that image
