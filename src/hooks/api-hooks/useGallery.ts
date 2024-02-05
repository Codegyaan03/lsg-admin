import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";

export const useGallery = () => {
  const axiosInstance = useAxios(true);
  const galleryQuery = useQuery({
    queryKey: ["gallery"],
    queryFn: () => axiosInstance.get<ApiResponse<any>>("/get-all-image"),
  });

  return {
    galleryQuery,
  };
};
