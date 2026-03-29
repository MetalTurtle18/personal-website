import type { APIRoute, GetStaticPaths } from 'astro';
import { sanityClient } from 'sanity:client';

interface SanityPdfDocument {
  name: string;
  fileUrl: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const documents: SanityPdfDocument[] = await sanityClient.fetch(
      `*[_type == "pdfDocument" && defined(file.asset)]{
        name,
        "fileUrl": file.asset->url
      }`
    );

    return documents.map((doc) => ({
      params: { slug: doc.name },
      props: { fileUrl: doc.fileUrl },
    }));
  } catch (error) {
    // Sanity is not configured yet or unreachable — no document routes generated.
    console.warn(
      '[document] Could not fetch from Sanity. No /document/* routes will be generated.',
      error instanceof Error ? error.message : error
    );
    return [];
  }
};

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(props.fileUrl as string);

  if (!response.ok) {
    return new Response('Document not found', { status: 404 });
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
