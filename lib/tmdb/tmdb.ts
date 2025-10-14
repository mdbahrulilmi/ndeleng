import { tmdbCache } from "./tmdb-cache";

export default async function Tmbd(path: string) {
  const cacheKey = path;

  // 1. Mulai cek cache
  const startCacheCheck = Date.now();
  const cached = tmdbCache.get(cacheKey);

  if (cached) {
    return cached;
  } else {
  }

  // 2. Fetch dari TMDB
  const url = "https://api.themoviedb.org/3";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_KEY}`,
    },
  };

  try {
    const startFetch = Date.now();
    const res = await fetch(`${url}${path}`, options);

    if (!res.ok) {
      console.error("TMDB fetch failed:", res.status, res.statusText);
      return { results: [] };
    }

    const data = await res.json();
    const fetchTime = Date.now() - startFetch;

    tmdbCache.set(cacheKey, data);

    return data;
  } catch (err) {
    return { results: [] };
  }
}
