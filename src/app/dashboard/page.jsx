"use client"
import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { VscBellDot } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { MdOutlineWifiTethering } from "react-icons/md";
import { TfiPanel } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUserCircleGearLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdConstruction } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import { PiBellSlashDuotone } from "react-icons/pi";
import { PiBellZDuotone } from "react-icons/pi";
import { PiBellRingingDuotone } from "react-icons/pi";
import { TbBellQuestion } from "react-icons/tb";
import { TbBellX } from "react-icons/tb";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import TopNavBar from "@/components/ui/top-nav";
import { ScaleLoader} from 'react-spinners';
import { FiWifiOff } from "react-icons/fi";


export default function Page() {
  const router = useRouter();
  const [panels, setPanels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const panels = sessionStorage?.getItem('panels');
   
    const fetchPanels = async () => {
      try {
        const pids = JSON.parse(panels);

        const response = await fetch('http://www.cloud2-api.site/api/fetch-panels-by-pids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"pids": pids}),
        })
        const data = await response.json()
        data?.data && setPanels(data.data);
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
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 dashboard-bg">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div
              className="flex flex-1 items-start rounded-lg border border-dashed shadow-sm bg-white/60 backdrop-blur-sm" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-wrap flex-row flex-1 p-8">

                {panels.length ? 
                panels.map((panel, index) => (
                  <div key={panel.id} className="basis-1/3 px-6 py-3">
                    <Card className="hover:bg-slate-100 w-100" x-chunk={`dashboard-01-chunk-${panel.id}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Panel #{++index}
                        </CardTitle>
                        {
                          (panel.b15 == null || panel.b15 == 2) ?
                          (<FiWifiOff className="h-6 w-6 text-red-400" title="offline"/>)
                            : (panel.b1 == 0 && panel.b3 == 1 && panel.b5 == 0 && panel.b7 == 0) ?
                              (<PiBellZDuotone className="h-6 w-6 text-emerald-300" title="Normal" />)
                              : (panel.b1 == 1 || panel.b3 == 1 || panel.b5 == 1 || panel.b7 == 1) ?
                                (<PiBellRingingDuotone className="h-6 w-6 text-red-500" title="Alarm Buzzing" />)
                                : (panel.b10 == 1 || panel.b9 == 1 || panel.b10 == 1 || panel.b11 == 1 || panel.b12 == 0 || panel.b14 == 1) ?
                                  (<TbBellQuestion className="h-6 w-6 text-yellow-500" title="Some Issue"/>)
                                  : (panel.b0 == 1 || panel.b2 == 1 || panel.b4 == 1 || panel.b6 == 1 || panel.b8 == 1) ?
                                    (<VscBellDot className="h-6 w-6 text-red-400" title="Alarm Power Off" />)
                                    : (<PiBellZDuotone className="h-6 w-6 text-emerald-300" title="Normal"/>)
                        }
                      </CardHeader>
                     
                      <CardContent className="pb-2">
                        <div className="text-2xl font-bold">Panel ID - {panel.pid}</div>
                        <p className="text-xs text-muted-foreground inline">
                          Status:
                        </p>
                        <Badge className={`inline mx-1 text-xs px-1 py-0 ${(panel.b15 == 0) ? 'hover:bg-yellow-300 bg-yellow-200' : (panel.b15 == 1) ? 'hover:bg-emerald-300 bg-emerald-200' : 'hover:bg-red-300 bg-red-200'} text-slate-600`}>{panel.b15 == 0 ? 'Connected to GSM' : panel.b15 == 1 ? 'Connected to WiFi' : 'Panel Offline'}</Badge>
                      </CardContent>
                        <div className="h-[0.025rem] w-100 mb-2 mt-0 py-0 bg-slate-500"></div>
                        <div className="flex flex-1 justify-center"><Button size="small" variant="outline" className="mb-1 rounded-full text-center text-xs text-slate-700 hover:text-blue-600 hover:bg-slate-200 hover:border-slate-300"><Link href={`/panel/${panel.pid}`} onClick={e=>setIsLoading(true)} className="px-0 block mx-2 my-1">more info</Link></Button></div>
                    </Card>
                  </div>
                ))
                : 
                Array.from({ length: 6 }, (_, i) => i + 1).map((data, index) => (
                  <div key={++index} className="basis-1/3 px-6 py-3">
      
                    <Card className="hover:bg-slate-100 py-3" x-chunk={`dashboard-01-chunk-${++index}`}>
                      <CardContent className="py-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-2 w-[30%]" />
                          <Skeleton className="h-[15px] w-[15px] rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-[100%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-2 w-[30%]" />
                      </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
                }

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
