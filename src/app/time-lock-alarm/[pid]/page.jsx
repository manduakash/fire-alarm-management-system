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
import { Charts } from "@/components/ui/temp";
import { useRouter } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';
import { FaArrowLeftLong } from "react-icons/fa6";
import { CircularProgress } from "@mui/joy"
import { MdOutlineOfflineBolt } from "react-icons/md";
import ActiveAlarmChart  from "@/components/ui/ActiveAlarmChart"
import ACvsDCGraph  from "@/components/ui/ACvsDCGraph"

export default function Page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // back
  const handleBack = () => {
    setIsLoading(true);
    router.back();
  }
  const [panel, setPanel] = useState(null);
  const [panelAlarmCount, setPanelAlarmCount] = useState([]);
  useEffect(() => {

    const fetchPanel = async () => {

      try {
        setIsLoading(true)
        const response = await fetch(`https://www.cloud2-api.site/api/get-panel/${params.pid}`)
        const data = await response.json()
        console.log(data)
        data?.data && setPanel(data.data);
        if (data?.data?.updated_at && (Date.now() - new Date(data?.data?.updated_at).getTime() > 900000)) {
          setPanel({ ...data?.data, b0: "2", b1: "2", b2: "2", b3: "2", b4: "2", b5: "2", b6: "2", b7: "2", b8: "2", b9: "2", b10: "2", b11: "2", b11: "2", b12: "2", b13: "2", b14: "2", b15: "2" })
        }
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    const getDailyIntrusionAlarmCount = async () => {

      try {
        const response = await fetch(`https://www.cloud2-api.site/api/get-daily-intrusion-alarm-count/${params.pid}`)
        const data = await response.json()
        console.log(data)
        data && setPanelAlarmCount(data);

      } catch (error) {
        console.error(error)
      }
    }

    fetchPanel();
    getDailyIntrusionAlarmCount();

    //setinterval of 30secs.
    const interval = setInterval(() => {
      fetchPanel();
      getDailyIntrusionAlarmCount();
    }, 30000);

    // destroy
    return () => {
      // cleanup
      clearInterval(interval);
      setPanel(null);
      setPanelAlarmCount([]);
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
                <FaArrowLeftLong className="h-4 w-4" onClick={handleBack} />
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
              <h1 className="text-lg font-semibold md:text-2xl">Time-Lock Alarm Information:</h1>
            </div>
            <div className="grid w-full px-0">
              <div className="flex max-w-full flex-row flex-wrap items-start justify-evenly gap-2 p-3">
                <div className="grid gap-2 grid-cols-1 max-w-full">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent>
                      <h1 className="font-mono text-xl font-bold text-slate-500">Time-Lock Alarm Power</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full"></div>

                      {(panel?.b4 == 1 || panel?.b4 == 2) ? (<div className="flex py-5 px-3">
                        <div className="h-[50px] w-[50%] py-auto flex items-center px-1 mx-auto bg-red-100 border-2 border-red-200 rounded-full">
                          <div className="h-[40px] w-[40px] bg-red-400 rounded-full"></div><p className="text-sm mx-auto"> OFF</p>
                        </div>
                      </div>) :
                        (<div className="flex py-5 px-3">
                          <div className="h-[50px] w-[50%] py-auto flex items-center px-1 mx-auto bg-green-100 border-2 border-green-200 rounded-full">
                            <small className="text-sm mx-auto"> ON</small><div className="h-[40px] w-[40px] bg-green-400 rounded-full"></div>
                          </div>
                        </div>)}
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                      <CardDescription>
                        <small className="font-bold font-mono text-md text-slate-600">Last Sync<IoSyncCircle className="inline h-5 w-5 ml-0" />:
                          <span>{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid gap-2 grid-cols-1 max-w-full">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent className="pb-3">
                      <h1 className="font-mono text-xl font-bold text-slate-500">Time-Lock Alarm Status</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full"></div>

                      <div className="flex pt-5 px-0 gap-1 mb-0">
                        <div className={`basis-1/3 h-20 ${(panel?.b5 == 0) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Normal</div></div>
                        <div className={`basis-1/3 h-20 ${(panel?.b5 == 1) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Active</div></div>
                        <div className={`basis-1/3 h-20 ${(panel?.b5 == 2) ? 'bg-teal-600 text-slate-100' : 'bg-slate-300 text-slate-700'} justify-center items-center flex rounded-sm`}><div className="text-sm font-mono font-bold">Offline</div></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1 mt-0 pt-0">
                      <CardDescription className="py-0">
                        <small className="font-bold font-mono text-md text-slate-600">Last Sync<IoSyncCircle className="inline h-5 w-5 ml-0" />:
                          <span>{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>
                <div className="grid gap-2 grid-cols-1 max-w-full">
                  <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-1"
                  >

                    <CardContent className="pb-3">
                      <h1 className="font-mono text-xl font-bold text-slate-500">Panel Power Details</h1>
                      <div className="h-[1px] py-0 my-0 bg-slate-300 w-full flex-row flex"></div>
                      <div className="pt-5 px-0 gap-1 mb-0 flex flex-row">
                        <div className="w-[50%] flex flex-col">
                          <div className="w-full text-sm font-bold">Power Source:</div>
                          <div className="w-full text-sm">{(panel?.b13 == 0) ? 'Battery ON' : (panel?.b13 == 1) ? 'Mains ON' : 'Offline'}</div>
                          <div className="w-full text-sm font-bold">Power Type:</div>
                          <div className="w-full text-sm">{(panel?.b13 == 0) ? 'DC Type' : (panel?.b13 == 1) ? 'AC Type' : 'Offline'}</div>
                        </div>
                        <div>
                          {(panel?.b13 == 0) ? (
                            <CircularProgress size="lg" color={`${(panel?.bp > 20) ? 'primary' : 'danger'}`} determinate value={panel?.bp} sx={{ '--CircularProgress-size': '80px' }}>{panel?.bp} %</CircularProgress>)
                            : (panel?.b13 == 1) ? (<MdOutlineOfflineBolt className="h-[80px] w-[80px] text-yellow-500 animate-pulse" />) : (<FiWifiOff className="h-[80px] w-[80px] text-slate-400" />)
                          }
                        </div>
                      </div>


                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1 mt-0 pt-0">
                      <CardDescription className="py-0">
                        <small className="font-bold font-mono text-md text-slate-600">Last Sync<IoSyncCircle className="inline h-5 w-5 ml-0" />:
                          <span>{panel?.updated_at && new Date(panel?.updated_at).toDateString() + ", " + new Date(panel?.updated_at).toLocaleTimeString()}</span></small>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-2 grid-cols-1 w-[40%]">
                  <ActiveAlarmChart data={panelAlarmCount} className="max-w-sm" x-chunk="charts-01-chunk-1"/>
                </div>
             
                <div className="grid gap-2 grid-cols-1 w-[40%]">
                  <ACvsDCGraph className="max-w-sm" x-chunk="charts-01-chunk-1"/>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
