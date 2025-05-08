import { createClient } from '@/lib/server'
import React from 'react'
import Profile from './Profile'

export default async function ProfileList() {

    const supabase = await createClient()
    const { data } = await supabase.from("Profile").select("id,profile_name,role")

    console.log(data)

  return (
    <div className='grid grid-cols-6 p-15 gap-6'>
        {data && data.length > 0 && data.map( ( profile,key ) => (
            <Profile key={key} data={profile}/>
        ))}
    </div>
  )}
