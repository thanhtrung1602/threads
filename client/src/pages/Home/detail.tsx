import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faPlus,
  faHeart as heartLike,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useRef, useState } from "react";
import { IPost } from "~/types/post";
import { fetchAll, fetchId, fetchPost } from "~/API";
import { FetchDelete } from "~/API/FetchPost";
import { IUser } from "~/types/user";
import { setComment } from "~/Redux/actionSlice";
import Posts from "~/components/common/posts";
import { useParams } from "react-router-dom";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
type Liked = {
  id: number;
  status: boolean;
  user_id: string;
  postId: number;
  userData: IUser;
};
function Detail() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: posts } = fetchAll(`/posts/getOnePost/${id}`);
  const post: IPost = posts?.getPostId;
  const u = useSelector((state) => state?.auth.login.currentUser);
  const { mutate: liked, reset: resetLiked } = fetchPost();
  const { mutate: unLiked, reset: resetUnLiked } = FetchDelete();
  const dispatch = useDispatch();
  const [statusLike, setStatusLike] = useState<Liked[]>([]);
  const { data: getStatus } = fetchId("/posts/getLike/", Number(post?.id));
  const [onValue, setOnValue] = useState(true);
  const { data: countLikes } = fetchId(
    "/posts/getCountLike/",
    Number(post?.id)
  );
  const { data: countComments } = fetchId(
    "/comment/getCountComment/",
    Number(post?.id)
  );
  const { data: getFollows } = fetchId(
    "/users/getFollow/",
    String(post?.userData?.id)
  );
  const countComment = countComments?.count;
  const countLike = countLikes?.count;

  const refVideo = useRef(null);

  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.autoplay = true;
      refVideo.current.loop = true;
      refVideo.current.muted = onValue;
      refVideo.current.play();
    }
  }, [onValue]);

  useEffect(() => {
    setStatusLike(getStatus?.status || []);
  }, [getStatus]);

  const handleLiked = (postId: number) => {
    const data = {
      postId,
      user_id: u?.idUser,
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
      user_id: u?.idUser,
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

  const isLiked = statusLike.some((like) => like.user_id === u?.idUser);
  const isFollow = getFollows?.allFollow.some(
    (follow: { followerId: string }) => follow.followerId === u?.idUser
  );
  return (
    <div>
      <div className="text-center h-[60px] z-50 flex items-center justify-center w-[650px] bg-bg-primary fixed ">
        <span className="text-center text-[#f3f5f7] font-semibold text-[15px]">
          Thread
        </span>
      </div>
      <div className="w-[640px] min-h-[686px] mt-16 border border-b-outline rounded-t-3xl">
        <div className="px-6 pt-6">
          <div className="border-b border-b-outline flex flex-col gap-2 py-2">
            <div className="flex items-center">
              <div className="flex items-center w-full gap-3">
                <div className="mt-1 relative h-9 w-[39px]">
                  <img
                    className="w-9 h-full rounded-full relative object-cover"
                    src={
                      post?.userData?.image ||
                      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }
                    alt=""
                  />
                  {post?.userData?.idUser !== u?.idUser && (
                    <div className="w-[16px] border border-bg-primary h-[16px] absolute rounded-full flex items-center justify-center bg-white bottom-[-2px] right-0">
                      <FontAwesomeIcon
                        className="w-2.5 h-2.5 flex items-center justify-center"
                        icon={faPlus}
                      />
                    </div>
                  )}
                  {isFollow && (
                    <div className="w-[16px] border border-bg-primary h-[16px] absolute rounded-full flex items-center justify-center bg-white bottom-[-2px] right-0">
                      <FontAwesomeIcon
                        className="w-[9px] h-[9px flex items-center justify-center"
                        icon={faCheck}
                      />
                    </div>
                  )}
                </div>
                <div className="flex text-[15px] items-center gap-2.5 w-full">
                  <p className="text-[#f3f5f7]">{post?.userData.idUser}</p>
                  <span className="text-[#777] ">
                    {moment(post?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div>
                <MoreHorizIcon className="text-[#777] size-5" />
              </div>
            </div>
            <div className="text-[15px] text-[#f3f5f7]">
              {post?.content &&
                post.content
                  .split("\n")
                  .map((content, index) => <p key={index}>{content}</p>)}
            </div>
            <div>
              {post?.media && (
                <div className="flex gap-1.5">
                  {post?.media &&
                  (post?.media.endsWith(".jpg") ||
                    post?.media.endsWith(".jpeg") ||
                    post.media.endsWith(".png")) ? (
                    <div className="flex gap-1.5">
                      <picture>
                        <img
                          className="rounded-lg max-h-[450px] object-cover"
                          src={post?.media}
                          alt=""
                        />
                      </picture>
                    </div>
                  ) : (
                    <div className="relative rounded-lg">
                      <video
                        src={post?.media}
                        className="max-h-[450px] rounded-lg object-cover"
                        ref={refVideo}
                      ></video>
                      <div
                        className="absolute right-2 bottom-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setOnValue(!onValue);
                        }}
                      >
                        {onValue ? (
                          <VolumeOffIcon className="text-[#f3f5f7]" />
                        ) : (
                          <VolumeUpIcon className="text-[#f3f5f7]" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center justify-start ">
              <div className="text-[#ccc] flex items-center ">
                {isLiked ? (
                  <button
                    className=" flex items-center gap-1 text-[#ff0034] h-9 px-3 hover:bg-custom-bgC rounded-3xl"
                    onClick={() => handleUnLike(post?.id)}
                  >
                    <FontAwesomeIcon className="" icon={heartLike} />
                    <span>{countLike}</span>
                  </button>
                ) : (
                  <button
                    className=" flex items-center gap-1 h-9 px-3 hover:bg-custom-bgC rounded-3xl"
                    onClick={() => handleLiked(post?.id)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{countLike}</span>
                  </button>
                )}
              </div>
              <div className="text-[#ccc] flex items-center h-9">
                <button
                  className=" flex items-center gap-1 h-9 px-3 hover:bg-custom-bgC rounded-3xl"
                  onClick={() => dispatch(setComment(post.id))}
                >
                  <FontAwesomeIcon icon={faComment} />
                  <span>{countComment}</span>
                </button>
              </div>
              <div className="text-[#ccc] flex items-center h-9">
                <button className="h-9 px-3 hover:bg-custom-bgC rounded-3xl">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-4 text-[15px] text-[#f3f5f7] font-semibold">
            <p>Thread trả lời</p>
          </div>
        </div>
        <div className="border-t border-b-outline mt-3">
          <Posts />
        </div>
      </div>
    </div>
  );
}

export default Detail;
