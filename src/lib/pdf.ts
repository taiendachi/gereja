/** Convert any Google Drive share URL into an embeddable preview URL. */
export function toDrivePreview(url: string): string {
  if (!url) return "";
  // Match /file/d/<id>/...
  const m1 = url.match(/\/file\/d\/([^/]+)/);
  if (m1) return `https://drive.google.com/file/d/${m1[1]}/preview`;
  // Match ?id=<id>
  const m2 = url.match(/[?&]id=([^&]+)/);
  if (m2) return `https://drive.google.com/file/d/${m2[1]}/preview`;
  // Already a preview/embed link
  if (url.includes("/preview")) return url;
  return url;
}

export function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}