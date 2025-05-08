import React from 'react'
import { createClient } from '@/lib/server'
import Event from './Event';

export default async function EventsList({ id }:{ id:string }) {

    const supabase = await createClient();

      const { data } = await supabase
      .from('Event')
      .select( `
        name,
        due_date,
        id,
        creator:Profile!Event_creator_id_fkey (
          id,
          profile_name,
          role
        ),
        assignee:Profile!Event_assigned_to_id_fkey (
          id,
          profile_name,
          role
        )
      `)
      .eq("machine_id",id)

  return (


    data && data.length > 0 ? data.map((event,key)=>(
        <Event data={event} key={key}/>
    )) :
    <p>No events have been scheduled to this machine.</p>
          
  )
}
