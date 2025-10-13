import { Film, Heart, Award, Users, Calendar } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface ProfileLayoutProps {
  userData: any
  joinDate: string
}

export default function ProfileLayout({ userData, joinDate }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen pt-5 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Cover + Profile Picture */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 mb-4">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600"></div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative -mt-20">
                {userData?.image != null ?
                <img src={userData?.image} alt="profile" className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold border-4 border-slate-950"/> : 
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold border-4 border-slate-950">
                  {userData?.name.charAt(0).toUpperCase()}
                </div>
                }
              </div>

              {/* Name & Stats */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{userData?.name}</h1>
                <p className="text-purple-300 mb-1">@{userData?.username}</p>
                <p className="text-white 300 mb-2">{userData?.bio}</p>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-bold">{userData?.followers.length}</span> followers
                  </div>
                  <div>
                    <span className="font-bold">{userData?.following.length}</span> following
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-3">
                <button
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold cursor-pointer"
                  onClick={() => (window.location.href = `profile/edit/`)}
                >
                  Edit Profile
                </button>
                <button className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded-lg font-semibold cursor-pointer"
                onClick={() => signOut()}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Left Column - Info */}
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-4">
              <h2 className="font-bold text-lg mb-4">Info</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-purple-400" />
                  <span className="capitalize">{userData?.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-purple-400" />
                  <span>Joined {joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-yellow-400" />
                  <span>{userData?.points} points</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="font-bold text-lg mb-4">Badges</h2>
              <p className="text-sm text-purple-300">No badges earned yet</p>
            </div>
          </div>

          {/* Right Column - Posts/Activity */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Watchlist</h2>
                <Film size={20} className="text-purple-400" />
              </div>
              <p className="text-sm text-purple-300">No movies in watchlist</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Favorite Movies</h2>
                <Heart size={20} className="text-pink-400" />
              </div>
              <p className="text-sm text-purple-300">No favorite movies yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
