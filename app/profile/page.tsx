'use client'

import { SessionProvider } from 'next-auth/react'
import ProfileLayout from './profile-layout'
import SessionProfile from '@/lib/session/session-profile'

export default function ProfilePage() {
  const { userData, joinDate, loading } = SessionProfile();

  if (!userData) return null

  return (
    <SessionProvider>
      <ProfileLayout userData={userData} joinDate={joinDate} />
    </SessionProvider>
  )
}
