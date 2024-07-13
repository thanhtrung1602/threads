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
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchId, fetchPost } from "~/API";
import { FetchDel, FetchDelete } from "~/API/FetchPost";
import { IPost } from "~/types/post";
import { IUser } from "~/types/user";
import { setComment, setDetail, setProfile } from "~/Redux/actionSlice";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tippy from "@tippyjs/react/headless";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
type Liked = {
  id: number;
  status: boolean;
  user_id: string;
  postId: number;
  userData: IUser;
};

type Media = {
  id: number;
  media: string;
  post_id: number;
};

function Post({ post }: { key: number; post: IPost }) {
  const queryClient = useQueryClient();
  const u = useSelector((state) => state?.auth.login.currentUser);
  const { mutate: liked, reset: resetLiked } = fetchPost();
  const { mutate: unLiked, reset: resetUnLiked } = FetchDelete();
  const [statusLike, setStatusLike] = useState<Liked[]>([]);
  const { data: getStatus } = fetchId("/posts/getLike/", Number(post?.id));
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
    String(post?.userData?.idUser)
  );
  const { data: countFollowers } = fetchId(
    "/users/getCountFollower/",
    String(post?.userData?.idUser)
  );
  const countFollower = countFollowers?.countFollower;
  const [onValue, setOnValue] = useState(true);
  const [onProfile, setOnProfile] = useState(false);
  const [del, setDel] = useState(false);
  const countComment = countComments?.count;
  const countLike = countLikes?.count;
  const { data: mediaPost } = fetchId("/posts/getMedia/", Number(post?.id));
  const dispatch = useDispatch();
  const refVideo = useRef(null);
  const { mutate: follow } = fetchPost();
  const { mutate: unFollow } = FetchDelete();
  const { mutate: delPost } = FetchDel();
  const medias = mediaPost?.getMedia;

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

  const handleFollow = () => {
    const data = {
      followerId: u?.idUser,
      followingId: post?.userData?.idUser,
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
      followingId: post?.userData?.idUser,
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

  const handleDelPost = (id: number) => {
    delPost(`/posts/delPost/${id}`, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/posts/getAllPost"],
        });
        queryClient.invalidateQueries({
          queryKey: [`/posts/getAllPostUser/${post?.userData?.idUser}`],
        });
      },
    });
  };

  const isLiked = statusLike.some((like) => like.user_id === u?.idUser);
  const isFollow = getFollows?.allFollow.some(
    (follow: { followerId: string }) => follow.followerId === u?.idUser
  );
  return (
    <div className="py-3 px-6 border-t border-b-outline" key={post?.id}>
      <Link
        to={`/${post?.userData?.idUser}/post/${post.id}`}
        onClick={(e) => {
          if (e.defaultPrevented) return;
          dispatch(setDetail(post?.id));
        }}
      >
        <div className="flex">
          <Tippy
            interactive
            placement="bottom"
            visible={onProfile}
            render={(attrs) => (
              <Link
                to={`/${post?.userData?.idUser}`}
                onClick={() => dispatch(setProfile(post?.userData?.idUser))}
              >
                <div
                  className="border border-b-outline z-50 w-[380px] max-h-[300px] bg-second-color p-6 rounded-3xl"
                  {...attrs}
                >
                  <Link
                    to={`/${post?.userData?.idUser}`}
                    onClick={(e) => {
                      if (post?.userData?.idUser === u?.idUser) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="text-[#f3f5f7]">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="text-xl font-bold ">
                            {post?.userData?.username}
                          </p>
                          <span className="text-[15px]">
                            {post?.userData?.idUser}
                          </span>
                        </div>
                        <div>
                          <img
                            className="w-[64px] h-[64px] rounded-full"
                            src={
                              post?.userData?.image ||
                              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                            }
                            alt="image for user"
                          />
                        </div>
                      </div>
                      <div className="text-[15px] mt-2">
                        <p>{post?.userData?.story || ""}</p>
                      </div>
                      <div className="text-[15px] text-[#777777] mt-2">
                        <span>{countFollower} người theo dõi</span>
                      </div>
                      <div
                        className="w-full mt-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
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
                      </div>
                    </div>
                  </Link>
                </div>
              </Link>
            )}
            onClickOutside={() => setOnProfile(false)}
          >
            <div
              className="mt-1 relative h-9 w-[39px]"
              onClick={(e) => {
                post?.userData?.idUser !== u?.idUser
                  ? e.preventDefault()
                  : null;
                setOnProfile(true);
              }}
            >
              <img
                className="w-full h-9 rounded-full relative object-cover"
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
                <div className="w-[16px] h-[16px] absolute rounded-full flex items-center justify-center bg-white bottom-[-2px] right-0">
                  <FontAwesomeIcon className="w-3 h-3" icon={faCheck} />
                </div>
              )}
            </div>
          </Tippy>
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-2 ml-3 w-full">
                <Link to={`/${post?.userData?.idUser}`}>
                  <span
                    className="text-[#f3f5f7] text-[15px] font-semibold"
                    onClick={() => dispatch(setProfile(post?.userData?.idUser))}
                  >
                    {post?.userData?.idUser}
                  </span>
                </Link>
                <span className="text-[#777] text-[15px]">
                  {moment(post?.createdAt).fromNow()}
                </span>
              </div>
              {post?.userData?.idUser === u?.idUser && (
                <Tippy
                  interactive
                  visible={del}
                  placement="bottom"
                  render={(attrs) => (
                    <div
                      className="w-[240px] border border-b-outline bg-second-color rounded-xl"
                      {...attrs}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDelPost(post?.id);
                        }}
                        className="text-[#ff3040] w-full flex items-center p-3 justify-between"
                      >
                        <span>Delete</span>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                  onClickOutside={() => setDel(false)}
                >
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <MoreHorizIcon
                      className="text-[#777]"
                      onClick={() => setDel(true)}
                    />
                  </div>
                </Tippy>
              )}
            </div>
            <div className="text-[#f3f5f7] text-[15px] ml-3">
              {post?.content &&
                post?.content.split("\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div
              className={` flex items-center gap-2 overflow-x-scroll no-scrollbar`}
            >
              {medias &&
                medias.map((media: Media, index: number) => (
                  <div
                    className={`${
                      medias.length >= 2 && "relative flex-shrink-0 h-[240px]"
                    }`}
                    key={index}
                  >
                    {media && (
                      <>
                        {media.media && (
                          <>
                            {media.media.endsWith(".jpg") ||
                            media.media.endsWith(".jpeg") ||
                            media.media.endsWith(".png") ? (
                              <img
                                className={`${
                                  medias.length > 1
                                    ? "max-h-[240px] w-full"
                                    : ""
                                } ${index === 0 && "ml-3"} ${
                                  medias.length >= 2
                                    ? "max-h-[240px] w-full"
                                    : ""
                                } ${
                                  index !== 0 && "ml-2"
                                } rounded-lg w-full h-full object-cover`}
                                src={media.media}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <div className="relative">
                                <video
                                  src={media.media}
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
                          </>
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>
            <div
              className="flex items-center justify-start "
              onClick={(e) => e.preventDefault()}
            >
              <div
                className="text-[#ccc] flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
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
              <div
                className="text-[#ccc] flex items-center h-9"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <button
                  className=" flex items-center gap-1 h-9 px-3 hover:bg-custom-bgC rounded-3xl"
                  onClick={() => dispatch(setComment(post.id))}
                >
                  <FontAwesomeIcon icon={faComment} />
                  <span>{countComment}</span>
                </button>
              </div>
              <div
                className="text-[#ccc] flex items-center h-9"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <button className="h-9 px-3 hover:bg-custom-bgC rounded-3xl">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
