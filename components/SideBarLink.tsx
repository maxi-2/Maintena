"use client"

import React from 'react'
import { useSelectedStore } from '@/store/sideBarSelectedStore'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export default function SideBarLink({ text, icon, link }:{ text:string, icon: React.ReactNode, link: string }) {

  const { selected } = useSelectedStore()

  return (
    <Link href={`/app/${link ? link : "machines"}`} className={cn(`${selected === text.toLowerCase() && "border-1 border-neutral-white"}`,'flex items-center gap-2 px-8 py-2 text-base rounded-[0.625rem]')}>
        {icon}
        <p>{text}</p>
    </Link>
  )
}
