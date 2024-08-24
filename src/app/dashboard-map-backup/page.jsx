"use client"
import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MdOutlineWifiTethering } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import TopNavBar from "@/components/ui/top-nav";
import { ScaleLoader} from 'react-spinners';
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

export default function Page() {
  useEffect(() => {
    const panels = sessionStorage?.getItem('panels');
   
    const fetchPanels = async () => {
      try {
        const pids = JSON.parse(panels);

        const response = await fetch('https://www.cloud2-api.site/api/fetch-panels-by-pids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"pids": pids}),
        })
        const data = await response.json()
        const updatedData = data?.data?.map(panel=>(Date.now() - new Date(panel.updated_at).getTime() > 900000) ? {...panel,"b15": 2} : panel); 
        data?.data && setPanels(updatedData);
      } catch (error) {
        console.error(error)
      }
    }

    fetchPanels();

    // destroy
    return () => {
      // cleanup
      setPanels([]);
    };
  }, []);
  const router = useRouter();
  const [panels, setPanels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBJtck0O9BxXGxOuhxeYSQOMgvmaJeF4NY',
  })

  if(!isLoaded){
    return <div>Loading...</div>
  }

  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-white/80 flex justify-center items-center z-[9999] top-0 overflow-hidden">
          <ScaleLoader color="#000" loading={true} size={15} className="mx-1"/>
        </div>
      )}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/20 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MdOutlineWifiTethering className="h-6 w-6" />
                <span className="">HMS Solutions</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                {/* <VscBellDot className="h-4 w-4" /> */}
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <SideNavBar />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <TopNavBar />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
         
           <GoogleMap center={{lat: 48.8584, lng: 2.2945}} zoom={15} mapContainerStyle={{width: '100%', height: '100%'}}></GoogleMap>
          </main>
        </div>
      </div>
    </>
  )
}
