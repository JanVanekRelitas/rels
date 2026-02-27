/**
 * API proxy for registry lookups.
 * Forwards requests to Firebase Cloud Functions.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const path = getRouterParam(event, 'path');
  const query = getQuery(event);

  // In production, proxy to Cloud Functions URL
  // In dev, proxy to Firebase emulator
  const baseUrl = import.meta.dev
    ? 'http://localhost:5001/rels-app/europe-west1'
    : `https://europe-west1-${config.public.firebase.projectId}.cloudfunctions.net`;

  const qs = new URLSearchParams(query as Record<string, string>).toString();
  const url = `${baseUrl}/registry-${path}${qs ? `?${qs}` : ''}`;

  const response = await $fetch(url);
  return response;
});
