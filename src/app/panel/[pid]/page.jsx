"use client"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { FaArrowRightLong } from "react-icons/fa6";
import { PiFingerprintDuotone } from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";
import { PiFireExtinguisherDuotone } from "react-icons/pi";
import { PiChalkboardDuotone } from "react-icons/pi";
import { PiClockCountdownDuotone } from "react-icons/pi";
import { ScaleLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
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
        setIsLoading(true);
        const response = await fetch(`https://www.cloud2-api.site/api/get-panel/${params.pid}`)
        const data = await response.json()

        data?.data && setPanel(data.data);
        if (data?.data?.updated_at && (Date.now() - new Date(data?.data?.updated_at).getTime() > 900000)) {
          setPanel({ ...data?.data, b0: "2", b1: "2", b2: "2", b3: "2", b4: "2", b5: "2", b6: "2", b7: "2", b8: "2", b9: "2", b10: "2", b11: "2", b11: "2", b12: "2", b13: "2", b14: "2", b15: "2" })
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error)
      }
    }
    fetchPanel();

    // interval of 30s
    const intervalId = setInterval(() => {
      fetchPanel();
      }, 30000);

    // destroy
    return () => {
      // cleanup
      clearInterval(intervalId);
      setIsLoading(false);
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
              <span className="">HMS Dasboard</span>
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
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-slate-100">
          <div className="flex flex-col justify-between px-5">
                <h3 className="font-bold font-mono text-xl text-slate-600">Panel ID: {panel?.pid}</h3>
                <small className="font-bold font-mono text-md text-slate-600">Last Data Sync<IoSyncCircle className="inline h-5 w-5 ml-0" />: {panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</small>
              </div>
          <div className="flex flex-1 flex-row gap-4 flex-wrap justify-evenly">
            
            {/* Intrusion Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <MdOutlineOnlinePrediction className="inline mr-1 h-[4rem] w-[4rem] p-2 text-purple-400 bg-purple-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-purple-100 text-3xl">INTRUSION HEALTH</h1>
                </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">Alarm Status: {(panel?.b1 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b1 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/intrusion-alarm/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0 font-mono">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>

            {/* Fire Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <PiFireExtinguisherDuotone className="inline mr-1 h-[4rem] w-[4rem] p-2 text-orange-300 bg-orange-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-orange-100 text-3xl">FIRE HEALTH</h1>
                </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">Alarm Status: {(panel?.b3 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b3 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-2 w-2 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/fire-alarm/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>

            {/* TIME LOCK Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <PiClockCountdownDuotone className="inline mr-1 h-[4rem] w-[4rem] p-2 text-yellow-300 bg-yellow-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-yellow-100 text-3xl">TIME LOCK HEALTH</h1>
               </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">Alarm Status: {(panel?.b5 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b5 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-2 w-2 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/time-lock-alarm/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>

            {/* BIO-METRIC Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <PiFingerprintDuotone className="inline mr-1 h-[4rem] w-[4rem] p-2 text-green-400 bg-green-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-green-100 text-2xl">BIO-METRIC HEALTH</h1>
                </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">Alarm Status: {(panel?.b7 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b7 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-2 w-2 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/bio-metric-alarm/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>

            {/* DVR/NVR Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <GiCctvCamera className="inline mr-1 h-[4rem] w-[4rem] p-2 text-indigo-500 bg-indigo-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-3xl text-indigo-100">DVR/NVR HEALTH</h1>
                </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">DVR/NVR Status: {(panel?.b9 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />OK</Badge>) : (panel?.b9 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><BiError className="inline mr-1 h-4 w-4" />Fault Detected</Badge>) : (<Badge className="inline h-2 w-2 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/dvr-nvr/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>

            {/* HMS Alarm */}
            <Card
              className="md:w-[30%] sm:w-[90%] sm:mx-auto bg-slate-400 hover:bg-slate-400/90"
            >
              <CardContent className="flex gap-4 p-4">
                <div className="basis-1/4">
                  <PiChalkboardDuotone className="inline mr-1 h-[4rem] w-[4rem] p-2 text-red-400 bg-red-100 rounded-full" />
                </div>
                <div className="basis-3/4">
                  <h1 className="font-mono font-bold text-muted-foreground text-3xl text-red-50">HMS HEALTH</h1>
                </div>
              </CardContent>
              <small className="font-serif text-white p-2 inline-block py-3">HMS Status: {(panel?.b12 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><BiError className="inline mr-1 h-4 w-4" />Issue Detected</Badge>) : (panel?.b12 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />OK</Badge>) : (<Badge className="inline h-2 w-2 rounded-lg hover:bg-slate-400 bg-slate-300 text-gray-700 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected</Badge>)}</small>
              <CardFooter className="border-t p-2 text-center">
              <Button className="rounded-xl font-mono bg-slate-700 border"><Link href={`/hms/${params.pid}`} onClick={e => setIsLoading(true)} className="p-0">show more <FaArrowRightLong className="inline"/></Link></Button>
              </CardFooter>
            </Card>
        
          </div>
      
        </main>
      </div>
    </div>
    </>
  )
}
