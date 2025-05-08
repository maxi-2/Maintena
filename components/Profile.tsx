"use client"

import React from 'react'

import { profile } from '@/new-types'

import { useRouter } from 'next/navigation'

import { useProfileStore } from '@/store/store'

const userIcon = <svg className='w-full h-44 fill-neutral-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z"/></g></svg>

export default function Profile({ data }: { data:profile }) {

    const { setProfile } = useProfileStore()

    const router = useRouter()

    function handleClick() {
        
        // localStorage.setItem("profile", JSON.stringify(data))

        setProfile(data)

        router.push("/app/machines")
    }

  return (
    <button onClick={handleClick} className='hover:brightness-80 transition duration-300 bg-card p-5 rounded-[0.625rem] shadow-[0_3px_7px_rgba(0,0,0,0.25)] cursor-pointer'>
        <div className='mb-4'>{userIcon}</div>
        <div className='flex flex-col gap-1 text-left'>
            <div>{data.profile_name}</div>
            <div>{data.role}</div>
        </div>
    </button>
  )
}
