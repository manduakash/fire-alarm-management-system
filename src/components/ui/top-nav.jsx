"use client"
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TfiPanel } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUserCircleGearLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import LoadingBar from "react-top-loading-bar";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    CircleUser,
    Home,
    Menu,
    Search
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";

const TopNavBar = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [progress, setProgress] = useState(0);
    //logout function 
    const handleLogout = async () => {
        // destroy all session storage
        sessionStorage.clear();

        router.push('/');
    }

    const getLinkClass = (href) => {
        return pathname == href
            ? 'flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-muted transition-all hover:text-muted'
            : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-slate-100';
    };

    return (
        <>
            <LoadingBar color="#29d" progress={progress} waitingTime={400} onLoaderFinished={() => {
                setProgress(100);
            }} />
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-2 text-lg font-medium py-10">
                            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/panels" className={getLinkClass('/panels')}>
                                <TfiPanel className="h-4 w-4" />
                                Panels
                                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-400 text-black">
                                    {JSON.parse(sessionStorage.getItem('panels')).length}
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
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search panels..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/profile">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reset-password">
                                Reset Password
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-400 hover:text-red-600 hover:bg-red-50 py-0"><Button className="my-0 p-0 w-full" variant="link" onClick={handleLogout}>Logout</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </>
    );
};

export default TopNavBar;
