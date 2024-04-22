'use client'
import { useRouter } from 'next/navigation'

export default function ServiceTitle() {
  const router = useRouter()
  return (
    <h2
      onClick={() => router.replace('/home')}
      style={{ margin: 0, fontWeight: 100, cursor: 'pointer' }}
    >
      TripSnap
    </h2>
  )
}
