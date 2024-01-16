import { UserData } from "../../types/authslice";
import { useAxios } from "../useAxios";

export const useAuth = () => {
  const axiosInstance = useAxios(false);
  const axiosAuthInstance = useAxios(true);
  const login = (data: {}) => {
    return axiosInstance.post<ApiResponse<{ access_token: string }>>(
      "/user/login",
      data
    );
  };

  const getLoginUser = () => {
    return axiosAuthInstance.get<ApiResponse<UserData>>("/user/me");
  };

  return {
    login,
    getLoginUser,
  };
};
