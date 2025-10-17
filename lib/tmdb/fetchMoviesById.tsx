import Tmbd from "@/lib/tmdb/tmdb";

export async function fetchMoviesById(category: string,id: string) {
  let endpoints = `/${category}/${id}`;

  try{
    const results = await Tmbd(endpoints)
  
    return results;
  }
  catch(err){

  }
}