export default function PostCard({ item }: { item: any }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
    <div
      className="group rounded-lg cursor-pointer"
      onClick={() => window.location.href = `/detail/${item.category}/${item.id}`}
    >
      <div className="mb-2">
      <small className="text-xs mb-0">
        {new Date(item.timestamp).toLocaleDateString('en-GB')}
      </small>
      <p className="text-xl text-left">
        {item.postText ? item.postText : "Belum ada komentar"}
      </p>
      </div>
      <div className="group-hover:scale-105 transition-transform">
        <div
          className="aspect-16/4 rounded-md bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.image})`,
          }}
        />
      </div>
    </div>
    </div>
  );
}
