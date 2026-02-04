/**
 * Converts storage path to full URL
 * @param path - Storage path from backend (e.g., /storage/cosmetics/badge.png)
 * @returns Path for use with Next.js rewrite rule or full URL
 */
export function getStorageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;

  // Already full URL - return as is
  if (path.startsWith('http')) return path;

  // Path starting with /storage - return as is for Next.js rewrite rule
  // The rewrite rule in next.config.ts will proxy it to backend
  if (path.startsWith('/storage')) return path;

  // Other paths - convert to full URL using NEXT_PUBLIC_BACKEND_URL
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  return `${baseUrl}${path}`;
}
