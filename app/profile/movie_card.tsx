export default function MovieCard({item}:{item:any}){
    return(
        <div key={`${item.category}-${item.id}`}
            className="group backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
            onClick={() => window.location.href = `/detail/${item.category}/${item.id}`}
        >
            <div
            className="aspect-square rounded-md mb-3 group-hover:scale-105 transition-transform bg-cover bg-center"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.image})`,
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
    )
          
}