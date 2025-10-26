export default function MovieCard({item}:{item:any}){
    return(
        <div key={`${item.category}-${item.id}`}
            className="group rounded-lg transition-all duration-300 cursor-pointer"
            onClick={() => window.location.href = `/detail/${item.category}/${item.id}`}
        >
            <div
            className="aspect-square rounded-md group-hover:scale-105 transition-transform bg-cover bg-center"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.image})`,
            }}
            />
        </div>
    )
          
}