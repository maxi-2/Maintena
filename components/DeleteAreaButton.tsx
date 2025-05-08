"use client"

import React from 'react'
import { createClient } from '@/lib/client'
import { useRouter } from 'next/navigation'

const binIcon = <svg className='h-3 w-3 fill-neutral-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z"/><rect x="9" y="10" width="2" height="8"/><rect x="13" y="10" width="2" height="8"/></g></svg>

export default function DeleteAreaBtn({ locationId }:{ locationId:number }) {
    const router = useRouter()

    async function handleClick() {
        const supabase = await createClient()
        const res = await supabase.from("Location").delete().eq("id",locationId)
        console.log(res)

        if (!res.error) {
            router.refresh()    
        }
    }

  return (
    <button
    onClick={handleClick}
    className='bg-red-600 cursor-pointer hover:brightness-80 transition duration-300 flex items-center gap-2 text-neutral-white p-2 rounded-[0.625rem]'>
        {binIcon}
    </button>
  )
}
