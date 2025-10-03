'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { cn } from "@/lib/utils";

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
    <form onSubmit={search} className="flex w-full md:w-120 md:bg-white/5 border rounded-full overflow-hidden border-white/5">
      <Input
        name="q"
        placeholder="Search movies..."
        className={`w-full text-white placeholder:text-gray-500 border-none bg-transparent outline-none px-5 py-2`+ cn('focus-visible:border-none focus-visible:ring-0')}
      />
      <Button type="submit" className="bg-transparent hover:bg-transparent cursor-pointer">
         <FaMagnifyingGlass className="w-5 h-5 text-gray-400 text-xl" />
      </Button>
    </form>
  );
}
