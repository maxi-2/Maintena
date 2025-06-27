import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import SideBar from './SideBar'
import SideBarLink from './SideBarLink'

import { drillIcon, calendarIcon, accountIcon, burgerIcon } from '@/constants/sideBarSvgs'


export default function SideBarSheet() {
  return (
    <Sheet>
        <SheetTrigger className='xl:hidden cursor-pointer'>{burgerIcon}</SheetTrigger>
        <SheetContent>
            {/* <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>Nothing</SheetDescription> */}
                <div>
                    <SheetClose asChild>
                        <SideBarLink text="Machines" icon={drillIcon}/>
                    </SheetClose>

                    <SheetClose asChild>
                        <SideBarLink text="Calendar" icon={calendarIcon}/>
                    </SheetClose>

                    <SheetClose asChild>
                        <SideBarLink text="Account" icon={accountIcon}/>
                    </SheetClose>
                </div>

            {/* <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
            </SheetHeader> */}
        </SheetContent>
    </Sheet>
  )
}
