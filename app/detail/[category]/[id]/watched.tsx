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

export default function WatchedButton({ id, title, image, category }: { id: string, title: string, image: string, category: string }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [textPost, setTextPost] = useState('');

  async function handleWatched() {
    if (!userId) return;
    console.log(textPost);
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
              const result = await res.json();
      }

    } catch (err) {
      console.error("Fetch error:", err);
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
              <Input id="post" name="post" value={textPost} onChange={(e)=>setTextPost(e.target.value)}/>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
                <DialogClose asChild>
               <Button type="submit" onClick={handleWatched}>Send</Button>
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
