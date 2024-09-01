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
import { ScaleLoader } from 'react-spinners';

const SideNavBar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionPanels, setSessionPanels] = useState(null);

  //logout function 
  const handleLogout = async () => {
    // destroy all session storage
    sessionStorage.clear();
    setIsLoading(true);
    router.push('/');
  }
  // back
  const handleBack = () => {
    router.back();
  }
  useEffect(() => {
    setSessionPanels(JSON.parse(sessionStorage.getItem('panels')));
    return ()=>{
      setSessionPanels(null);
    }
  },[])

    const getLinkClass = (href) => {
        return pathname == href
            ? 'flex items-center gap-3 rounded-lg bg-primary mt-2 px-3 py-2 text-muted transition-all hover:text-muted'
            : 'flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-muted-foreground transition-all hover:text-primary bg-slate-200 hover:bg-slate-300';
    };

    return (
      <>
        {isLoading && (
          <div className="w-screen h-screen fixed bg-white/80 flex justify-center items-center z-[9999] top-0 overflow-hidden">
            <ScaleLoader color="#000" loading={true} size={15} className="mx-1"/>
          </div>
        )}
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link href="/dashboard" onClick={e=>setIsLoading(true)} className={getLinkClass('/dashboard')}>
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link href="/panels" onClick={e=>setIsLoading(true)} className={getLinkClass('/panels')}>
                <TfiPanel className="h-4 w-4" />
                All Panels Log
            </Link>
            <Link href="/profile" onClick={e=>setIsLoading(true)} className={getLinkClass('/profile')}>
                <PiUserCircleGearLight className="h-4 w-4" />
                User Profile
            </Link>
            {/* <Link href="/reset-password" onClick={e=>setIsLoading(true)} className={getLinkClass('/reset-password')}>
                <RiLockPasswordLine className="h-4 w-4" />
                Reset Password
            </Link> */}
            <Button onClick={handleLogout} className="flex items-center gap-3 mt-2 rounded-lg bg-red-50 shadow-none justify-start px-3 py-2 text-red-400 transition-all hover:text-red-500 hover:bg-red-100">
                <IoLogOutOutline className="h-4 w-4" />
                Logout
            </Button>
        </nav>
      </>
    );
};

export default SideNavBar;
