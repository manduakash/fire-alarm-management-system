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


export default function Page() {
  const [logs, setLogs] = useState([]);
  const [panelIds, setPanelIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogsByPids = async () => {
    try {
      setIsLoading(true)
      const pids = JSON.parse(sessionStorage?.getItem('panels'));

      const response = await fetch('http://www.cloud2-api.site/api/fetch-logs-by-pids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "pids": pids }),
      });

      const data = await response.json();

      const updatedData = data?.data?.map(log => ({ ...JSON.parse(log.changes), 'logged_at': log.logged_at }))
      console.log('logs', updatedData)

      data && setLogs(updatedData);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };
  useEffect(() => {

    const pids = JSON.parse(sessionStorage?.getItem('panels'));
    setPanelIds(pids);
    console.log("panelIds", panelIds);
    
    fetchLogsByPids();

    // inteval of 30secs.
    const intervalId = setInterval(() => {
      fetchLogsByPids();
      }, 30000);

    // destroy
    return () => {
      // cleanup
      clearInterval(intervalId);
      setLogs([]);
    };
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = logs?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil(logs?.length / itemsPerPage) || 0;

   // Function to handle CSV download
   const handleDownloadCSV = () => {
    const csvData = logs?.map(log => ({
      pid: log.pid,
      intrusion_alarm: log.b1 == 1 ? 'Active State' : log.b1 == 0 ? 'Normal State' : 'Offline',
      fire_alarm: log.b3 == 1 ? 'Active State' : log.b3 == 0 ? 'Normal State' : 'Offline',
      time_lock_alarm: log.b5 == 1 ? 'Active State' : log.b5 == 0 ? 'Normal State' : 'Offline',
      bio_metric_alarm: log.b7 == 1 ? 'Active State' : log.b7 == 0 ? 'Normal State' : 'Offline',
      logged_at: log.logged_at,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'panel_logs?.csv');
  };

   // Function to handle PDF download
   const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Panel ID", "Intrusion Alarm", "Fire Alarm", "Time Lock Alarm", "Bio-Metric Alarm", "Logged at"];
    const tableRows = [];

    logs?.forEach(log => {
      const logData = [
        log.pid,
        log.b1 == 1 ? 'Active State' : log.b1 == 0 ? 'Normal State' : 'Offline',
        log.b3 == 1 ? 'Active State' : log.b3 == 0 ? 'Normal State' : 'Offline',
        log.b5 == 1 ? 'Active State' : log.b5 == 0 ? 'Normal State' : 'Offline',
        log.b7 == 1 ? 'Active State' : log.b7 == 0 ? 'Normal State' : 'Offline',
        log.logged_at,
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
        fetchLogsByPids();
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
        <div className="hidden border-r bg-muted/20 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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
            <div className="flex-1">
              <SideNavBar />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <TopNavBar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-100">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Panel Logs</h1>
            </div>
            <div
              className="flex flex-1 justify-center" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-1 flex-col gap-1 text-center p-5">
                <div className="flex justify-start mb-4 gap-2">
                <Button onClick={handleDownloadPDF}><FaFilePdf className="mr-1"/> Download PDF</Button>
                <Button onClick={handleDownloadCSV}><FaFileCsv className="mr-1"/>Download CSV</Button>
                <Button variant="outline" className={`bg-red-100 hover:bg-red-200 border-[1px] border-red-400 ${(currentLogs?.length == 0) ? 'hidden' : ''}`} onClick={()=>handleLogClear(panelIds)}><MdDelete className="mr-1 w-4 h-4 text-red-500"/>Clear Log</Button>
                </div>
                <Table className="rounded-lg">
                  {/* <TableCaption>A list of panels you have been assigned for manage.</TableCaption> */}
                  <TableHeader className="rounded-lg">
                    <TableRow className="bg-primary hover:bg-primary text-center">
                      <TableHead className="text-center text-white/60">Panel ID</TableHead>
                      <TableHead className="text-center text-white/60">Intrusion Alarm</TableHead>
                      <TableHead className="text-center text-white/60">Fire Alarm</TableHead>
                      <TableHead className="text-center text-white/60">Time Lock Alarm</TableHead>
                      <TableHead className="text-center text-white/60">Bio-Metric Alarm</TableHead>
                      <TableHead className="text-center text-white/60">Logged at</TableHead>

                    </TableRow>
                  </TableHeader>
                  <TableBody className="rounded-lg">
                    {currentLogs?.length ?
                      currentLogs?.map((panel, index) => (
                        <TableRow className={`${(index % 2 == 0) ? 'bg-white' : 'bg-slate-100'}`} key={index}>
                          <TableCell>{panel.pid}</TableCell>
                          <TableCell>{(panel.b1 == 1) ? 'Active State' : (panel.b1 == 0) ? 'Normal State' : 'Offline'}</TableCell>
                          <TableCell>{(panel.b3 == 1) ? 'Active State' : (panel.b3 == 0) ? 'Normal State' : 'Offline'}</TableCell>
                          <TableCell>{(panel.b5 == 1) ? 'Active State' : (panel.b5 == 0) ? 'Normal State' : 'Offline'}</TableCell>
                          <TableCell>{(panel.b7 == 1) ? 'Active State' : (panel.b7 == 0) ? 'Normal State' : 'Offline'}</TableCell>
                          <TableCell>{panel.logged_at}</TableCell>
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
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <Button
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
