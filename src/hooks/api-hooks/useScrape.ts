import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { Article } from "types/editorial";

type scrapeEditorialPostDataType = {
  option: number;
};

export const useScrape = () => {
  const axiosInstance = useAxios(true);

  const scrapeEditorialMutation = useMutation({
    mutationFn: (data: scrapeEditorialPostDataType) =>
      axiosInstance.post<ApiResponse<any>>("/editorial/scrape", data),
  });

  const editorialCardDataQuery = useQuery({
    queryKey: ["editorials"],
    queryFn: () => axiosInstance.get<ApiResponse<Article[]>>("/editorial/all"),
  });

  return {
    scrapeEditorialMutation,
    editorialCardDataQuery,
  };
};
