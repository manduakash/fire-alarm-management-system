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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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

export default function Page({ params }) {
  const [panel, setPanel] = useState(null);
  useEffect(() => {

    const fetchPanel = async () => {

      try {
        const response = await fetch(`http://www.cloud2-api.site/api/get-panel/${params.pid}`)
        const data = await response.json()
        data?.data && setPanel(data.data);
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
              <span className="">Chandrani Group</span>
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
              <p className="font-bold font-mono text-md text-slate-600">Panel ID: {panel?.pid}</p>
              <div className="h-[1px] py-0 w-100 bg-slate-200"></div>
              <div className="flex flex-1 flex-row py-4">
                <div className="flex-1 pr-5">
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Intrusion Power: </div><div>{(panel?.b0 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Power ON</Badge>) : (panel?.b0 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Intrusion Alarm: </div><div>{(panel?.b1 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Normal</Badge>) : (panel?.b1 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Active</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Fire Power: </div><div>{(panel?.b2 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Power ON</Badge>) : (panel?.b2 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Fire Alarm: </div><div>{(panel?.b3 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Normal</Badge>) : (panel?.b3 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Active</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Time Lock Power: </div><div>{(panel?.b4 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Power ON</Badge>) : (panel?.b4 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Time Lock Alarm: </div><div>{(panel?.b5 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Normal</Badge>) : (panel?.b5 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Active</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Bio-Metric Power: </div><div>{(panel?.b6 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Power ON</Badge>) : (panel?.b6 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Bio-Metric Alarm: </div><div>{(panel?.b7 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Normal</Badge>) : (panel?.b7 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Active</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                </div>
                <div className="flex-1 pl-5">
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>DVR Power: </div><div>{(panel?.b8 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Power ON</Badge>) : (panel?.b8 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Power OFF</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>CCTV Status: </div><div>{(panel?.b9 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">OK</Badge>) : (panel?.b9 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Fault</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>CCTV Connection: </div><div>{(panel?.b10 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Connected</Badge>) : (panel?.b10 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Dis-Connect</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>HDD Health: </div><div>{(panel?.b11 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">OK</Badge>) : (panel?.b11 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Error</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>HMS Health: </div><div>{(panel?.b12 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-1">Issue</Badge>) : (panel?.b12 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">OK</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Power Type: </div><div>{(panel?.b13 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1">Battery ON</Badge>) : (panel?.b13 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Mains ON</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Battery Status: </div><div>{(panel?.b14 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Normal</Badge>) : (panel?.b14 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1">Low</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                  <div className="flex flex-1 my-2 py-1 border-b-[1px]"><div className="flex flex-1 justify-between pr-2"><div>Network Connection: </div><div>{(panel?.b15 == 0) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-1">Connected to WIFI</Badge>) : (panel?.b15 == 1) ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-yellow-300 bg-yellow-300 text-black text-xs px-2 py-1">GSM</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-slate-400 bg-slate-400 text-gray-200 text-xs px-2 py-1">Not Connected (offline)</Badge>)}</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
