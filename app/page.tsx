"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className="relative container mx-auto px-5 py-30 md:px-20 md:pt-50 pb-20 h-screen">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
             Discover Movies & TV Series
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Discover movies and TV shows from every genre search, explore, and find what to watch next.
          </p>
          <div className="flex gap-4">
            <Link href="/movies">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer">
                Movies
              </Button>
            </Link>
            <Link href="/tv">
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-black hover:bg-white/10 hover:text-white cursor-pointer">
              TV Series
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}