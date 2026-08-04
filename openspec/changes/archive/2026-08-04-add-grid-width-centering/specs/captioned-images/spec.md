## MODIFIED Requirements

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

## ADDED Requirements

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
