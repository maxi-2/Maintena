"use client"

import { createClient } from "@/lib/client"

import { useRouter } from "next/navigation"
 
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

 
const formSchema = z.object({
  manufacturer: z.string().min(2).max(50),
  machineName: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  description: z.string()
})

type location = {
  id: number,
  location_name: string,
}

export function AddMachineForm({ closeDialog }:{ closeDialog:() => void }) {

  const router = useRouter()

  const [locations, setLocations] = useState<undefined | location[]>()
  
  const supabase = createClient()

  const getLocations = async () => {
    
    const { data } = await supabase.from("Location").select("id,location_name") 

    setLocations(data as location[])
  }
  
  useEffect(()=>{
    getLocations()
  },[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const selectedLocationIndex = locations?.find(location => location.location_name === values.location)

    const selectedLocationId = selectedLocationIndex ? selectedLocationIndex.id : undefined
    
    const userData = supabase.auth.getUser()
    const { data: {user: {id}} } = await userData

    const { error } = await supabase
    .from("Machine")
    .insert({location_id: selectedLocationId, user_id:id, machine_name: values.machineName, description: values.description, manufacturer: values.manufacturer})

    console.log(error)

    if (!error) {
      closeDialog()
      router.refresh()
      
    }
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="machineName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Name and/or model of your equipment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-white">
                  {locations?.map((location,key)=>(
                    <SelectItem value={location.location_name} key={key}>{location.location_name.charAt(0).toUpperCase() + location.location_name.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the workspace area this equipment is located.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine Description</FormLabel>
              <FormControl>
                <Textarea {...field}/>
              </FormControl>
              {/* <FormDescription>
                Name and/or model of your equipment.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} className="bg-primary-teal text-neutral-white" type="submit">Submit</Button>
      </form>
    </Form>
  )
}