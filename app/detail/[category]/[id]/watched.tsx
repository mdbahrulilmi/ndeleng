"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function WatchedButton({ id, title, image, category }: { id: string, title: string, image: string, category: string }) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  async function handleWatched() {
    if (!userId) return;

    try {
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
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  return (
    <>
    {userId ? (
      <Button className="bg-green-600 hover:bg-green-700" onClick={handleWatched}>
        Watched
      </Button>
    ): null}
    </>
  );      
}
