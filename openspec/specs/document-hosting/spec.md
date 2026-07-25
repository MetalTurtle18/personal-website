# document-hosting Specification

## Purpose

Serve downloadable documents (PDFs) via a static proxy route backed by Cloudflare R2, and reference externally hosted images from an R2 public bucket instead of a CMS or third-party CDN.

## Requirements

### Requirement: Static Document Proxy Route

The system SHALL serve downloadable documents (e.g. PDFs) at `/document/<slug>` by proxying bytes
from a Cloudflare R2 bucket, using a static, git-tracked slug-to-object-key mapping instead of a
CMS query. Adding a new document SHALL require only an upload to the bucket and a one-line
addition to the mapping file, with no CMS/backend dependency.

#### Scenario: Existing document remains reachable

- **WHEN** a client requests `/document/meta-mesa-poster.pdf`
- **THEN** the system SHALL stream the corresponding PDF bytes from the configured R2 object
- **AND** the response SHALL include `Content-Type: application/pdf` and an immutable, long-lived
  `Cache-Control` header

#### Scenario: Unmapped slug

- **WHEN** a client requests a `/document/<slug>` path with no matching entry in the mapping
- **THEN** the route SHALL NOT be statically generated and SHALL 404

### Requirement: Externally Hosted Images via Object Storage

The system SHALL reference images used in pages and content collections via URLs pointing at a
Cloudflare R2 public bucket, allow-listed in Astro's `image.domains` configuration, rather than
Cloudinary or Sanity's asset CDN.

#### Scenario: Image domain allow-list

- **WHEN** Astro builds a page containing a remote image from the R2 public bucket
- **THEN** the build SHALL succeed because the R2 hostname is present in `astro.config.mjs`
  `image.domains`
- **AND** no `cdn.sanity.io` or `res.cloudinary.com` domains SHALL remain in the configuration
