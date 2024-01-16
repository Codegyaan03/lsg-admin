import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TfiAngleDown } from "react-icons/tfi";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import routes from "./routes";
import "./sidebar.scss";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  setSidebarExpanded,
  sidebarExpanded,
}) => {
  const [openTab, setOpenTab] = useState<string>("");

  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const handleTab = (tab: string) => {
    setOpenTab(tab === openTab ? "" : tab);
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 bg-blue-gray-900 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] lg:rounded-2xl overflow-x-hidden absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 overflow-y-scroll lg:overflow-y-auto w-64 lg:w-20 h-full lg:sidebar-expanded:!w-64 shrink-0 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="/vite.svg" alt="logo" className="h-8 w-8" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-cyan-900 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Menu
              </span>
            </h3>
            <ul className="mt-3">
              {routes.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.isHaveChild ? (
                      <li
                        className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                          pathname.includes(item.path) && !sidebarExpanded
                            ? "bg-[#00ccff] active_close"
                            : ""
                        } ${
                          !(pathname.includes(item.path) && sidebarExpanded)
                            ? "px-3"
                            : ""
                        }`}
                        onClick={() => {
                          handleTab(`path${index}`);
                          setSidebarExpanded(true);
                        }}
                      >
                        <Accordion
                          className={`accordion ${
                            pathname.includes(item.path) && sidebarExpanded
                              ? "active"
                              : ""
                          }`}
                          open={
                            openTab === `path${index}` ||
                            (pathname.includes(item.path) && sidebarExpanded)
                          }
                          icon={
                            <TfiAngleDown
                              className={`${
                                openTab === `path${index}` ||
                                (pathname.includes(item.path) &&
                                  sidebarExpanded)
                                  ? "rotate-180"
                                  : ""
                              } h-5 w-5 transition-transform`}
                            />
                          }
                        >
                          <AccordionHeader
                            onClick={() => handleTab(`path${index}`)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {item.icon && (
                                  <item.icon className="shrink-0 h-6 w-6" />
                                )}
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </AccordionHeader>

                          <AccordionBody>
                            <ul className={`pl-9 mt-1 listCircle`}>
                              {item.child?.map((child, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    {child.name && (
                                      <li
                                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                                          pathname ===
                                            `${item.path}${child.path}` &&
                                          "active"
                                        }`}
                                      >
                                        <NavLink
                                          to={`${item.path}${child.path}`}
                                          className={`block truncate transition duration-150 ${
                                            pathname.includes(child.path) &&
                                            "hover"
                                          }`}
                                        >
                                          <div className="flex items-center">
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              {child.name}
                                            </span>
                                          </div>
                                        </NavLink>
                                      </li>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </ul>
                          </AccordionBody>
                        </Accordion>
                      </li>
                    ) : (
                      <li
                        key={index}
                        onClick={() => handleTab("")}
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                          pathname === item.path && "bg-[#00ccff]"
                        }`}
                      >
                        <NavLink
                          to={item.path}
                          className={`block hover:text-blue-gray-900 text-blue-gray-700 truncate transition duration-150 ${
                            pathname === item.path &&
                            "text-white hover:text-white"
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <item.icon className="shrink-0 h-6 w-6" />
                            )}
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                              {item.name}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
          {/* More group */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
