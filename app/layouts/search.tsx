'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData)
    {
      const query = formData.get("q") as string;
      if(query && query !== null){
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    }
  }

  return (
    <form onSubmit={search} className="flex gap-2">
      <Input
        name="q"
        placeholder="Search movies..."
        className="w-full bg-white md:w-40 md:bg-white/5 border-white/10 text-white placeholder:text-gray-500"
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
        Search
      </Button>
    </form>
  );
}
