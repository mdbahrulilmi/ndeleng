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
    const checkWithlist = await Profile.findOne({
      userId: data.userId,
      "withlist.id": newItem.id
    })
    if(checkWithlist){
      await Profile.updateOne(
        { userId: data.userId },
        { $pull: { withlist: { id: newItem.id } } }
      );
    }
    const update = await Profile.updateOne(
      { userId: data.userId },
      { $addToSet: { watchedlist: newItem } }
    );
    return NextResponse.json({ success: true, update });
  } catch (err) {
   const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}