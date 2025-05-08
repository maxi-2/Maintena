import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";

import { createClient } from '@/lib/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }
  
  return (

    <div className="flex flex-col h-screen">

      <NavBar/>

      {children}
      
    </div> 
  
  );
}
