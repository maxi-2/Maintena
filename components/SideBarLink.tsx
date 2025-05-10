"use client"

import React from 'react'
import { useSelectedStore } from '@/store/sideBarSelectedStore'

import { cn } from '@/lib/utils'

export default function SideBarLink({ text, icon }:{ text:string, icon: React.ReactNode }) {

  const { selected } = useSelectedStore()

  return (
    <div className={cn(`${selected === text.toLowerCase() && "border-1 border-neutral-white"}`,'flex items-center gap-2 px-8 py-2 text-base rounded-[0.625rem]')}>
        {icon}
        <p>{text}</p>
    </div>
  )
}
