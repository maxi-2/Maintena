"use client"

import { createClient } from "@/lib/client"
 
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

import { profile } from "@/new-types"

import { useRouter } from "next/navigation"

import { useProfileStore } from "@/store/store"

const formSchema = z.object({
  eventName: z.string().min(2).max(50),
  date: z.date(),
  profile: z.string()
})

export function EventForm({ closeDialog }:{ closeDialog:() => void }) {

    const { profile: currentProfileObj } = useProfileStore() 

    const router = useRouter()

    const pathname = usePathname()
    const machineId = pathname.split("/")[3]

    const [profiles, setProfiles] = useState<undefined | profile[]>()
      
    const supabase = createClient()
    
    const getProfiles = async () => {
        const { data } = await supabase.from("Profile").select("id,role,profile_name") 
        setProfiles(data)
    }
      
    useEffect(()=>{
        getProfiles()
    },[])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        eventName: "",
        date: undefined, // or new Date() if you want a default
      }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    const supabase = createClient()
    
    const userData = supabase.auth.getUser()
    const { data: {user: {id}} } = await userData

    if (currentProfileObj) {
      const { error } = await supabase
      .from("Event")
      .insert({
          user_id:id,
          name: values.eventName,
          machine_id:machineId,
          due_date: values.date,
          creator_id: currentProfileObj.id,
          assigned_to_id: values.profile
      })

      if (!error) {
        closeDialog()
        router.refresh()
  
      }
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
                Type a name for this event
              </FormDescription> */}
              <FormMessage />
            </FormItem>  
          )}
        />

        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectContent className="bg-neutral-white">
                  {profiles?.map((profile,key)=>(
                    <SelectItem value={profile.id.toString()} key={key}>{profile.profile_name.charAt(0).toUpperCase() + profile.profile_name.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
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