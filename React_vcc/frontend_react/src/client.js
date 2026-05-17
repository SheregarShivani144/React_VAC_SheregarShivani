import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID?.trim();
const token = process.env.REACT_APP_SANITY_TOKEN?.trim();
const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

let client;
let builder;

if (isSanityConfigured) {
  client = sanityClient({
    projectId,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token,
  });

  builder = imageUrlBuilder(client);
} else {
  // Fallback client when Sanity is not configured.
  client = {
    fetch: () => Promise.resolve([]),
    create: () => Promise.reject(new Error('Sanity is not configured. Message sending is disabled.')),
  };
  builder = null;
  console.warn(
    'Sanity is not configured properly. Set REACT_APP_SANITY_PROJECT_ID and REACT_APP_SANITY_TOKEN in .env.local.',
  );
}

export { client };

export const urlFor = (source) => {
  if (!builder || !source) return '';
  return builder.image(source);
};
