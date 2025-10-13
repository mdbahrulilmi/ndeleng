'use client'

import { useEffect, useState } from 'react'
import getSessionHandler from '@/lib/session/getSessionHandler'

export default function SessionProfile() {
  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [joinDate, setJoinDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getSessionHandler().then(id => setUserId(id!))
  }, [])

  useEffect(() => {
    if (!userId) return
    fetch(`/api/profile/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data)
        const date = new Date(data?.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
        setJoinDate(date)
      })
      .finally(() => setLoading(false))
  }, [userId])

  return { userId, userData, joinDate, loading }
}
