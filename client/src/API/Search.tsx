import { useQuery } from "@tanstack/react-query";
import instance from "~/services/customize-axios";

function SearchApi({ url, key }) {
  return useQuery({
    queryKey: [url, key],
    queryFn: async () => {
      const { data } = await instance.get(url, {
        params: {
          query: key,
        },
      });
      return data;
    },
    enabled: !!key, // Ensure query is only run when key is not empty
  });
}

export default SearchApi;
