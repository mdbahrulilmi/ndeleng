import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  const allowedPaths = ["/search/movie", "/search/tv"];

  if (!path){
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  if (!allowedPaths.some((p) => path!.startsWith(p))) {
  return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const url = "https://api.themoviedb.org/3";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_KEY}`
    }
  };

  try {
    const res = await fetch(`${url}${path}`, options);

    if (!res.ok) {
      throw new Error(`TMDB fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching TMDB:", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}