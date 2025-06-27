"use client"

import React from 'react'
import { useSelectedStore } from '@/store/sideBarSelectedStore'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SideBarLink = React.forwardRef<
  HTMLAnchorElement,
  { text: string; icon: React.ReactNode; link: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ text, icon, link, ...props }, ref) => {
  const { selected } = useSelectedStore()

  return (
    <Link
      ref={ref}
      href={`/app/${link || "machines"}`}
      className={cn(
        selected === text.toLowerCase() && "border-1 border-neutral-white",
        'flex items-center gap-2 px-8 py-2 text-base rounded-[0.625rem]'
      )}
      {...props}
    >
      {icon}
      <p>{text}</p>
    </Link>
  )
})

SideBarLink.displayName = "SideBarLink"
export default SideBarLink
