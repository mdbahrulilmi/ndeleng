import { connectDB } from "@/lib/mongodb/connect";
import { Post } from "@/models/Post";

export async function GET(req: Request, context:any,) {
  const param = await context.params;
  await connectDB()
  const post = await Post.find({ movieId: param.id })
  .populate('userId', 'username')
  .lean();
  return new Response(JSON.stringify(post), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}
