import DeleteAreaBtn from './DeleteAreaButton';
import Machine from './Machine'

import { createClient } from '@/lib/server'

type MachineAreaProps = {
  locationID: number,
  locationName: string,
}

export default async function MachineArea({locationID, locationName}:MachineAreaProps) {


  const supabase = await createClient();
    
  const { data } = await supabase
  .from('Machine')
  .select("id, machine_name, manufacturer")
  .eq("location_id",locationID)

  return (
    <div>
      <div className='flex gap-3 items-center mb-3 sm:mb-5'>
          <h1 className="text-xl font-medium">{locationName}</h1>
          { data && data.length === 0 &&
            <DeleteAreaBtn locationId={locationID}/> 
            }

      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-5 w-full">
      
          { data && data.length > 0
          ? data.map((machine,key) => (
            <Machine name={`${machine.manufacturer} ${machine.machine_name}`} id={machine.id} key={key}/>
          ))
          :<p>No equipement has been registered to this area.</p>}

      </div>
    </div>
  )
}
