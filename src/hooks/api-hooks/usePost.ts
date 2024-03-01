import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { Article } from "types/editorial";

const usePost = (id: string) => {
  const axiosAuthInstance = useAxios(true);

  const getSingleItem = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      axiosAuthInstance.get<ApiResponse<Article>>(`/editorial/${id}`),
  });

  return {
    getSingleItem,
  };
};

export default usePost;
