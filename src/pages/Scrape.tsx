import { Button, Drawer, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { io } from "socket.io-client";
import { useDataSelector } from "../reduxStore/store";
import ScrapeCategoryList from "../components/ScrapeCategoryList";
import { BiMenuAltRight } from "react-icons/bi";

const Scrape: React.FC = () => {
  const { token } = useDataSelector("auth");
  const [log, setLog] = useState<LogResponse[]>([]);
  const logRef = useRef<HTMLDivElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("log", (data: LogResponse) => {
      setLog((prev) => [...prev, data]);
    });

    socket.on("error", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("hi");

    logRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  return (
    <div className="card w-full h-full">
      <div className="grid grid-cols-12 grid-rows-6 h-full">
        <div className="lg:col-span-2 col-span-12 lg:row-span-full lg:block hidden row-span-1 border-r p-6">
          <div className="">
            <Typography variant="small" className="font-medium">
              Scrape by Category
            </Typography>

            <div className="mt-2 flex w-full lg:justify-center justify-between lg:items-start items-center lg:flex-col flex-row">
              <ScrapeCategoryList />
            </div>
          </div>
        </div>
        <div className="lg:col-span-10 col-span-12 row-span-full p-6">
          <div className="flex justify-start items-start flex-col h-full">
            <div className="flex justify-between items-center w-full">
              <Typography variant="h5" className="font-medium">
                Scrape Logs
              </Typography>
              <Button
                variant="text"
                className="rounded-full w-12 h-12 flex justify-center items-center !p-0 lg:hidden"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <BiMenuAltRight className="icon" />
              </Button>
              <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(!openDrawer)}
                className="p-4"
                overlayProps={{ className: "!fixed" }}
              >
                <ScrapeCategoryList />
              </Drawer>
            </div>

            <div className="log-window bg-black p-2 w-full mt-2 rounded h-full overflow-y-scroll">
              {log && log.length > 0 ? (
                log.map((item, index) => {
                  return (
                    <p key={index} className="text-green-700 font-medium">
                      {`[${item.service.trim().toUpperCase()}]:
                      ${moment(item.date).format("YYYY/MM/DD h:mm:ss A")} -
                      ${item.message}`}
                    </p>
                  );
                })
              ) : (
                <p className="text-green-700 font-medium">
                  Scrape Logs will be displayed here...
                </p>
              )}

              <div ref={logRef}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrape;
