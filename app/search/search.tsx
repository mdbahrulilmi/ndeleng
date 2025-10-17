'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TmbdSearch from '@/lib/tmdb/tmdb-search';

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        const [resultMovie, resultTv] = await Promise.all([
          TmbdSearch(`/search/movie?query=${encodeURIComponent(query)}`),
          TmbdSearch(`/search/tv?query=${encodeURIComponent(query)}`)
        ]);

        const combinedResults = [
          ...resultMovie.results.map((item: any) => ({ ...item, category: resultMovie.category })),
          ...resultTv.results.map((item: any) => ({ ...item, category: resultTv.category }))
        ];

        setData(combinedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="relative container mx-auto py-5 px-4 md:px-20 pb-20 h-screen">
      <h2 className="text-3xl font-bold text-white mb-6">
        {query ? `List of "${query}"` : 'Search for movies or TV shows'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: any) => (
          <div
            key={`${item.category}-${item.id}`}
            className="group backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
            onClick={() => window.location.href = `/detail/${item.category}/${item.id}`}
          >
            <div
              className="aspect-square rounded-md mb-3 group-hover:scale-105 transition-transform bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
              }}
            />
            <div className="text-white font-semibold truncate">
              {item.title || item.name}
            </div>
            <div className="text-gray-400 text-sm flex items-center justify-between">
              <span>⭐ {item.vote_average?.toFixed(1)}</span>
              <span className="capitalize text-xs text-yellow-400">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
