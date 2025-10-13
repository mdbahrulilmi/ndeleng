import { fetchMoviesById } from "@/lib/tmdb/fetchMoviesById";

export default async function DetailPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const data = await fetchMoviesById(id);

  return (
    <div className="relative z-10 min-h-screen py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Backdrop Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt={data.title || data.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          </div>
          
          <div className="relative px-6 sm:px-12 py-16 sm:py-24">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title || data.name}
                  className="w-48 sm:w-56 rounded-2xl shadow-2xl ring-2 ring-purple-500/20"
                />
              </div>

              {/* Title & Basic Info */}
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
                  {data.title || data.name}
                </h1>
                
                {data.tagline && (
                  <p className="text-lg sm:text-xl text-purple-300 italic mb-6">
                    "{data.tagline}"
                  </p>
                )}

                {/* Rating & Status */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-2xl">⭐</span>
                    <span className="text-xl font-bold text-white">
                      {data.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {data.vote_count || 0} votes
                  </span>
                  {data.status && (
                    <span className="px-4 py-2 bg-pink-500/30 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                      {data.status}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {data.genres && data.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.genres.map((genre: any) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-white"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            {data.overview && (
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{data.overview}</p>
              </div>
            )}

            {/* Collection */}
            {data.belongs_to_collection && (
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Part of Collection</h3>
                <div className="flex items-center gap-4">
                  {data.belongs_to_collection.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${data.belongs_to_collection.poster_path}`}
                      alt={data.belongs_to_collection.name}
                      className="w-16 rounded-lg shadow-lg"
                    />
                  )}
                  <p className="text-purple-200 font-medium">
                    {data.belongs_to_collection.name}
                  </p>
                </div>
              </div>
            )}

            {/* Production Companies */}
            {data.production_companies && data.production_companies.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-4">Production Companies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.production_companies.map((company: any) => (
                    <div
                      key={company.id}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-purple-500/10"
                    >
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                          alt={company.name}
                          className="h-8 object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                          <span className="text-xs text-purple-300">🏢</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{company.name}</p>
                        {company.origin_country && (
                          <p className="text-xs text-gray-400">{company.origin_country}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Details</h3>
              <div className="space-y-4">
                {data.release_date && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Release Date</p>
                    <p className="text-white font-medium">
                      {new Date(data.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
                
                {data.runtime && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Runtime</p>
                    <p className="text-white font-medium">{data.runtime} minutes</p>
                  </div>
                )}
                
                {data.original_title && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Original Title</p>
                    <p className="text-white font-medium">{data.original_title}</p>
                  </div>
                )}
                
                {data.original_language && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Original Language</p>
                    <p className="text-white font-medium uppercase">{data.original_language}</p>
                  </div>
                )}
                
                {data.production_countries && data.production_countries.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Production Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {data.production_countries.map((country: any, index: number) => (
                        <span key={index} className="text-white font-medium text-sm">
                          {country.name}
                          {index < data.production_countries.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data.spoken_languages && data.spoken_languages.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Spoken Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {data.spoken_languages.map((lang: any, index: number) => (
                        <span key={index} className="text-white font-medium text-sm">
                          {lang.english_name}
                          {index < data.spoken_languages.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data.popularity && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Popularity</p>
                    <p className="text-white font-medium">{data.popularity.toFixed(2)}</p>
                  </div>
                )}

                {data.budget !== undefined && data.budget > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Budget</p>
                    <p className="text-white font-medium">
                      ${data.budget.toLocaleString()}
                    </p>
                  </div>
                )}

                {data.revenue !== undefined && data.revenue > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Revenue</p>
                    <p className="text-white font-medium">
                      ${data.revenue.toLocaleString()}
                    </p>
                  </div>
                )}

                {data.imdb_id && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">IMDb ID</p>
                    <a 
                      href={`https://www.imdb.com/title/${data.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm underline"
                    >
                      {data.imdb_id}
                    </a>
                  </div>
                )}

                {data.homepage && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Homepage</p>
                    <a 
                      href={data.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm underline break-all"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {data.adult !== undefined && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Adult Content</p>
                    <p className="text-white font-medium">{data.adult ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}