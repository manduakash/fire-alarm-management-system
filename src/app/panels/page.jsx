"use client"
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Search,
  MoreHorizontal,
} from "lucide-react"
import { VscBellDot } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import TopNavBar from "@/components/ui/top-nav";

export default function page() {
  const [panels, setPanels] = useState([]);
  useEffect(() => {
    fetchPanels();

    // destroy
    return () => {
      // cleanup
      setPanels([]);
    };
  }, [])

  const fetchPanels = async () => {
    try {
      const pids = JSON.parse(sessionStorage.getItem('panels'));
      console.log("pids", pids);
      const response = await fetch('https://darkgreen-elk-140732.hostingersite.com/api/fetch-panels-by-pids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"pids": pids}),
      })
      const data = await response.json()
      console.log(data)
      data?.data && setPanels(data.data);
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/20 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MdOutlineWifiTethering className="h-6 w-6"/>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Panels</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-1 gap-1 text-center p-5">
              <Table>
                <TableCaption>A list of panels you have been assign for manage.</TableCaption>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary text-center">
                    <TableHead className="text-center text-white/60">Serial No.</TableHead>
                    <TableHead className="text-center text-white/60">Panel ID</TableHead>
                    <TableHead className="text-center text-white/60">Status(b0)</TableHead>
                    <TableHead className="text-center text-white/60">Status(b1)</TableHead>
                    <TableHead className="text-center text-white/60">Status(b2)</TableHead>
                    <TableHead className="text-center text-white/60">Status(b3)</TableHead>
                    <TableHead className="text-center text-white/60">Status(b4)</TableHead>
             
                    <TableHead className="text-center text-white/60">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {panels?.length ?
                   panels.map((panel,index) => (
                    <TableRow className={`${(index % 2 == 0) && 'bg-slate-50'}`} key={index}>
                      <TableCell className="font-medium">Panel #{++index}</TableCell>
                      <TableCell>{panel.pid}</TableCell>
                      <TableCell>
                        <Badge className={`py-0 ${(panel.b0 == 1) ? 'bg-red-500' : (panel.b0 == 0) ? 'bg-green-500' : 'bg-yellow-400'}`}>{panel.b0}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`py-0 ${(panel.b1 == 1) ? 'bg-red-500' : (panel.b1 == 0) ? 'bg-green-500' : 'bg-yellow-400'}`}>{panel.b1}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`py-0 ${(panel.b2 == 1) ? 'bg-red-500' : (panel.b2 == 0) ? 'bg-green-500' : 'bg-yellow-400'}`}>{panel.b2}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`py-0 ${(panel.b3 == 1) ? 'bg-red-500' : (panel.b3 == 0) ? 'bg-green-500' : 'bg-yellow-400'}`}>{panel.b3}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`py-0 ${(panel.b4 == 1) ? 'bg-red-500' : (panel.b4 == 0) ? 'bg-green-500' : 'bg-yellow-400'}`}>{panel.b4}</Badge>
                      </TableCell>
                     
                      <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem><Link href={`/panel/${panel.pid}`}>More Details</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                    </TableRow>
                  ))
                :  Array.from({ length: JSON.parse(sessionStorage.getItem('panels')).length },(_, i) => i + 1).map((_,index) => (
                  <TableRow className={`${(index % 2 == 0) && 'bg-slate-50'}`} key={index}>
                    <TableCell className="font-medium"><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100%]" /></TableCell>

                  </TableRow>
                ))
                }
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
