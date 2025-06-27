"use client"

import { useState } from 'react'
import { AddMachineForm } from './AddMachineForm'
import { AddAreaForm } from './AddAreaForm'
import { usePathname } from 'next/navigation'

import { EventForm } from './EventForm'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const addIcon = (
  <svg className='h-4 w-4 fill-neutral-white' xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" width="512" height="512">
  <g>
    <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
  </g>
  </svg>
)

function matchesMachinePath(str: string) {
  const regex = /^\/app\/machines\/\d+$/;
  return regex.test(str);
}


export default function AddButton() {

  const [open,setOpen] = useState(false)

  const closeDialog = () => setOpen(false)

  const pathname = usePathname()
  const isMachinePage = matchesMachinePath(pathname)

  const page = pathname.split("/")

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {page && page[2] === "machines" && 
        <DialogTrigger className='bg-primary-teal cursor-pointer hover:brightness-80 transition duration-300 flex items-center gap-2 text-neutral-white px-5 py-2 rounded-[0.625rem]  ml-30'>
        {addIcon}
      <p>Add</p>
      </DialogTrigger>
      }
      
      <DialogContent className='text-primary-dark'>
        {isMachinePage ? 
        <>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <EventForm closeDialog={closeDialog}/>
        </>
          :
        <>
          <DialogHeader>
            <DialogTitle>Add New Equipment or Work Area</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="equipment" className="">
            <TabsList className='w-full bg-gray-300'>
              <TabsTrigger className='' value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="workarea">Work Area</TabsTrigger>
            </TabsList>
            <TabsContent value="equipment">
              <AddMachineForm closeDialog={closeDialog}/>
            </TabsContent>
            <TabsContent value="workarea">
              <AddAreaForm closeDialog={closeDialog}/>
              </TabsContent>
          </Tabs>
        </>
        }
        
        
      </DialogContent>
    </Dialog>
  )
}
