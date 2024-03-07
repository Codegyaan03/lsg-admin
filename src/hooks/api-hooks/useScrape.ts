import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { Article } from "types/editorial";

type scrapeEditorialPostDataType = {
  option: number;
};

export const useScrape = (page: number, limit: number, search: string) => {
  const axiosInstance = useAxios(true);

  const scrapeEditorialMutation = useMutation({
    mutationFn: (data: scrapeEditorialPostDataType) =>
      axiosInstance.post<ApiResponse<any>>("/editorial/scrape", data),
  });

  const editorialCardDataQuery = useQuery({
    queryKey: ["editorials", page, limit, search],
    queryFn: () =>
      axiosInstance.get<ApiResponse<{ editorial: Article[]; total: number }>>(
        `/editorial/all?page=${page}&limit=${limit}&search=${search}`
      ),
  });

  return {
    scrapeEditorialMutation,
    editorialCardDataQuery,
  };
};
