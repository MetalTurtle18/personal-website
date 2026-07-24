import type { APIRoute, GetStaticPaths } from 'astro';
import { documents, R2_PUBLIC_BASE_URL } from '../../data/documents';

export const getStaticPaths: GetStaticPaths = async () => {
  return documents.map((doc) => ({
    params: { slug: doc.slug },
    props: { fileUrl: `${R2_PUBLIC_BASE_URL}/${doc.r2Key}` },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(props.fileUrl as string);

  if (!response.ok) {
    return new Response('Document not found', { status: 404 });
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'application/pdf',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
