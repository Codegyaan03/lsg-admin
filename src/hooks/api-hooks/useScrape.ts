import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";

type scrapeEditorialPostDataType = {
  option: number;
};

export const useScrape = () => {
  const axiosInstance = useAxios(true);

  const scrapeEditorialMutation = useMutation({
    mutationFn: (data: scrapeEditorialPostDataType) =>
      axiosInstance.post<ApiResponse<any>>("/editorial/scrape", data),
  });

  return {
    scrapeEditorialMutation,
  };
};
