import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchId, fetchPost } from "~/API";
import { FetchDelete } from "~/API/FetchPost";

function Follow({ meId, youId }: { meId: string; youId: string }) {
  const queryClient = useQueryClient();
  const { data: getFollows } = fetchId("/users/getFollow/", String(youId));
  const { mutate: follow } = fetchPost();
  const { mutate: unFollow } = FetchDelete();
  const { data: countFollowers } = fetchId(
    "/users/getCountFollower/",
    String(youId)
  );
  const countFollower = countFollowers?.countFollower;
  const handleFollow = () => {
    const data = {
      followerId: meId,
      followingId: youId,
    };
    follow(
      { url: "/users/follow", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/users/getCountFollower/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/users/getFollow/"],
          });
        },
      }
    );
  };
  const handleUnFollow = () => {
    const data = {
      followerId: meId,
      followingId: youId,
    };
    unFollow(
      { url: "/users/unFollow", data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/users/getCountFollower/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/users/getFollow/"],
          });
          toast("Đã bỏ theo dõi");
        },
      }
    );
  };
  const isFollow = getFollows?.allFollow.some(
    (follow: { followerId: string }) => follow.followerId === meId
  );
  return {
    isFollow,
    countFollower,
    handleFollow,
    handleUnFollow,
  };
}

export default Follow;
