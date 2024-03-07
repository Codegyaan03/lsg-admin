import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./partials/routes";
import "./App.css";
import { useDataSelector } from "reduxStore/store";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./hooks/api-hooks/useAuth";
import { useDispatch } from "react-redux";
import { setIsLoad } from "reduxStore/features/LoaderSlice";
import { removeToken, setUserData } from "reduxStore/features/AuthSlice";
import { toast } from "react-toastify";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { getLoginUser } = useAuth();

  const { token } = useDataSelector("auth");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoginUser(),
    enabled: !!token,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (token) {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));
      const leftExp = Math.floor(decodedJwt.exp * 1000 - Date.now());
      if (decodedJwt.exp * 1000 < Date.now()) {
        toast.warn("Session Expired!");
        dispatch(removeToken());
      } else {
        timeoutId = setTimeout(() => {
          toast.warn("Session Expired!");
          dispatch(removeToken());
        }, leftExp);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  useEffect(() => {
    dispatch(setIsLoad(true));
    if (!isLoading && data) {
      dispatch(setIsLoad(false));
      dispatch(setUserData({ ...data.data.result }));
    }

    if (isError) {
      dispatch(setIsLoad(false));
      toast.error("Something went wrong");
    }

    return () => {
      dispatch(setIsLoad(false));
    };
  }, [isLoading, data, isError]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex md:p-4 p-2 lg:gap-4 h-full text-[#111c2d] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />

      <div className="relative flex flex-col flex-1 h-full w-full">
        <Header
          setSidebarOpen={setSidebarOpen}
          setSidebarExpanded={setSidebarExpanded}
        />

        <main className="h-[calc(100%-66px)] overflow-scroll pe-2">
          <div className="pt-6 w-full h-full max-w-9xl mx-auto">
            <Routes>
              {routes.map((route, index) => {
                return (
                  <React.Fragment key={index}>
                    {route.element ? (
                      <Route path={route.path} element={<route.element />} />
                    ) : (
                      <>
                        {route.child?.map((child, index) => {
                          return (
                            <Route
                              key={index}
                              path={`${route.path}${child.path}`}
                              element={<child.element />}
                            />
                          );
                        })}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
