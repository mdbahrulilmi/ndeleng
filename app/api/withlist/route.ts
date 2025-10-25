import { connectDB } from "@/lib/mongodb/connect";
import { Profile } from "@/models/Profile";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request: Request){
try {
    const data = await request.json();

    const newItem = {
      id: String(data.id),
      category: data.category,
      title: data.title,
      image: data.image || null
    };

    const checkWatchedlist = await Profile.findOne({
          _id: data.userId,
          "watchedlist.id": newItem.id
        })
    if(!checkWatchedlist){
      const update = await Profile.updateOne(
        { _id: data.userId },
        { $addToSet: { withlist: newItem } }
      );
      return NextResponse.json({ success: true, update });
    }
    return NextResponse.json({ success: false });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}