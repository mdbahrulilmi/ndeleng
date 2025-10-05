'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TmbdSearch from '@/lib/tmbd/tmdb-search';
import { Link } from 'lucide-react';

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);

      try {
        const [resultMovie, resultTv] = await Promise.all([
          TmbdSearch(`/search/movie?query=${encodeURIComponent(query)}`),
          TmbdSearch(`/search/tv?query=${encodeURIComponent(query)}`)
        ]);

        const combined = [
          ...(resultMovie.results || []),
          ...(resultTv.results || [])
        ];

        setData(combined);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
      <div className="relative container mx-auto py-5 px-4 md:px-20 pb-20 h-screen">
          <h2 className="text-3xl font-bold text-white mb-6">
            {query ? `List of ${query}` : 'Search for movies'}
          </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item: any) => (
              <div
                key={item.id}
                className="group backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                onClick={(e) => window.location.href=`/detail/${item.id}`}
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
                <div className="text-gray-400 text-sm">
                  ⭐ {item.vote_average?.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
      </div>
  );
}
