import { fetchMoviesByGenre } from "./tmbd/fetchMoviesByGenre";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";


export default async function GenreCarousel({ genre, category }: { genre: { id: number; name: string }, category:string}) {
  const data = await fetchMoviesByGenre(genre, category);
  const title = (category === "movie") ? "Movies" : "Tv Series"

  return (
    <div className="mt-5 md:mt-16">
      <h2 className="text-2xl font-bold text-white mb-2 md:mb-6">
       {data.genre.name} {title}
      </h2>
      <Carousel>
        <CarouselContent className="p-5">
          {data.movies.map((item: any) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 md:basis-1/4 group backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 mr-4"
            >
              <Link href={`detail/${item.id}`} className="block cursor-pointer">
              <div
                className="aspect-square rounded-md mb-3 group-hover:scale-105 transition-transform bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                }}
                />
              <div className="text-white font-semibold truncate">{(category === 'movie') ? item.title : item.name}</div>
              <div className="text-gray-400 text-sm">⭐ {item.vote_average}</div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block"/>
        <CarouselNext className="hidden md:block" />
      </Carousel>
    </div>
  );
}
