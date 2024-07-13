import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchId, fetchPost } from "~/API";
import { FetchDelete } from "~/API/FetchPost";
import { setProfile } from "~/Redux/actionSlice";
import { IUser } from "~/types/user";

function ResultSearch({ user }: { user: IUser }) {
  const u = useSelector((state) => state?.auth.login.currentUser);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data: countFollowers, refetch: refetchFollower } = fetchId(
    "/users/getCountFollower/",
    String(user.idUser)
  );
  const { data: getFollows } = fetchId(
    "/users/getFollow/",
    String(user.idUser)
  );
  const { mutate: follow } = fetchPost();
  const { mutate: unFollow } = FetchDelete();
  useEffect(() => {
    refetchFollower();
  }, []);
  const countFollower = countFollowers?.countFollower;
  const isFollow = getFollows?.allFollow.some(
    (follow: { followerId: string }) => follow.followerId === u?.idUser
  );

  const handleFollow = () => {
    const data = {
      followerId: u?.idUser,
      followingId: user?.idUser,
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
      followerId: u?.idUser,
      followingId: user?.idUser,
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

  return (
    <div className="pt-4 pl-6 w-full">
      <Link
        to={`/${user?.idUser}`}
        className=" flex gap-3"
        onClick={() => dispatch(setProfile(user.idUser))}
      >
        <div className="w-[39px] mt-1.5">
          <img
            className="w-full h-9 rounded-full object-cover"
            src={
              user?.image ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
            alt=""
          />
        </div>
        <div className="text-[15px] w-full">
          <div className="flex items-center justify-between pb-2">
            <div className="flex flex-col">
              <span className="text-[#f3f5f7] font-semibold">
                {user?.idUser}
              </span>
              <span className="text-[#777777] font-normal">
                {user?.username}
              </span>
            </div>
            {user.idUser !== u.idUser && (
              <div className="pr-6" onClick={(e) => e.preventDefault()}>
                {isFollow ? (
                  <button
                    onClick={handleUnFollow}
                    className="px-4 text-[#777777] h-[34px] rounded-[10px] border border-b-outline"
                  >
                    Đang theo dõi
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="px-4 text-[#f3f5f7] h-[34px] rounded-[10px] border border-b-outline"
                  >
                    Theo dõi
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="text-[#f3f5f7] border-b border-b-outline pb-3">
            <span>{countFollower} người theo dõi</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ResultSearch;
