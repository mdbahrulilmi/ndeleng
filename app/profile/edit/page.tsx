'use client'

import { SessionProvider } from 'next-auth/react'
import SessionProfile from '@/lib/session/session-profile'
import EditProfileLayout from './edit-layout'

export default function ProfilePage() {
  const { userData, joinDate, loading } = SessionProfile()

  return (
    <SessionProvider>
        <EditProfileLayout userData={userData}/>
    </SessionProvider>
  )
}
