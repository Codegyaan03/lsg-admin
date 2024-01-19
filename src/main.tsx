import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import { Login } from "./components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { persistor, store } from "./redux/store";
import { Bounce, ToastContainer } from "react-toastify";
import ErrorBoundary from "./ErrorBoundary";
import Five00 from "./components/ErrorPage/500";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Four0Four from "./components/ErrorPage/404";
import { AxiosError } from "axios";
import "react-toastify/dist/ReactToastify.css";
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
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                closeButton={false}
                limit={2}
                className={"p-0"}
              />
              <Loader />
              <div className="h-screen bg-[#f0f5f9] ">
                <Router>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/*" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Four0Four />} />
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

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>;
  }
}
