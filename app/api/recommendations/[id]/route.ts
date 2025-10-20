import { Profile } from "@/models/Profile";
import { connectDB } from "../../../../lib/mongodb/connect";
import Tmbd from "../../../../lib/tmdb/tmdb";

export async function GET(req: Request, context: any) {
  const param = await context.params;

  await connectDB();

  const profile = await Profile.findOne({ userId : param.id });
  if (!profile || !profile.watchedlist || profile.watchedlist.length === 0) {
    return new Response(
      JSON.stringify({ message: "No watched list found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Ambil 5 watchedlist terakhir
  const top5Latest = profile.watchedlist.slice(-5).reverse();

  try {
    const recommendations = await Promise.all(
      top5Latest.map(async (item: any) => {
        const { id: movieId, category } = item;
        if (!movieId || !category) return [];

        const endpoint = `/${category}/${movieId}/recommendations`;
        const data = await Tmbd(endpoint);

        return (data.results ?? []).slice(0, 10).map((rec: any) => ({
          ...rec,
          category,
        }));
      })
    );

    const merged = recommendations.flat();

    const uniqueRecommendations = merged.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
    );

    const topRecommendations = uniqueRecommendations.slice(0, 30);

    return new Response(JSON.stringify(topRecommendations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
