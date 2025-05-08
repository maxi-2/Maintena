import React from 'react'
import { createClient } from '@/lib/server'
import EventsList from '@/components/EventsList'
import DeleteBtn from '@/components/DeleteBtn'



type PageProps = {
    params: Promise<{
      id: string;
    }>;
  };
  
  // Then update your function signature to handle the Promise:
  export default async function Page({ params }: PageProps) {
    const { id } = await params; // Note the await here

    const supabase = await createClient()

    const { data: [ data ] } = await supabase
        .from("Machine")
        .select("machine_name, manufacturer, description").eq("id", id).limit(1)

  return (
    <div className="flex flex-col gap-8 text-primary-dark w-full">
        <div className='flex flex-col gap-5'>
            
            <div className='flex gap-2 items-center'>
                <h1 className='text-xl font-medium mr-auto'>{data.manufacturer} {data.machine_name}</h1>
                <DeleteBtn machineId={id}/>
            </div>
            
            <p>{data.description}</p>

        </div>

            <div className='flex flex-col gap-5'>
                <h1 className='text-xl font-medium'>Scheduled Events</h1>

                <div className='grid grid-cols-2 gap-5'>
                    <EventsList id={id}/>
                </div>
            </div>

        
        
    </div>
    
  )
}
