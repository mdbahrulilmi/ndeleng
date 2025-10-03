export default function Design()
{
    return(
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-full h-full bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-full h-full bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-full h-full bg-blue-600/20 rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
          <div className="absolute top-32 right-20 w-32 h-32 border-2 border-purple-500/30 rotate-45" />
          <div className="absolute top-1/3 left-40 w-24 h-24 border-2 border-pink-500/30 rounded-full" />
          <div className="absolute bottom-40 right-1/3 w-40 h-40 border-2 border-blue-500/30 rotate-12" />
          <div className="absolute top-2/3 right-40 w-20 h-20 bg-purple-500/10 rounded-full" />
          <div className="absolute bottom-1/4 left-20 w-28 h-28 bg-pink-500/10 rotate-45" />
        </div>
    )
}