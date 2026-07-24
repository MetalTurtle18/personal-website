// Public Cloudflare R2 bucket base URL. No secrets required — the bucket's R2.dev
// subdomain is public-read only, matching the previous Sanity CDN behavior.
export const R2_PUBLIC_BASE_URL = 'https://pub-b4dd4c83828943eea64a20017fbacce7.r2.dev';

export interface DocumentEntry {
  /** URL slug served at /document/<slug> */
  slug: string;
  /** Object key within the R2 bucket */
  r2Key: string;
}

/**
 * Static slug -> R2 object key mapping for the /document/[slug] proxy route.
 * To add a new document: upload it to the R2 bucket, then add an entry here.
 */
export const documents: DocumentEntry[] = [
  { slug: 'meta-mesa-poster.pdf', r2Key: 'meta-mesa-poster.pdf' },
];
