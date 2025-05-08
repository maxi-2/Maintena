import React from 'react'
import Link from 'next/link'

import { createClient } from '@/lib/server';
import DateColour from './DateColour';

import { dateDiffInDays } from '@/utils/supabase/functions';

type machineProps = {
    name: string,
    id: string,
    
}

export default async function Machine({ name, id }:machineProps) {

  const supabase = await createClient();
      
  const { data, count } = await supabase
  .from('Event')
  .select('*', { count: 'exact' })
  .order("due_date",{ascending: true})
  .eq("machine_id",id)
  
  let daysTillNextEvent = 0

  if (data && data.length > 0) {
    const closestEvent = data[0]

    const dateObj = new Date(closestEvent.due_date)

    const today = new Date()

    daysTillNextEvent = dateDiffInDays(today,dateObj)
  } 

  return (
    <Link 
      href={`/app/machines/${id}`}
      className="flex relative justify-between items-center w-full hover:brightness-80 transition duration-300 bg-card px-10 py-5 rounded-[0.625rem] shadow-[0_3px_7px_rgba(0,0,0,0.25)]"
      >
          <p className='z-10 font-semibold'>{name}</p>
          <div className='flex absolute left-1/2 -translate-x-1/2 whitespace-nowrap'>
            <p>Scheduled Events:</p> &nbsp; <p className='font-normal'>{count}</p>
          </div>
          <div className='z-10'>
            <DateColour daysTillNextEvent={daysTillNextEvent} />
          </div>
    </Link>
  )
}
