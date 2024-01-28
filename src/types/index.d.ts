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
