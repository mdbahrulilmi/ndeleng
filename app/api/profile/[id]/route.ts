import { connectDB } from "@/lib/mongodb/connect"
import { Post } from "@/models/Post";
import { Profile } from "@/models/Profile"

export async function GET(req: Request, context:any,) {
  const param = await context.params;
  await connectDB()
  const profile = await Profile.findOne({ _id: param.id }).lean()
  const posts = await Post.find({ userId: param.id }).lean()
  const result = {
    ...profile,
    posts: posts
  };
  return new Response(JSON.stringify(result), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}
