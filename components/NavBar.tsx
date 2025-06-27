import React from 'react'
import Image from 'next/image'
import ProfileName from './ProfileName'

import AddButton from './AddButton'

import Link from 'next/link'
import SideBarSheet from './SideBarSheet'

export default function NavBar() {
  
  return (
        <nav className='w-full flex items-center bg-neutral-dark py-4 px-9'>
          
          <SideBarSheet/>

          <Link href={"/app/machines"}>
            <Image height={328} width={1230} style={{ width: '165px', height: "auto"}} priority={true} alt="logo" src="/logo.webp"/>
          </Link>
            
          <AddButton/>
          
          <div className='ml-auto'>
            <ProfileName/>
          </div>
            
        </nav>
  )
}
