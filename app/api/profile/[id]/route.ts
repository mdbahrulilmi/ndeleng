import { connectDB } from "@/lib/mongodb/connect"
import { Profile } from "@/models/Profile"

export async function GET(req: Request, context:any,) {
  const param = await context.params;
  await connectDB()
  const profile = await Profile.findOne({ _id: param.id }).lean()
  return new Response(JSON.stringify(profile), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}
