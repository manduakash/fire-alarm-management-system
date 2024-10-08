"use client"
import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdOutlineWifiTethering } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import TopNavBar from "@/components/ui/top-nav";
import { useEffect, useState } from "react";
import Image from 'next/image';
import logo from "@/components/ui/img/logo.png";

export default function Page() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    const name = sessionStorage?.getItem('name');
    const username = sessionStorage?.getItem('username');
    const userRole = sessionStorage?.getItem('userRole');
    const panels = JSON.parse(sessionStorage?.getItem('panels'));

    setName(name);
    setUsername(username);
    setUserRole(userRole);
    setPanels(panels);

    // destroy
    return () => {
      // cleanup
      setPanels([]);
    };
  }, []);
  return (
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 dashboard-bg">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border-[1.4px] border-white shadow-slate-400/70 shadow-inner bg-white/60 backdrop-blur-sm" x-chunk="dashboard-02-chunk-1"
          >

            <div className="flex-1 lg:w-full container">
              <div className="space-y-6">
                <form className="space-y-8 w-[60%]">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor=":reb:-form-item">Name</label>
                    <Input className="border-[1.5px] border-slate-400" type="text" value={name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor=":reb:-form-item">Username</label>
                    <Input className="border-[1.5px] border-slate-400" type="text" value={username} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor=":reb:-form-item">Role</label>
                    <Input className="border-[1.5px] border-slate-400" type="text" value={`${userRole == 1 ? 'Admin' : 'User'}`} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor=":reb:-form-item">Assigned Panels</label>
                    <Input className="border-[1.5px] border-slate-400" type="text" value={panels} readOnly />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
