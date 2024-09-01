import Link from "next/link"
import {
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MdOutlineWifiTethering } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdConstruction } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import TopNavBar from "@/components/ui/top-nav";
import Image from 'next/image';
import logo from "@/components/ui/img/logo.png";

export default function Page() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/20 md:block bg-zinc-600">
        <div className="flex h-full max-h-screen flex-col gap-2 bg-zinc-600">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 text-slate-300">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MdOutlineWifiTethering className="h-6 w-6"/>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Reset Password</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
              <MdConstruction className="mx-auto font-extrabold h-[50px] w-[50px]"/> Under Developement!
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start visit this once this service is implemented.
              </p>
              <Link href="/dashboard" className="mt-4 flex items-center text-xs font-bold rounded-lg bg-primary p-2 text-white hover:bg-slate-700"><MdKeyboardBackspace className="text-lg text-bolder mr-1"/> Go To Home</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
