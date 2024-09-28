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
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
import logo from "@/components/ui/img/logo.png";

export default function Page() {
  const [logs, setLogs] = useState([]);
  const [panelIds, setPanelIds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedValue, setSelectedValue] = useState("default");
  
  const fetchLogsByPids = async (panelIds) => {
    try {
      // console.log("panelIds",panelIds);
      setIsLoading(true)

      const response = await fetch('https://www.cloud2-api.site/api/fetch-logs-by-pids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "pids": panelIds }),
      });

      const data = await response.json();
      const updatedData = data?.data?.map(log => ({ ...JSON.parse(log.changes), 'logged_at': log.logged_at }))

      // Define normal or ok states for each bit
      const normalStates = {
        b0: 0, b1: 0, b2: 0, b3: 0, b4: 0, b5: 0, b6: 0, b7: 0, b8: 0,
        b9: 0, b10: 0, b11: 0, b12: 1, b13: 1, b14: 0, b15: 1, b16: 0, 
        b17: 0, b18: 0, b19: 0, b20: 0, b21: 0, b22: 0, b23: 0
      };

      const abnormalState = {
        b01: 'Intrusion Power Off',
        b02: 'No Intrusion Panel Connected',
        b11: 'Intrusion Alarm',
        b12: 'Intrusion Panel not Connected',
        b21: 'Fire Power Off',
        b22: 'No Fire Panel Connected',
        b31: 'Fire Alarm',
        b32: 'Fire Panel not Connected',
        b41: 'Time Lock Power Off',
        b42: 'No Time Lock Connected',
        b51: 'Time Lock Alarm',
        b52: 'Time Lock Panel not Connected',
        b61: 'Bio-Metric Power Off',
        b62: 'No Bio-Metric Connected',
        b71: 'Bio-Metric Alarm',
        b72: 'Bio-Metric Panel not Connected',
        b81: 'Branch DVR Power Off',
        b82: 'Branch No DVR Connected',
        b91: 'Branch CCTV Tempered',
        b92: 'Branch CCTV Tempered Disable',
        b101: 'Branch CCTV Videoloss',
        b102: 'Branch CCTV Disable',
        b111: 'Branch HDD Error',
        b112: 'Branch HDD Not Connected',
        b121: 'HMS Health Issue',
        b131: 'Mains ON',
        b141: 'Battery Low',
        b151: 'Conneted To GSM',
        b161: 'Locker DVR Power Off',
        b162: 'Locker No DVR Connected',
        b171: 'Locker CCTV Tempered',
        b172: 'Locker CCTV Tempered Disable',
        b181: 'Locker CCTV Videoloss',
        b182: 'Locker CCTV Disable',
        b191: 'Locker HDD Error',
        b192: 'Locker HDD Not Connected',
        b201: 'Gold Loan DVR Power Off',
        b202: 'Gold Loan No DVR Connected',
        b211: 'Gold Loan CCTV Tempered',
        b212: 'Gold Loan CCTV Tempered Disable',
        b221: 'Gold Loan CCTV Videoloss',
        b222: 'Gold Loan CCTV Disable',
        b231: 'Gold Loan HDD Error',
        b232: 'Gold Loan HDD Not Connected',
      };

      // Create a new array of logs that only include abnormal states
  let abnormalLogs = updatedData?.map(log => {
    // Filter bits that are not in the normal states
    const abnormalStates = Object.keys(log)?.map(bit => {
      return ((bit.startsWith('b') && !bit.startsWith('bp') && log[bit] !== normalStates[bit])) ? { "panel": log['pid'], "state": abnormalState[bit+''+log[bit]] , "date": (new Date(log['logged_at'])).toDateString(), "time": (new Date(log['logged_at'])).toLocaleTimeString()} : null
    }).filter(log => log !== null);

    return abnormalStates;
  });

      console.log("abnormalLogs",abnormalLogs);
      data && setLogs(abnormalLogs?.length ? abnormalLogs.flat() : []);
      setIsLoading(false)

      return abnormalLogs;
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

  const handleValueChange = (panelId) => {
    setIsLoading(true)
    setSelectedValue(panelId);
    fetchLogsByPids([panelId === "default" ? panelIds : panelId]).then(abnormalLogs => {
      console.log('Abnormal Logs:', abnormalLogs);
    });
    setIsLoading(false)
  };

  useEffect(() => {
    
    const pids = JSON.parse(sessionStorage?.getItem('panels'));
    setPanelIds([...pids]);
    // console.log("pids",pids)
    // console.log("panelIds", panelIds);
  
    
    fetchLogsByPids(pids);

    // inteval of 30secs.
    const intervalId = setInterval(() => {
      handleValueChange('default');
      fetchLogsByPids(pids);
      }, 120000);

    // destroy
    return () => {
      // cleanup
      clearInterval(intervalId);
      setLogs([]);
    };
  }, [isRefresh])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = logs?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil(logs?.length / itemsPerPage) || 0;

   // Function to handle CSV download
   const handleDownloadCSV = () => {
    const csvData = logs?.map(log => ({
      panel: log.panel,
      state: log.state,
      date: log.date,
      time: log.time
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'panel_logs?.csv');
  };

   // Function to handle PDF download
   const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Panel ID", "Log", "Date", "Time",];
    const tableRows = [];

    logs?.forEach(log => {
      const logData = [
        log.panel,
        log.state,
        log.date,
        log.time
      ];
      tableRows.push(logData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Panel Logs", 14, 15);
    doc.save('panel_logs?.pdf');
  };

  const handleLogClear = async (pids) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.cloud2-api.site/api/delete-logs-by-pids', {
        method: 'DELETE', // or 'DELETE' if you are deleting logs
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pids }), // Use the pids array passed to the function
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Response data:', data);
  
      // Handle the response data as needed
      if (data.status === 1) {
        setIsRefresh(true);
        console.log('Logs fetched successfully:', data.data);
      } else {
        console.error('Error fetching logs:', data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Fetch error:', error);
    }
  };
  
  return (

    <>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-white/40 flex justify-center items-center z-[9999] top-0 overflow-hidden">
          <ScaleLoader color="#000" loading={true} size={15} className="mx-1" />
        </div>
      )}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/20 md:block bg-zinc-600">
          <div className="flex h-full max-h-screen flex-col gap-2 bg-zinc-600">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 text-slate-400">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <MdOutlineWifiTethering className="h-6 w-6" />
                <span className="">HMS Dashboard</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
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
          <main className="flex flex-1 flex-col p-x4 lg:px-6 dashboard-bg">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Panel Logs</h1>
            </div>
            <div
              className="flex flex-1 justify-center" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-1 flex-col gap-1 text-center p-2">
                <div className="flex justify-start mb-2 gap-2">
                <Button onClick={handleDownloadPDF}><FaFilePdf className="mr-1"/> Download PDF</Button>
                <Button onClick={handleDownloadCSV}><FaFileCsv className="mr-1"/>Download CSV</Button>
                <Select value={selectedValue} className="p-1" onValueChange={handleValueChange}>
                  <SelectTrigger className="w-[180px] border-[1.5px] border-black focus:ring-0">
                    <SelectValue placeholder="Select Panel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Panels</SelectLabel>
                      <SelectItem value="default">
                          All Panels
                        </SelectItem>
                      {panelIds?.map(panelId => (
                        <SelectItem key={panelId} value={panelId}>
                          Panel {panelId}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button variant="outline" className={`bg-red-100 hover:bg-red-200 border-[1px] border-red-400 ${(currentLogs?.length == 0) ? 'hidden' : ''}`} onClick={()=>handleLogClear(panelIds)}><MdDelete className="mr-1 w-4 h-4 text-red-500"/>Clear Log</Button>
                </div>
                <Table className="rounded-lg">
                  {/* <TableCaption>A list of panels you have been assigned for manage.</TableCaption> */}
                  <TableHeader className="rounded-lg">
                    <TableRow className="bg-zinc-500 hover:bg-zinc-500 text-center">
                      <TableHead className="text-center text-white/60">Panel</TableHead>
                      <TableHead className="text-center text-white/60">Log Type</TableHead>
                      <TableHead className="text-center text-white/60">Date</TableHead>
                      <TableHead className="text-center text-white/60">Time</TableHead>

                    </TableRow>
                  </TableHeader>
                  <TableBody className="rounded-lg">
                    {currentLogs?.length ?
                      currentLogs?.map((panel, index) => (
                        <TableRow className={`${(index % 2 == 0) ? 'bg-white/85' : 'bg-slate-100/90'}`} key={index}>
                          <TableCell>Panel-{panel.panel}</TableCell>
                          <TableCell>{panel.state}</TableCell>
                          <TableCell>{panel.date}</TableCell>
                          <TableCell>{panel.time}</TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No records available
                        </TableCell>
                      </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                  <Button
                  className="bg-zinc-500 hover:bg-zinc-400"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <Button
                    className="bg-zinc-500 hover:bg-zinc-400"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
