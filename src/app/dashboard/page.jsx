"use client";
import React, { useState, useEffect, useRef } from "react";
import { VscBellDot } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScaleLoader } from 'react-spinners';
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdOutlineWifiTethering } from "react-icons/md";
import SideNavBar from "@/components/ui/side-nav";
import TopNavBar from "@/components/ui/top-nav";
import { useRouter } from 'next/navigation';
import { ImLocation2 } from "react-icons/im";
import { FiWifiOff } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiRingingAlarm } from "react-icons/gi";
import { TbBellQuestion } from "react-icons/tb";
import { PiBellZDuotone } from "react-icons/pi";
import { HiInformationCircle } from "react-icons/hi";
import { FaRegBellSlash } from "react-icons/fa6";


export default function Page() {
  const router = useRouter();
  const [panels, setPanels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [mapType, setMapType] = useState("MAP");
  const [playSound, setPlaySound] = useState(false);
  
  // Initial viewport settings
  const [viewport, setViewport] = useState({
    latitude: 22.521546,
    longitude: 88.359133,
    zoom: 9,
    width: '100%',
    height: '500px' // Adjust height as needed
  });
  
  // Single marker's position and details
  const marker = {
    latitude: 22.521546,
    longitude: 88.359133,
    name: 'My Marker'
  };
  
  const audioRef = useRef(null);

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaySound(false);
    }
  };

  useEffect(() => {
   
    const panels = sessionStorage?.getItem('panels');
  
    const fetchPanels = async () => {
      try {
        setIsLoading(true);
        const pids = JSON.parse(panels);
        const response = await fetch('https://www.cloud2-api.site/api/fetch-panels-by-pids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "pids": pids }),
        });
        const data = await response.json();
        const updatedData = data?.data?.map(panel => 
          (Date.now() - new Date(panel.updated_at).getTime() > 900000) ? { ...panel, "b15": 2 } : panel
        );
        data?.data && setPanels(updatedData);
        const someData = updatedData.filter((panel) => (panel.b15 != 2 && (panel.b1 == 1 || panel.b3 == 1 || panel.b5 == 1 || panel.b7 == 1)));

        if (someData?.length) {
          audioRef.current.loop = true;
          audioRef.current.play(); // Play the sound when the state changes to true
          setPlaySound(true)
        }else{
          audioRef.current.pause();
          setPlaySound(false)
        }
        // Create an audio object
        
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    // Initial fetch
    fetchPanels();
  
    // Set up interval to fetch every 30 seconds
    const intervalId = setInterval(fetchPanels, 30000);
    
    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      setPanels([]);
      setPlaySound(false);
    };
  }, []);


  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-white/80 flex justify-center items-center z-[9999] top-0 overflow-hidden">
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
          <main className="flex flex-1 flex-col gap-4 md:gap-8 h-100 w-100">
            <ReactMapGl
            initialViewState={viewport}
              mapboxAccessToken="pk.eyJ1IjoibWFuZHVha2FzaDAzIiwiYSI6ImNtMDczY2NmNDBqZHcycXM0dzJtNnE5MHYifQ.-7ziTwgupnEPX3P6nxLdCw"
              width="100%"
              height="100%"
              transitionDuration='200'
              mapStyle={`${mapType == 'MAP' ? 'mapbox://styles/mapbox/streets-v12' : 'mapbox://styles/mapbox/satellite-streets-v12' }`}
              onViewportChange={(Viewport) => setViewport(Viewport)}
              options={{
                zoomControl: true,
                scrollZoom: true,
                dragRotate: true
              }}
            >
              <div className="absolute p-3 z-[1]">
                <Button className="inline-block" variant={`${mapType == 'MAP' ? 'outline' : '' }`} onClick={()=>setMapType("MAP")}><FaMapLocationDot className={`${mapType != 'MAP' ? 'hidden' : '' } mr-1 inline`} />Map</Button>
                <Button className="inline-block mx-1" variant={`${mapType == 'SATELLITE' ? 'outline' : '' }`} onClick={()=>setMapType("SATELLITE")}> <FaMapLocationDot className={`${mapType != 'SATELLITE' ? 'hidden' : '' } mr-1 inline`} />Satellite</Button>
                <audio ref={audioRef} src="assets/sound/736979_15119557-lq.mp3"/>
                
                <Button title="mute alarm (if ringing)" className={`inline-block bg-red-100 hover:bg-red-200 border-[1px] border-red-400 `} variant="outline" onClick={()=>handlePause()}> <FaRegBellSlash className="inline"/></Button>
              </div>
              
              {panels.length ? 
  panels.map((panel, index) => (
    <React.Fragment key={index}>
      { (panel.b1 == 1 || panel.b3 == 1 || panel.b5 == 1 || panel.b7 == 1) ?? setPlaySound(true)}
      <Marker
        latitude={parseFloat(panel.lat)}
        longitude={parseFloat(panel.lon)}
        anchor="bottom"
      >
        <button
          className="marker temporary-marker p-2 rounded"
          onClick={() => setShowPopup(index)}
        >
          {
                  panel.b15 === null || panel.b15 === 2 ?
                  (<ImLocation2 className="h-8 w-8 text-slate-400" title={`panel ${panel.pid}: offline`}/>)
                  : panel.b1 === 1 || panel.b3 === 1 || panel.b5 === 1 || panel.b7 === 1 ?
                    (<ImLocation2 className="h-8 w-8 text-red-500 animate-bounce" title={`panel ${panel.pid}: Alarm Buzzing`} />)
                  : panel.b1 === 0 && panel.b3 === 1 && panel.b5 === 0 && panel.b7 === 0 ?
                    (<ImLocation2 className="h-8 w-8 text-emerald-500" title={`panel ${panel.pid}: Normal`} />)
                      : panel.b10 === 1 || panel.b9 === 1 || panel.b10 === 1 || panel.b11 === 1 || panel.b12 === 0 || panel.b14 === 1 ?
                        (<ImLocation2 className="h-8 w-8 text-yellow-500 animate-pulse" title={`panel ${panel.pid}: Some Issue`}/>)
                        : panel.b0 === 1 || panel.b2 === 1 || panel.b4 === 1 || panel.b6 === 1 || panel.b8 === 1 ?
                          (<ImLocation2 className="h-8 w-8 text-red-500 animate-pulse" title={`panel ${panel.pid}: Alarm Power Off`} />)
                          : (<ImLocation2 className="h-8 w-8 text-emerald-500" title={`panel ${panel.pid}: Normal`}/>)
                }
        </button>
      </Marker>

      {showPopup === index && (
        <Popup
          className="p-0"
          latitude={parseFloat(panel.lat)}
          longitude={parseFloat(panel.lon)}
          onClose={() => setShowPopup(null)}
          closeButton={true}
          closeOnClick={false}
          offsetTop={-30}
        >
          <div className="p-0 m-0 rounded-sm">
            <Card className="w-100 rounded-sm" x-chunk={`dashboard-01-chunk-${panel.id}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Panel #{index + 1}
                </CardTitle>
                {
                  panel.b15 === null || panel.b15 === 2 ?
                  (<FiWifiOff className="h-6 w-6 text-red-400" title="offline"/>)
                  : panel.b1 === 0 && panel.b3 === 1 && panel.b5 === 0 && panel.b7 === 0 ?
                    (<PiBellZDuotone className="h-6 w-6 text-emerald-400" title="Normal" />)
                    : panel.b1 === 1 || panel.b3 === 1 || panel.b5 === 1 || panel.b7 === 1 ?
                      (<GiRingingAlarm className="h-6 w-6 text-red-500" title="Alarm Buzzing" />)
                      : panel.b10 === 1 || panel.b9 === 1 || panel.b10 === 1 || panel.b11 === 1 || panel.b12 === 0 || panel.b14 === 1 ?
                        (<TbBellQuestion className="h-6 w-6 text-yellow-400" title="Some Issue"/>)
                        : panel.b0 === 1 || panel.b2 === 1 || panel.b4 === 1 || panel.b6 === 1 || panel.b8 === 1 ?
                          (<VscBellDot className="h-6 w-6 text-red-500" title="Alarm Power Off" />)
                          : (<PiBellZDuotone className="h-6 w-6 text-emerald-400" title="Normal"/>)
                }
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="text-2xl font-bold">Panel ID - {panel.pid}</div>
                <p className="text-xs text-muted-foreground inline">
                  Status:
                </p>
                <Badge className={`inline mx-1 text-xs px-1 py-0 ${panel.b15 === 0 ? 'hover:bg-yellow-300 bg-yellow-200' : panel.b15 === 1 ? 'hover:bg-emerald-300 bg-emerald-200' : 'hover:bg-red-300 bg-red-200'} text-slate-600`}>
                  {panel.b15 === 0 ? 'Connected to GSM' : panel.b15 === 1 ? 'Connected to WiFi' : 'Panel Offline'}
                </Badge>
              </CardContent>

              <div className="h-[0.025rem] w-100 mb-2 mt-0 py-0 bg-slate-500"></div>
              <div className="flex flex-1 justify-center">
                <Button size="small" variant="outline" className="mb-1 rounded-full text-center text-xs text-slate-700 hover:text-blue-600 hover:bg-slate-200 hover:border-slate-300 bg-slate-100 shadow-md border-slate-400">
                  <Link href={`/panel/${panel.pid}`} onClick={e => setIsLoading(true)} className="px-0 block mx-2 my-1"><HiInformationCircle className="inline h-4 w-4 text-blue-700" /> more details</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Popup>
      )}
    </React.Fragment>
  ))
: null}


  
              
            </ReactMapGl>
          </main>
        </div>
      </div>
    </>
  );
}
