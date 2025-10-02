import Tmbd from "@/lib/tmbd/tmdb";

export async function fetchMoviesById(id: string) {
  const endpoints = [`/movie/${id}`, `/tv/${id}`];

  const results = await Promise.allSettled(
    endpoints.map((path) => Tmbd(path))
  );

  for (const res of results) {
    if (res.status === "fulfilled" && res.value) {
      return res.value;
    }
  }
  return null;
}
