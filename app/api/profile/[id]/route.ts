import { connectDB } from "@/lib/connect"
import { Profile } from "@/models/Profile"

export async function GET(req: Request, context:any,) {
  const param = await context.params;
  await connectDB()
  const profile = await Profile.findOne({ userId: param.id }).lean()
  return new Response(JSON.stringify(profile), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}
