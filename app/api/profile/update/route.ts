import { connectDB } from "@/lib/mongodb/connect"
import { Profile } from "@/models/Profile"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    await connectDB()

    const update = await Profile.updateOne(
      { userId: data.userId },
      { $set: { name: data.name, username: data.username, gender: data.gender, bio: data.bio, image:data.image } },
      { upsert: true }
    )

    return NextResponse.json({ success: true, update })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
