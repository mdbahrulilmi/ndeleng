import GenreCarousel from "../../components/custom-ui/genreCarousel";
import { fetchMoviesByGenre } from "@/lib/tmdb/fetchMoviesByGenre";

const category = "tv";
const genres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' }
];

const genresData = await Promise.all(
    genres.map((genre) => fetchMoviesByGenre(genre, category))
  );

export default function Tv() {
  return (
    <div className="relative container mx-auto px-4 md:px-20 max-h-screen">
      {genresData.map(({ genre, movies }) => (
        <GenreCarousel
          key={genre.id}
          genre={genre}
          movies={movies}
          category={category}
        />
      ))}
    </div>
  );
}