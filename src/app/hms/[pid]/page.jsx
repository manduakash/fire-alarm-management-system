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
import { CircularProgress } from "@mui/joy"
import { MdOutlineOfflineBolt } from "react-icons/md";
import ActiveAlarmChart  from "@/components/ui/ActiveAlarmChart"
import ACvsDCGraph  from "@/components/ui/ACvsDCGraph"
import Image from 'next/image';
import logo from "@/components/ui/img/logo.png";

export default function Page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // back
  const handleBack = () => {
    setIsLoading(true);
    router.back();
  }
  const [panel, setPanel] = useState(null);
  const [powerDetails, setPowerDetails] = useState({ "battery": 0, "mains": 0});
  useEffect(() => {

    const fetchPanel = async () => {

      try {
        setIsLoading(true)
        const response = await fetch(`https://www.cloud2-api.site/api/get-panel/${params.pid}`)
        const data = await response.json()
        console.log(data)
        data?.data && setPanel(data.data);
        if (data?.data?.updated_at && (Date.now() - new Date(data?.data?.updated_at).getTime() > 900000)) {
          setPanel({ ...data?.data, b0: "2", b1: "2", b2: "2", b3: "2", b4: "2", b5: "2", b6: "2", b7: "2", b8: "2", b9: "2", b10: "2", b11: "2", b11: "2", b12: "3", b13: "2", b14: "2", b15: "2", b16: "2", b17: "2", b18: "2", b19: "2", b20: "2", b21: "2", b22: "2", b23: "2" })
        }
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
  
    
    const getPowerHours = async () => {

      try {
        const response = await fetch(`https://www.cloud2-api.site/api/power-hours/${params.pid}`)
        const data = await response.json()
        console.log(data)
        data && setPowerDetails({"battery": data.battery, "mains": data.mains});

      } catch (error) {
        console.error(error)
      }
    }

    fetchPanel();
    getPowerHours();

    //setinterval of 30secs.
    const interval = setInterval(() => {
      fetchPanel();
      getPowerHours();
    }, 30000);

    // destroy
    return () => {
      // cleanup
      clearInterval(interval);
      setPanel(null);
      getPowerHours({ "battery": 0, "mains": 0});
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
        <div className="hidden border-r bg-muted/20 md:block bg-zinc-600">
          <div className="flex h-full max-h-screen flex-col gap-2 bg-zinc-600">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 text-slate-300">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MdOutlineWifiTethering className="h-6 w-6" />
                <span className="">HMS Dashboard</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <FaArrowLeftLong className="h-4 w-4" onClick={handleBack} />
                {/* <VscBellDot className="h-4 w-4" /> */}
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 flex flex-col justify-between bg-zinc-600">
              <SideNavBar />
              <div className="mt-auto bottom-0 flex flex-row justify-between items-end">
                <Image src={logo} width={50} height={50} className="img-circle rounded-lg mx-auto mt-3 pb-0" alt="logo"/>
                <p className="text-xs text-slate-300 py-2">Copyright &copy; 2024 <a href="https://alarm-panel.online" className="underline">alarm-panel.online</a> <br></br>All rights reserved | develoved by ULTRON</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <TopNavBar />
          <main className="flex flex-1 flex-col gap-4 px-0 bg-slate-200">
            <div className="flex items-center px-4">
              <h1 className="text-lg font-semibold md:text-2xl">HMS Information:</h1>
            </div>
            <div className="grid w-full px-0">
              <div className="flex max-w-full flex-row flex-wrap items-start justify-evenly gap-5 p-3">
             
                <div className="grid gap-2 grid-cols-1 min-w-[45%]">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent className="pb-3">
                      <h1 className="font-mono text-xl font-bold text-slate-500">HMS Health</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full"></div>

                      <div className="flex pt-5 px-0 gap-1 mb-0">
                        <div className={`basis-1/4 h-20 ${ (panel?.b12 == 1) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">OK</div></div>
                        <div className={`basis-1/4 h-20 ${ (panel?.b12 == 0) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Issue</div></div>
                        <div className={`basis-1/4 h-20 ${ (panel?.b12 == 3) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-xs font-mono font-bold">Maintenanace</div></div>
                        <div className={`basis-1/4 h-20 ${ (panel?.b12 == 2) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Offline</div></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1 mt-0 pt-0">
                      <CardDescription className="py-0">
                        <small className="font-bold font-mono text-md text-slate-600">Updated at:
                          <span className="mx-1">{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid gap-2 grid-cols-1 min-w-[45%]">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent className="pb-3">
                      <h1 className="font-mono text-xl font-bold text-slate-500">Connection Status</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full"></div>

                      <div className="flex pt-5 px-0 gap-1 mb-0">
                        <div className={`basis-1/3 h-20 ${ (panel?.b15 == 0) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">GSM</div></div>
                        <div className={`basis-1/3 h-20 ${ (panel?.b15 == 1) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">WiFi</div></div>
                        <div className={`basis-1/3 h-20 ${ (panel?.b15 == 2) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Offline</div></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1 mt-0 pt-0">
                      <CardDescription className="py-0">
                        <small className="font-bold font-mono text-md text-slate-600">Updated at:
                          <span className="mx-1">{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid gap-2 grid-cols-1 min-w-[45%]">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent className="pb-3">
                      <h1 className="font-mono text-xl font-bold text-slate-500">Panel Power Details</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full flex-row flex"></div>
                      <div className="pt-5 px-0 gap-1 mb-0 flex flex-col">
                        <div className="w-[100%] flex flex-row">
                          <div className="w-full text-sm font-bold">Power Source:</div>
                          <div className="w-full text-sm">{(panel?.b13 == 0) ? 'Battery ON' : (panel?.b13 == 1) ? 'Mains ON' : 'Offline'}</div>
                          <div className="w-full text-sm font-bold">Power Type:</div>
                          <div className="w-full text-sm">{(panel?.b13 == 0) ? 'DC Type' : (panel?.b13 == 1) ? 'AC Type' : 'Offline'}</div>
                        </div>
                        <div className="flex justify-center items-center py-3">
                        {(panel?.b13 == 0) ? (
                          <CircularProgress size="lg" color={`${(panel?.bp > 20) ? 'primary' : 'danger' }`} determinate value={panel?.bp} sx={{ '--CircularProgress-size': '200px' }}>{panel?.bp} %</CircularProgress>)
                        : (panel?.b13 == 1) ? (<MdOutlineOfflineBolt className="h-[200px] w-[200px] text-yellow-500 animate-pulse" />) : (<FiWifiOff className="h-[200px] w-[200px] text-slate-400" />)
}
                        </div>
                      </div>
                      
             
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1 mt-0 pt-0">
                      <CardDescription className="py-0">
                        <small className="font-bold font-mono text-md text-slate-600">Updated at:
                          <span className="mx-1">{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid grid-cols-1 sm:w-[45%] px-0">
                  <ACvsDCGraph powerDetails={powerDetails} className="max-w-sm" x-chunk="charts-01-chunk-1"/>
                </div>
                
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
