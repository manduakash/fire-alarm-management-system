"use client";
import Link from "next/link";
import Image from 'next/image';
import "./globals.css";
import logo from "@/components/ui/img/logo.png";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaAt } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { ClipLoader } from 'react-spinners';

export default function Home() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async()=>{
    setIsLoading(true);
    setIsInvalidUsername(false);
    setIsInvalidPassword(false);

    username || setIsInvalidUsername(true);
    password || setIsInvalidPassword(true);

    if(username && password){
      
    try 
    {
      const response = await fetch('http://www.cloud2-api.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (response.ok) {
        const decoded_data = await response.json();
        console.log(decoded_data)
        decoded_data.data.user_id && sessionStorage.setItem('userId', decoded_data.data.user_id);
        decoded_data.data.role && sessionStorage.setItem('userRole', decoded_data.data.role);
        decoded_data.data.username && sessionStorage.setItem('username', decoded_data.data.username);
        decoded_data.data.name && sessionStorage.setItem('name', decoded_data.data.name);
        decoded_data.data.panels && sessionStorage.setItem('panels', decoded_data.data.panels);        

        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(`${errorData.message}`);
      }
    } catch (error) {
      console.log(error.message)
      setError('Failed to login, Internal server error');
    }
  }


    setIsLoading(false);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between login-bg-img">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex py-12 px-10">
        <Card className="mx-auto my-auto max-w-sm">
        <Image src={logo} width={80} height={80} className="img-circle rounded-lg mx-auto mt-3 pb-0" alt="logo"/>
          <CardHeader className="mt-0 pt-0">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
              {error && (
                <p className="text-red-500 text-sm mt-1"><FaCircleExclamation className="inline"/> <b>Login Failed:</b> {error}</p>
              )}
            <div className="grid gap-4 mt-3">
              <div className="grid gap-1">
                <Label htmlFor="email" className="my-1">Email</Label>
                <div className="flex">
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`rounded-e-none rounded-s-md ring-inset ${(isInvalidUsername && !username) && 'ring-1 ring-red-500 focus-visible:ring-red-500'}`}
                  />
                  <div className="bg-slate-200 px-3 ring-ring rounded-s-none rounded-e-md border-input flex items-center">
                    <FaAt className="text-slate-500" />
                  </div>
                </div>
                  {(isInvalidUsername && !username) && (
                    <p className="text-red-500 text-sm">Username is required!</p>
                  )}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password" className="my-1">Password</Label>
                </div>
                <div className="flex">
                  <Input
                    id="password"
                    type={`${isPasswordVisible ? 'text' : 'password'}`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`rounded-e-none rounded-s-md ring-inset ${(isInvalidPassword && !password) && 'ring-1 ring-red-500 focus-visible:ring-red-500'}`}
                  />
                  <div className="bg-slate-200 px-3 ring-ring rounded-s-none rounded-e-md border-input flex items-center">
                    {isPasswordVisible ? (
                      <FaRegEyeSlash
                        className="text-slate-500 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    ) : (
                      <FaRegEye
                        className="text-slate-500 cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )}
                  </div>
                </div>
                  {(isInvalidPassword && !password) && (
                    <p className="text-red-500 text-sm">Password is required!</p>
                  )}
              </div>
              <Button type="submit" className="w-full my-2 mb-4" onClick={handleLogin} disabled={isLoading}>
              { isLoading && (<ClipLoader color="#fff" loading={true} size={15} className="mx-1"/>) } Login 
              </Button>
            </div>

            {/* <div className="mt-4 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
            <Link href="#" className="inline-block text-sm">
              Forgot your password?
            </Link> */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
