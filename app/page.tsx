"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className="relative container mx-auto px-5 md:px-20 pt-35 max-h-screen">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-primary bg-clip-text text-transparent">
             Discover Movies & TV Series
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Discover movies and TV shows from every genre search, explore, and find what to watch next.
          </p>
          <div className="flex gap-4">
            <Link href="/movies">
              <Button size="lg" className="hover:from-purple-700 hover:to-pink-700 text-black cursor-pointer">
                Movies
              </Button>
            </Link>
            <Link href="/tv">
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-black bg-white hover:bg-white/10 hover:text-white cursor-pointer">
              TV Series
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}