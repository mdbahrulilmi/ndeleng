'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function GoogleButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <button
          className="w-full px-3 py-3 font-[600] bg-red-600 rounded-lg text-base text-white hover:bg-purple-700 transition-colors"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="text-center">
      <button
        className="w-full px-3 py-3 font-[600] bg-purple-600 rounded-lg text-base text-white hover:bg-purple-700 transition-colors"
        onClick={() => signIn("google")}
      >
        Login
      </button>
    </div>
  )
}
