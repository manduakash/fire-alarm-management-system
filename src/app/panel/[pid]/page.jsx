"use client"
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Search,

  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Package2,
  Users,
} from "lucide-react"
import { VscBellDot } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
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


export default function Page({ params }) {
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
            <h1 className="text-lg font-semibold md:text-2xl">Panel Details</h1>
          </div>
          <div
            className="flex flex-1 items-start rounded-lg border border-dashed shadow-md bg-white/40 backdrop-blur-md" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col flex-1 p-8">
              <div className="flex justify-between">
                <span className="font-bold font-mono text-md text-slate-600">Panel ID: {panel?.pid}</span>
                <small className="font-bold font-mono text-md text-slate-600">Last Sync: {panel?.updated_at && new Date(panel?.updated_at).toLocaleString()}</small>
              </div>
              <div className="h-[1px] py-0 w-100 bg-slate-200"></div>
              <div className="flex flex-1 flex-row py-4">
                <div className="flex-1 pr-5">
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Intrusion Power: </div><div>{(panel?.b0 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><MdOutlineOnlinePrediction className="inline mr-1 h-4 w-4" />Power ON</Badge>) : (panel?.b0 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><FaPowerOff className="inline mr-1" />Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Intrusion Alarm: </div><div>{(panel?.b1 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b1 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Fire Power: </div><div>{(panel?.b2 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><MdOutlineOnlinePrediction className="inline mr-1 h-4 w-4" />Power ON</Badge>) : (panel?.b2 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><FaPowerOff className="inline mr-1" />Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Fire Alarm: </div><div>{(panel?.b3 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b3 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Time Lock Power: </div><div>{(panel?.b4 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><MdOutlineOnlinePrediction className="inline mr-1 h-4 w-4" />Power ON</Badge>) : (panel?.b4 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><FaPowerOff className="inline mr-1" />Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Time Lock Alarm: </div><div>{(panel?.b5 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b5 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Bio-Metric Power: </div><div>{(panel?.b6 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><MdOutlineOnlinePrediction className="inline mr-1 h-4 w-4" />Power ON</Badge>) : (panel?.b6 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><FaPowerOff className="inline mr-1" />Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Bio-Metric Alarm: </div><div>{(panel?.b7 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b7 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><GiRingingAlarm className="inline mr-1 h-4 w-4" />Activated</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                </div>
                <div className="flex-1 pl-5">
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>DVR Power: </div><div>{(panel?.b8 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><MdOutlineOnlinePrediction className="inline mr-1 h-4 w-4" />Power ON</Badge>) : (panel?.b8 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><FaPowerOff className="inline mr-1" />Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>CCTV Status: </div><div>{(panel?.b9 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />OK</Badge>) : (panel?.b9 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><BiError className="inline mr-1 h-4 w-4" />Fault Detected</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>CCTV Connection: </div><div>{(panel?.b10 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiVideoCameraDuotone className="inline mr-1 h-4 w-4" />Connected</Badge>) : (panel?.b10 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><PiVideoCameraSlashDuotone className="inline mr-1 h-4 w-4" />Disconnected</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>HDD Health: </div><div>{(panel?.b11 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />OK</Badge>) : (panel?.b11 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><BiError className="inline mr-1 h-4 w-4" />Error Detected</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>HMS Health: </div><div>{(panel?.b12 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1"><BiError className="inline mr-1 h-4 w-4" />Issue Detected</Badge>) : (panel?.b12 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />OK</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Power Type: </div><div>{(panel?.b13 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1"><PiBatteryHighBold className="inline mr-1 h-4 w-4" />Battery ON</Badge>) : (panel?.b13 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><FaPlugCircleBolt className="inline mr-1 h-4 w-4" />Mains ON</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Battery Status: </div><div>{(panel?.b14 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><PiCheckCircleBold className="inline mr-1 h-4 w-4" />Normal</Badge>) : (panel?.b14 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1"><PiBatteryWarningDuotone className="inline mr-1 h-4 w-4" />Low</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Network Connection: </div><div>{(panel?.b15 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1"><BiWifi className="inline mr-1 h-4 w-4" />Connected to WIFI</Badge>) : (panel?.b15 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1"><MdNetworkCell className="inline mr-1 h-4 w-4" />Connected to GSM</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1"><FiWifiOff className="inline mr-1 h-4 w-4" />Not Connected (offline)</Badge>)}</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
