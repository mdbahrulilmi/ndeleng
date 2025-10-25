"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function WithlistButton({ id, title, image, category }: { id: string, title: string, image: string, category: string }) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  async function handleWithlist() {
    if (!userId) return;

    try {
      const res = await fetch('/api/withlist', {
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
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleWithlist}>
        Withlist
      </Button>
    ): null}
    </>
  );  
}
