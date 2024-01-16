import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./partials/routes";
import "./App.css";
import { useDataSelector } from "./redux/store";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./hooks/api-hooks/useAuth";
import { useDispatch } from "react-redux";
import { setIsLoad } from "./redux/features/LoaderSlice";
import { setUserData } from "./redux/features/AuthSlice";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { getLoginUser } = useAuth();

  const { token } = useDataSelector("auth");

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoginUser(),
    enabled: !!token,
  });

  useEffect(() => {
    dispatch(setIsLoad(true));
    if (!isLoading && data) {
      dispatch(setIsLoad(false));
      dispatch(setUserData({ ...data.data.result }));
    }
  }, [isLoading, data]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex p-4 lg:gap-4 h-full">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden px-2">
        <Header
          setSidebarOpen={setSidebarOpen}
          setSidebarExpanded={setSidebarExpanded}
        />

        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full h-full max-w-9xl mx-auto">
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
