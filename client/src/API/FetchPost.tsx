import { useMutation } from "@tanstack/react-query";
import instance from "~/services/customize-axios";

interface MutationArgs {
  url: string;
  data: object;
}

function FetchPost() {
  return useMutation({
    mutationFn: ({ url, data }: MutationArgs) =>
      instance.post(url, data).then((response) => response.data),
  });
}

export function FetchDelete() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data?: object }) =>
      instance.delete(url, { data }),
  });
}

export function FetchDel() {
  return useMutation({
    mutationFn: (url: string) => instance.delete(url),
  });
}

export function FetchPut() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: FormData }) =>
      instance
        .put(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
  });
}

export default FetchPost;
