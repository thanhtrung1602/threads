import instance from "~/services/customize-axios";
import { useQuery } from "@tanstack/react-query";
function FetchId(url: string, id: number | string) {
  return useQuery({
    queryKey: [url, id],
    queryFn: async () => {
      const { data } = await instance.get(`${url}${id}`);
      return data;
    },
    enabled: id !== null,
  });
}

export default FetchId;
