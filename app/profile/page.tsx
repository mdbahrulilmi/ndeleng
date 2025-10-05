'use client'

import { SessionProvider } from 'next-auth/react';
import SessionProfile from './session-profile';
export default function ProfilePage() {
  return(
    <SessionProvider>
        <SessionProfile/>
    </SessionProvider>
  )
}