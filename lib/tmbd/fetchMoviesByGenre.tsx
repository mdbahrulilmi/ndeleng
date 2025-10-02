import Tmbd from "@/lib/tmbd/tmdb";

export async function fetchMoviesByGenre(
  genre: { id: number; name: string }, 
  category: string
) {
  try {
    const data = await Tmbd(
      `/discover/${category}?with_genres=${genre.id}&sort_by=popularity.desc`
    );
    
    return {
      genre,
      movies: data.results || [],
    };
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return {
      genre,
      movies: [],
    };
  }
}