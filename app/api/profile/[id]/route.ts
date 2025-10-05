import { connectDB } from "@/lib/connect"
import { Profile } from "@/models/Profile"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const param = await params
  await connectDB()
  const profile = await Profile.findOne({ userId: param.id }).lean()
  return new Response(JSON.stringify(profile), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}
