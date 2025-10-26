"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { NextResponse } from "next/server";

export default function WatchedButton({ id, title, image, category }: { id: string, title: string, image: string, category: string }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [textPost, setTextPost] = useState('');

  async function handleWatched() {
    if (!userId) return;
    if (!textPost || textPost == "") {
      toast.error("input the text!");
      return
    }
    try {
      const post = await fetch('/api/post',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          movieId: String(id),
          text: textPost,
        })
      });
      if (post.ok){
        const res = await fetch('/api/watched', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: String(id),
                  title,
                  image,
                  category,
                  userId
                })
              });
        if (res.ok) {
        await res.json();
        toast.success("Comment has been posted.")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        
        }
      }

    } catch (err) {
      const error = err as Error;
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  return (
    <>
    { userId ? (
        <div>
          <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">Watched</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Text</DialogTitle>
            </DialogHeader>
              <textarea className="border border-white rounded-sm h-[150px] p-2" id="post" name="post" value={textPost} onChange={(e)=>setTextPost(e.target.value)} required></textarea>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
                <DialogClose asChild>
               <Button type="submit" className="text-black" onClick={handleWatched}>Send</Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      )
    : null}
    </>
  );      
}
