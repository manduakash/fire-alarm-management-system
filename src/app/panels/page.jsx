"use client"
import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdOutlineWifiTethering } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import TopNavBar from "@/components/ui/top-nav";
import { ScaleLoader } from 'react-spinners';
import { TfiPanel } from "react-icons/tfi";

export default function Page() {
  const [panels, setPanels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const pids = JSON.parse(sessionStorage?.getItem('panels'));
        console.log("pids", pids);
        const response = await fetch('https://www.cloud2-api.site/api/fetch-panels-by-pids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"pids": pids}),
        })
        const data = await response.json()
        const updatedData = data?.data?.map(panel=>(Date.now() - new Date(panel.updated_at).getTime() > 900000) ? {...panel,b0: "2",b1: "2",b2: "2",b3: "2",b4: "2",b5: "2",b6: "2",b7: "2",b8: "2",b9: "2",b10: "2",b11: "2",b11: "2",b12: "2",b13: "2",b14: "2",b15: "2"} : panel); 
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
  }, [])

  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-white/40 flex justify-center items-center z-[9999] top-0 overflow-hidden">
          <ScaleLoader color="#000" loading={true} size={15} className="mx-1"/>
        </div>
      )}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/20 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MdOutlineWifiTethering className="h-6 w-6"/>
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
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 dashboard-bg">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Panels Signal</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center border-[1.4px] border-white shadow-slate-400/70 shadow-inner rounded-lg bg-white/60 backdrop-blur-sm" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-1 gap-1 text-center p-5">
                <Table className="rounded-lg border-slate-200 border-[1.8px] border-separate">
                  <TableCaption>A list of panels you have been assigned for manage.</TableCaption>
                  <TableHeader className="rounded-lg">
                    <TableRow className="bg-primary hover:bg-primary text-center">
                      <TableHead className="text-center text-white/60">ID</TableHead>
                      <TableHead className="text-center text-white/60">b0</TableHead>
                      <TableHead className="text-center text-white/60">b1</TableHead>
                      <TableHead className="text-center text-white/60">b2</TableHead>
                      <TableHead className="text-center text-white/60">b3</TableHead>
                      <TableHead className="text-center text-white/60">b4</TableHead>
                      <TableHead className="text-center text-white/60">b5</TableHead>
                      <TableHead className="text-center text-white/60">b6</TableHead>
                      <TableHead className="text-center text-white/60">b7</TableHead>
                      <TableHead className="text-center text-white/60">b8</TableHead>
                      <TableHead className="text-center text-white/60">b9</TableHead>
                      <TableHead className="text-center text-white/60">b10</TableHead>
                      <TableHead className="text-center text-white/60">b11</TableHead>
                      <TableHead className="text-center text-white/60">b12</TableHead>
                      <TableHead className="text-center text-white/60">b13</TableHead>
                      <TableHead className="text-center text-white/60">b14</TableHead>
                      <TableHead className="text-center text-white/60">b15</TableHead>
                
                      <TableHead className="text-center text-white/60">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="rounded-lg">
                    {panels?.length ?
                      panels.map((panel,index) => (
                      <TableRow className={`${(index % 2 == 0) ? 'bg-slate-100/90' : 'bg-slate-100/30'}`} key={index}>
                        <TableCell>{panel.pid}</TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b0 == 1) ? 'bg-red-500' : (panel.b0 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b1 == 1) ? 'bg-red-500' : (panel.b1 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b2 == 1) ? 'bg-red-500' : (panel.b2 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b3 == 1) ? 'bg-red-500' : (panel.b3 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b4 == 1) ? 'bg-red-500' : (panel.b4 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b5 == 1) ? 'bg-red-500' : (panel.b5 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b6 == 1) ? 'bg-red-500' : (panel.b6 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b7 == 1) ? 'bg-red-500' : (panel.b7 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b8 == 1) ? 'bg-red-500' : (panel.b8 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b9 == 1) ? 'bg-red-500' : (panel.b9 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b10 == 1) ? 'bg-red-500' : (panel.b10 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b11 == 1) ? 'bg-red-500' : (panel.b11 == 0) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b12 == 0) ? 'bg-red-500' : (panel.b12 == 1) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b13 == 0) ? 'bg-yellow-500' : (panel.b13 == 1) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b14 == 0) ? 'bg-green-500' : (panel.b14 == 1) ? 'bg-yellow-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        <TableCell><Badge className={`p-0 h-3 w-3 ${(panel.b15 == 0) ? 'bg-yellow-500' : (panel.b15 == 1) ? 'bg-green-500' : 'bg-gray-400'}`}></Badge></TableCell>
                        
                        <TableCell>
                          <Link className="text-sm" href={`/panel/${panel.pid}`} onClick={e=>setIsLoading(true)}><Button className="text-xs bg-blue-200 rounded-full p-[5px] hover:bg-blue-300" title="More Details" size="small" variant="link"><TfiPanel className="h-3 w-3" /></Button></Link>
                        </TableCell>

                      </TableRow>
                    ))
                  :  Array.from({ length: 6 },(_, i) => i + 1).map((_,index) => (
                    <TableRow className={`${(index % 2 == 0) && 'bg-slate-50'}`} key={index}>
                      <TableCell className="font-medium"><Skeleton className="h-4 w-[100%]" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-3 w-3" /></TableCell>
                      <TableCell><Skeleton className="mx-auto h-6 w-6 rounded-full" /></TableCell>

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
    </>
  )
}
