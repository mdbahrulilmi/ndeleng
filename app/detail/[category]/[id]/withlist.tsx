"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { toast } from "sonner"

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

      if (res.ok) {
      await res.json();
      toast.success("Withlist has been added")
      }

    } catch (err) {
      const error = err as Error;
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
