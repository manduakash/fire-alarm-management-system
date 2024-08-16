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

export default function Page({params}) {
  const router = useRouter();
  const [panel, setPanel] = useState(null);
  useEffect(() => {
    fetchPanel();

    // destroy
    return () => {
      // cleanup
      setPanel(null);
    };
  },[]);

  const fetchPanel = async () => {
    try {
      console.log("pid", params.pid);
      const response = await fetch(`https://darkgreen-elk-140732.hostingersite.com/api/get-panel/${params.pid}`)
      const data = await response.json()
      console.log(data)
      data?.data && setPanel(data.data);
    } catch (error) {
      console.error(error)
    }
  }

  
  //logout function 
  const handleLogout = async () => {
    // destroy all session storage
    sessionStorage.clear();

    router.push('/');
  }
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
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Panel Details</h1>
          </div>
          <div
            className="flex flex-1 items-start rounded-lg border border-dashed shadow-md bg-white/30 backdrop-blur-md" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col flex-1 p-8">
              <p className="font-bold font-mono text-md text-slate-400">Panel ID: {panel?.pid}</p>
              <hr className="h-2"/>
              <div class="flex flex-1 flex-row py-4">
                <div className="flex-1 pr-5">
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b0):</span> {panel?.b0 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b1):</span> {panel?.b1 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b2):</span> {panel?.b2 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b3):</span> {panel?.b3 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b4):</span> {panel?.b4 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b5):</span> {panel?.b5 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b6):</span> {panel?.b6 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b7):</span> {panel?.b7 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                </div>
                <div className="flex-1 pl-5">
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b8):</span> {panel?.b8 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-5">(b9):</span> {panel?.b9 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-4">(b10):</span> {panel?.b10 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-4">(b11):</span> {panel?.b11 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-4">(b12):</span> {panel?.b12 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-4">(b13):</span> {panel?.b13 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                  <div className="flex flex-1 my-2 border-b-[1px]"><span>Alarm Status <span className="text-slate-400 text-sm mr-4">(b14):</span> {panel?.b14 == 0 ? (<Badge className="inline h-6 w-6 rounded-lg hover:bg-emerald-300 bg-emerald-300 text-black text-xs px-2 py-0">Normal</Badge>) : (<Badge className="inline h-6 w-6 rounded-lg hover:bg-red-300 bg-red-300 text-black text-xs px-2 py-0">Deactive</Badge>)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
