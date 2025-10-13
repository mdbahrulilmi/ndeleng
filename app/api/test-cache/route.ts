import { NextRequest, NextResponse } from "next/server";
import Tmbd from "@/lib/tmdb/tmdb";

// GET method
export async function GET(req: NextRequest) {
  const data = await Tmbd("/discover/tv?with_genres=10767&sort_by=popularity.desc");
  return NextResponse.json({ results: data.results?.length || 0 });
}
