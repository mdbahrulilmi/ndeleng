import { connectDB } from "@/lib/mongodb/connect"
import { Post } from "@/models/Post"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    await connectDB()

    const update = await Post.insertOne(
      { userId: data.userId, movieId:data.movieId, text:data.text,  }
    )

    return NextResponse.json({ success: true, update })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

