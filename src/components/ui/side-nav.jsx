"use client"
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home } from "lucide-react"
import { TfiPanel } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUserCircleGearLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import LoadingBar from "react-top-loading-bar";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

const SideNavBar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const [progress, setProgress] = useState(0);
  const [sessionPanels, setSessionPanels] = useState(null);

  //logout function 
  const handleLogout = async () => {
    // destroy all session storage
    sessionStorage.clear();
  
    router.push('/');
  }
  useEffect(() => {
    setSessionPanels(JSON.parse(sessionStorage.getItem('panels')));''
  },[])

    const getLinkClass = (href) => {
        return pathname == href
            ? 'flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-muted transition-all hover:text-muted'
            : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-slate-100';
    };

    return (
      <>
        <LoadingBar color="#29d" progress={progress}  waitingTime={400} onLoaderFinished={() => {
         setProgress(100);
     }}/>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link href="/panels" className={getLinkClass('/panels')}>
                <TfiPanel className="h-4 w-4" />
                Panels
                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-400 text-black">
                {sessionPanels?.length || 0}
                </span>
            </Link>
            <Link href="/profile" className={getLinkClass('/profile')}>
                <PiUserCircleGearLight className="h-4 w-4" />
                Profile
            </Link>
            <Link href="/reset-password" className={getLinkClass('/reset-password')}>
                <RiLockPasswordLine className="h-4 w-4" />
                Reset Password
            </Link>
            <Button onClick={handleLogout} className="flex items-center gap-3 rounded-lg bg-white shadow-none justify-start px-3 py-2 text-red-400 transition-all hover:text-red-500 hover:bg-red-50">
                <IoLogOutOutline className="h-4 w-4" />
                Logout
            </Button>
        </nav>
      </>
    );
};

export default SideNavBar;
