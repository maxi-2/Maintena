
import SideBar from "@/components/SideBar";

import ProfileGate from "@/components/ProfileGateway";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (

      <div className="flex flex-1 overflow-hidden">

        <SideBar/>

        <main className="flex-1 px-6 sm:px-12 md:px-18 xl:px-30 py-10 overflow-y-auto">
          <ProfileGate>
            {children}
          </ProfileGate>
        </main>
        
      </div>
  
  );
}
