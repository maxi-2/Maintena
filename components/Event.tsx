"use client"

import React, { useState } from 'react'
import { EventType } from '@/new-types'
import DeleteEventBtn from './DeleteEventBtn'

export default function Event({ data } : { data:EventType }) {

  const [hover,setHover] = useState(false)

  return (
    <div className='flex flex-col gap-3 justify-between relative w-full bg-card px-10 py-5 rounded-[0.625rem] shadow-[0_3px_7px_rgba(0,0,0,0.25)]'
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
        
      <span className='font-semibold mr-auto'>{data.name}</span>

      <div
       className={`
        transition-opacity duration-300 ease-in-out
        ${hover ? 'opacity-100' : 'opacity-0'}
      `}
      >
        <DeleteEventBtn eventId={data.id} />
      </div>

      <span>Created By: {data.creator.profile_name} {`(${data.creator.role})`}</span>
      <span>Assiged to: {data.assignee.profile_name} {`(${(data.assignee.role)})`}</span>
      <span>Due: {data.due_date}</span>
    </div>
  )
}
