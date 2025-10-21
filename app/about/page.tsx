"use client"

export default function About() {
  return (
    <div>
      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-20 max-h-screen flex pt-35">
        <div className="max-w-3xl items-end">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            About <span className="text-white">ndeleng</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            <span className="font-semibold text-white">ndeleng</span> helps you discover thousands of movies and TV series from every genre. We believe watching is more than just entertainment — it’s a way to connect and share moments. With a modern design and simple features, you can explore, save, and easily find where to watch your favorites anytime.
          </p>
          
        </div>
      </div>
    </div>
  )
}
