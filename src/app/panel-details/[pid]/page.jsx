"use client"
import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MdOutlineWifiTethering } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import { useEffect, useState } from "react";
import TopNavBar from "@/components/ui/top-nav";
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { PiCheckCircleBold } from "react-icons/pi";
import { PiBatteryHighBold } from "react-icons/pi";
import { PiBatteryWarningDuotone } from "react-icons/pi";
import { FaPlugCircleBolt } from "react-icons/fa6";
import { BiWifi } from "react-icons/bi";
import { MdNetworkCell } from "react-icons/md";
import { FiWifiOff } from "react-icons/fi";
import { GiRingingAlarm } from "react-icons/gi";
import { PiVideoCameraSlashDuotone } from "react-icons/pi";
import { PiVideoCameraDuotone } from "react-icons/pi";
import { BiError } from "react-icons/bi";
import { IoSyncCircle } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import { FaArrowLeftLong } from "react-icons/fa6";


export default function Page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // back
  const handleBack = () => {
   setIsLoading(true);
   router.back();
  }
  const [panel, setPanel] = useState(null);
  useEffect(() => {

    const fetchPanel = async () => {

      try {
        const response = await fetch(`https://www.cloud2-api.site/api/get-panel/${params.pid}`)
        const data = await response.json()

        data?.data && setPanel(data.data);
        if(data?.data?.updated_at && (Date.now() - new Date(data?.data?.updated_at).getTime() > 900000) ) {
         setPanel({...data?.data, b0: "2",b1: "2",b2: "2",b3: "2",b4: "2",b5: "2",b6: "2",b7: "2",b8: "2",b9: "2",b10: "2",b11: "2",b11: "2",b12: "2",b13: "2",b14: "2",b15: "2"}) 
        }

      } catch (error) {
        console.error(error)
      }
    }

    fetchPanel();

    // destroy
    return () => {
      // cleanup
      setPanel(null);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-white/80 flex justify-center items-center z-[9999] top-0 overflow-hidden">
          <ScaleLoader color="#000" loading={true} size={15} className="mx-1" />
        </div>
      )}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/20 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MdOutlineWifiTethering className="h-6 w-6" />
                <span className="">HMS Dashboard</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <FaArrowLeftLong className="h-4 w-4" onClick={handleBack}/>
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
          <main className="flex flex-1 flex-col gap-4 px-0 bg-slate-200">
            <div className="flex items-center px-4">
              <h1 className="text-lg font-semibold md:text-2xl">Panel Details</h1>
            </div>
            <div className="grid w-full px-0">
              <div className="flex max-w-full flex-row flex-wrap items-start justify-evenly gap-4 p-3">
                <div className="grid gap-2 grid-cols-1 max-w-full">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >
                    
                    <CardContent>
                      
                      <div className="flex py-5">
                        <div className="h-[50px] w-[50%] py-auto flex items-center px-1 mx-auto bg-red-100 border-2 border-red-200 rounded-full">
                          <div className="h-[40px] w-[40px] bg-red-400 rounded-full"></div><p className="text-sm mx-auto">POWER OFF</p>
                        </div>
                      </div>
                      <div className="flex py-5">
                        <div className="h-[50px] w-[50%] py-auto flex items-center px-1 mx-auto bg-green-100 border-2 border-green-200 rounded-full">
                          <small className="text-sm mx-auto">POWER ON</small><div className="h-[40px] w-[40px] bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                      <CardDescription>
                      <small className="font-bold font-mono text-md text-slate-600">Last Sync<IoSyncCircle className="inline h-5 w-5 ml-0" />:
                        <span>{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid max-w-full gap-2 grid-cols-1">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-0"
                  >
                    <CardHeader className="space-y-0 pb-2">
                      <CardDescription>Today</CardDescription>
                      <CardTitle className="text-4xl tabular-nums">
                        12,584{" "}
                        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                          steps
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                      <CardDescription>
                        Over the past 7 days, you have walked{" "}
                        <span className="font-medium text-foreground">53,305</span> steps.
                      </CardDescription>
                      <CardDescription>
                        You need{" "}
                        <span className="font-medium text-foreground">12,584</span> more
                        steps to reach your goal.
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
