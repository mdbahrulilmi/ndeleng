export default async function TmbdSearch(path: string) {
  try {
    const res = await fetch(`/api/tmdb?path=${encodeURIComponent(path)}`);

    if (!res.ok) {
      throw new Error(`TMDB fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching TMDB:", err);
    return { results: [] };
  }
}