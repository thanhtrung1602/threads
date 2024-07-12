import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchId, fetchPost } from "~/API";
import { FetchDelete } from "~/API/FetchPost";
import Posts from "~/components/common/posts";
import { IUser } from "~/types/user";
import Tippy from "@tippyjs/react/headless";
import {
  setCloseEditProfile,
  setCreatePost,
  setUpdateProfile,
} from "~/Redux/actionSlice";
import EditProfile from "./editProfile";

function Profile() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const refProfile = useRef(null);
  const u = useSelector((state) => state?.auth.login.currentUser);
  const api = useSelector((state) => state?.api.actions);
  const dispatch = useDispatch();
  const { mutate: follow } = fetchPost();
  const { mutate: unFollow } = FetchDelete();
  const { data: countFollowers, refetch: refetchFollower } = fetchId(
    "/users/getCountFollower/",
    String(api.idUser)
  );
  const { data: getFollows } = fetchId("/users/getFollow/", String(id));
  const { data: users, refetch: refetchGetMe } = fetchId(
    "/users/getMe/",
    String(id)
  );

  const user: IUser = users?.detailUser;
  const countFollower = countFollowers?.countFollower;

  useEffect(() => {
    refetchFollower();
    refetchGetMe();
  }, [refetchFollower, refetchGetMe]);

  useEffect(() => {
    if (refProfile.current) {
      refProfile.current?.scrollTo(0, 0);
    }
  }, []);

  const handleFollow = () => {
    const data = {
      followerId: u?.idUser,
      followingId: id,
    };
    console.log(data);
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
      followingId: id,
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
    (follow: { followerId: string }) => follow.followerId === u?.idUser
  );

  return (
    <div
      className={api.isEdit && "relative w-full h-full "}
      onClick={() => dispatch(setCloseEditProfile(false))}
    >
      <div
        className={` ${
          api.isEdit &&
          "opacity-20 fixed left-2/4 -translate-x-2/4 w-full h-full"
        }`}
        onClick={(e) => (api.isEdit ? null : e.stopPropagation())}
      >
        <div className="flex justify-center w-full flex-grow">
          <div>
            <div className="text-center h-[60px] z-50 flex items-center justify-center w-[650px] bg-bg-primary fixed ">
              <span className="text-center text-[#f3f5f7] font-semibold text-[15px]">
                Trang cá nhân
              </span>
            </div>
            <div className="relative bg-second-color border-t min-h-[680px] border-l border-r border-b-outline w-[640px] rounded-tr-3xl rounded-tl-3xl mt-16 overflow-hidden">
              <div className="border-b border-b-outline  pt-4 px-6">
                <div className="flex items-center justify-between">
                  <div className="text-[#f3f5f7]">
                    <div className="text-2xl font-bold w-full">
                      <span>{user?.username}</span>
                    </div>
                    <div className="text-[15px]">
                      <span>{user?.idUser}</span>
                    </div>
                  </div>
                  <div className="w-[84px] h-[84px]">
                    <img
                      className="w-full h-[84px] rounded-full object-cover"
                      src={
                        user?.image ||
                        "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  {user?.story &&
                    user?.story.split("\n").map((story, index) => (
                      <p className="text-[15px] text-[#f3f5f7]" key={index}>
                        {story}
                      </p>
                    ))}
                </div>
                <div className="mt-3 text-[#777777]">
                  <span>{countFollower} người theo dõi</span>
                </div>
                {id === u?.idUser ? (
                  <div className="w-full border border-b-outline rounded-[10px] mt-3 text-[#f3f5f7]">
                    <Tippy></Tippy>
                    <button
                      className="h-[34px] px-4 w-full flex items-center justify-center"
                      onClick={() => dispatch(setUpdateProfile())}
                    >
                      Chỉnh sửa trang cá nhân
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 mt-3">
                    {isFollow ? (
                      <button
                        onClick={handleUnFollow}
                        className="h-[34px] px-4 w-full rounded-[10px] text-[#f3f5f7] border border-b-outline"
                      >
                        <span>Đang theo dõi</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleFollow}
                        className="h-[34px] px-4 w-full bg-white rounded-[10px] text-[15px] font-semibold text-black"
                      >
                        <span>Theo dõi</span>
                      </button>
                    )}
                    <button className="h-[34px] px-4 w-full rounded-[10px] text-[#f3f5f7] border border-b-outline">
                      <span>Nhắc đến</span>
                    </button>
                  </div>
                )}
                <div className="text-[#777777] flex items-center justify-between mt-3 p-0">
                  <div className="text-[#f3f5f7] h-[48px] flex items-center justify-center border-b border-[#f3f5f7] w-full">
                    <span>Thread</span>
                  </div>
                  <div className="h-[48px] w-full flex items-center justify-center">
                    <span>Bài đăng lại</span>
                  </div>
                </div>
              </div>
              <div className="bg-second-color w-[640px]">
                <Posts />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-9 right-9 flex items-center justify-center rounded-2xl fixed bg-[#181818] border border-b-outline">
          <button
            className="h-[68px] w-[82px]"
            onClick={() => dispatch(setCreatePost())}
          >
            <FontAwesomeIcon className="text-white h-6 w-6 " icon={faPlus} />
          </button>
        </div>
      </div>
      <div
        className="absolute top-[170px] left-2/4 -translate-x-2/4"
        onClick={(e) => e.stopPropagation()}
      >
        {api.isEdit && <EditProfile />}
      </div>
    </div>
  );
}

export default Profile;
