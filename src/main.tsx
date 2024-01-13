import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import { Login } from "./components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
import { persistor, store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./ErrorBoundary";
import Five00 from "./components/ErrorPage/500";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Five00 />}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider>
              <Toaster />
              <Loader />
              <div className="h-screen bg-[#f0f5f9]">
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<App />} />
                  </Routes>
                </Router>
              </div>
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
