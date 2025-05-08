import React from 'react'
import { createClient } from '@/lib/server';
import MachineArea from './MachineArea';

export default async function MachineList() {

  const supabase = await createClient();

  const { data } = await supabase
  .from('Location')
  .select('id, location_name')
   
  return (
    data && data.map((location,key)=>(
        <MachineArea locationID={location.id} locationName={location.location_name} key={key}/>
    ))
    
  )
}
