"use client"

import Link from 'next/link'

import { useProfileStore } from '@/store/store'

export default function ProfileName() {

  const { profile } = useProfileStore()

  return (
    profile && 
      <Link href="/app/select-profile">
      {profile.profile_name} - {profile.role}
    </Link>
  )
}
