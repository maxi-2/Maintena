import React from 'react'

export default function SideBarLink({ text, icon }:{ text:string, icon: React.ReactNode }) {
  return (
    <div className='flex items-center gap-2 border-1 px-8 py-2 text-base border-neutral-white rounded-[0.625rem]'>
        {icon}
        <p>{text}</p>
    </div>
  )
}
