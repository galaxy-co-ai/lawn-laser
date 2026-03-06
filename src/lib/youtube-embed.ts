/**
 * Converts YouTube URLs in HTML content to responsive embedded iframes.
 * Handles:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Plain text URLs and anchor-wrapped URLs
 */
export function embedYouTubeVideos(html: string): string {
  // Match YouTube URLs (both in href attributes and as plain text)
  const youtubeRegex =
    /(?:<a[^>]*href=")?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:[^"<\s]*)(?:"[^>]*>.*?<\/a>)?/gi;

  return html.replace(youtubeRegex, (_match, videoId: string) => {
    return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" loading="lazy"></iframe></div>`;
  });
}
