interface ApiResponse<T> {
  result: T;
  success: boolean;
  message: string;
}

interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

interface LogResponse {
  level: "info" | "error";
  message: string;
  service: string;
  date: string;
}

// routes interface

interface Child {
  path: string;
  name?: string;
  element: React.FC;
}

interface RouteWithoutChild {
  path: string;
  icon: IconType;
  name?: string;
  isHaveChild: false;
  element: React.FC;
  child?: undefined;
  isShowInSidebar: boolean;
}

interface RouteWithChild {
  path: string;
  icon?: IconType;
  name?: string;
  isHaveChild: true;
  element?: undefined;
  child: Child[];
  isShowInSidebar: boolean;
}

type Route = RouteWithoutChild | RouteWithChild;
