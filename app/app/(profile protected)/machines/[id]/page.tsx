import React from 'react'
import { createClient } from '@/lib/server'
import EventsList from '@/components/EventsList'
import DeleteBtn from '@/components/DeleteBtn'
import ImageUpload from '@/components/ImageUpload';
import Image from 'next/image';

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
        .select("machine_name, manufacturer, description, image_path").eq("id", id).limit(1)

    const { data: imageURL, error: imageError} = await supabase
      .storage
      .from("machine-images")
      .createSignedUrl(data.image_path,60)


  return (
    <div className="flex flex-col gap-8 text-primary-dark w-full">
        <div className='flex flex-col gap-5'>
            
            <div className='flex gap-2 items-center'>
                <h1 className='text-xl font-medium mr-auto'>{data.manufacturer} {data.machine_name}</h1>
                <DeleteBtn machineId={id}/>
            </div>

            {imageURL ? 
            <Image src={imageURL.signedUrl}
            height={300}
            width={200}
            
            alt="User uploaded image of this current machine"
            loading='lazy'
            />
            :
            <p>No image has been assiged to this machine.</p>
            }
            
            <p>{data.description}</p>

            <ImageUpload machineId={id}/>

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
