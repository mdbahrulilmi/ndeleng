'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    const name = session?.user.profile.name
    const firstName = name?.split(" ")[0]
    return (
      // 
    <div>
        <button
          className="w-full px-5 py-2 font-[600] bg-secondary hover:bg-border rounded-xl text-base text-white transition-colors cursor-pointer"
          onClick={() => window.location.href="/profile"}
        >
          Hi <span className="bg-primary bg-clip-text text-transparent">{firstName}</span>
        </button>
      </div>
    )
  }
  return (
      <div className="text-center">
        <button
          className="w-full px-5 py-2 font-[600] bg-secondary hover:bg-border rounded-xl text-base text-white transition-colors cursor-pointer"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      </div>
    )
}
