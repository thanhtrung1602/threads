import instance from "~/services/customize-axios";
import { useQuery } from "@tanstack/react-query";
function FetchAll(url: string) {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await instance.get(url);
      return data;
    },
  });
}

export default FetchAll;
