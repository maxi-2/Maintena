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
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  locationName: z.string().min(2).max(50),
})

export function AddAreaForm({ closeDialog }:{ closeDialog:() => void }) {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    const supabase = createClient()
    
    const userData = supabase.auth.getUser()
    const { data: {user: {id}} } = await userData

    const { error } = await supabase
    .from("Location")
    .insert({user_id:id, location_name: values.locationName })

    if (!error) {
      closeDialog()
    }
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="locationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
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
        <Button disabled={form.formState.isSubmitting} className="bg-primary-teal text-neutral-white" type="submit">Submit</Button>
      </form>
    </Form>
  )
}