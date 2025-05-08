import React from 'react'
import { cn } from '@/lib/utils'

export default function DateColour({ daysTillNextEvent }:{ daysTillNextEvent:number }) {

    let colour = ""

    if (daysTillNextEvent < 4) {
        colour = "bg-red-400"
    } else if (daysTillNextEvent < 8) {
        colour = "bg-yellow-400"
    } else {
        colour = "bg-green-400"
    }

  return (
    <div className="flex gap-4 items-center">
        <p>Next Event:</p>
        {daysTillNextEvent ? 
            <p className={cn("py-1 px-2 rounded-[0.625rem] text-neutral-white font-semibold",colour)}>{daysTillNextEvent}&nbsp;Days</p> 
            : <p className='bg-gray-500 py-1 px-2 rounded-[0.625rem] text-neutral-white font-semibold'>N/A</p>}
    </div>

  )
}
