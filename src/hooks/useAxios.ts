import axios from "axios";
import { useDataSelector } from "reduxStore/store";

export const useAxios = (withToken: boolean) => {
  const { token } = useDataSelector("auth");

  const axiosInstance = withToken
    ? axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : axios.create();
  axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;
  return axiosInstance;
};
