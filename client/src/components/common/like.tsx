import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchId, fetchPost } from "~/API";
import { FetchDelete } from "~/API/FetchPost";
import { IUser } from "~/types/user";

type Liked = {
  id: number;
  status: boolean;
  user_id: string;
  postId: number;
  userData: IUser;
};

function Like({ meId, postId }: { meId: string; postId: number }) {
  const queryClient = useQueryClient();
  const { data: getStatus } = fetchId("/posts/getLike/", Number(postId));
  const { data: countLikes } = fetchId("/posts/getCountLike/", Number(postId));
  const countLike = countLikes?.count;
  const { mutate: liked, reset: resetLiked } = fetchPost();
  const { mutate: unLiked, reset: resetUnLiked } = FetchDelete();
  const [statusLike, setStatusLike] = useState<Liked[]>([]);

  useEffect(() => {
    setStatusLike(getStatus?.status || []);
  }, [getStatus]);
  const handleLiked = (postId: number) => {
    const data = {
      postId,
      user_id: meId,
      status: 1,
    };
    liked(
      { url: "/posts/liked", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/posts/getCountLike/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/posts/getLike/"],
          });
        },
      }
    );
  };

  const handleUnLike = (postId: number) => {
    const data = {
      postId,
      user_id: meId,
    };
    unLiked(
      { url: "/posts/unLiked", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/posts/getCountLike/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/posts/getLike/"],
          });
        },
      }
    );
  };
  useEffect(() => {
    resetLiked();
    resetUnLiked();
  }, [resetLiked, resetUnLiked]);
  const isLiked = statusLike.some((like) => like.user_id === meId);
  return {
    isLiked,
    countLike,
    handleLiked,
    handleUnLike,
  };
}

export default Like;
