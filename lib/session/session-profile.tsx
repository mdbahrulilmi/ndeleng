'use client'

import useSWR from 'swr'
import getSessionHandler from '@/lib/session/getSessionHandler'
import { useEffect, useState } from 'react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SessionProfile() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    getSessionHandler().then(id => setUserId(id!))
  }, [])

  const { data: userData, isLoading } = useSWR(
    userId ? `/api/profile/${userId}` : null, // SWR skip kalau null
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 1000 * 60 * 10 } // cache 10 menit
  )

  const joinDate = userData
    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : ''

  return { userData, joinDate, loading: isLoading }
}
