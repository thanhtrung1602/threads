/* eslint-disable @typescript-eslint/no-explicit-any */
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "~/API";
import { setCloseComment, setCloseCreatePost } from "~/Redux/actionSlice";
import instance from "~/services/customize-axios";
import { IPost } from "~/types/post";
import { BsImages } from "react-icons/bs";
interface FileWithPreview extends File {
  preview?: string;
}

function CreatePost() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const [post, setPost] = useState<IPost | null>(null);
  const u = useSelector((state) => state?.auth.login.currentUser);
  const { mutate: posts } = fetchPost();
  const dispatch = useDispatch();
  const refPost = useRef(null);
  const refVideo = useRef(null);
  const refFocus = useRef(null);
  console.log(u?.image);
  useEffect(() => {
    if (refVideo.current) {
      refVideo.current.autoplay = true;
      refVideo.current.loop = true;
      refVideo.current.muted = true;
      refVideo.current.play();
    }
    if (refFocus.current) {
      refFocus.current.focus();
    }
  }, []);

  const api = useSelector((state) => state?.api.actions);

  useEffect(() => {
    return () => {
      if (image) {
        if (image.preview) URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  useEffect(() => {
    instance
      .get(`/posts/getOnePost/${Number(api.idComment)}`)
      .then((response) => setPost(response.data?.getPostId));
  }, [api]);

  const handleRevokeImg = () => {
    if (image) {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
        setImage(null);
      }
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
    e.target.value = null;
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const id: string | undefined = u?.idUser;
    formData.append("content", content);
    formData.append("user_id", String(id));
    if (image) {
      formData.append("media", image);
    }
    formData.append("postId", String(api.idComment));

    posts(
      { url: `${api.postApi}`, data: formData },
      {
        onSuccess: (response) => {
          console.log("Success response:", response);
          toast.success("Đã đăng");
          dispatch(setCloseComment());
          dispatch(setCloseCreatePost());
          queryClient.invalidateQueries({
            queryKey: ["/comment/getCountComment/"],
          });
          queryClient.invalidateQueries({
            queryKey: ["/posts/getAllPost"],
          });
          queryClient.invalidateQueries({
            queryKey: [`/comment/getAllPost/${post?.id}`],
          });
          queryClient.invalidateQueries({
            queryKey: [`/comment/getComment/${post?.id}`],
          });
        },
        onError: (error) => {
          console.error("Error:", error);
          toast.error("Đăng bài thất bại");
        },
        onSettled: (data) => {
          !data && toast.loading("Đang đăng...");
        },
      }
    );
  };

  return (
    <div className="w-[618px]">
      <div className="text-white text-base font-bold text-center mb-6">
        {api.isPostComment ? (
          <span>Thread trả lời</span>
        ) : (
          <span>Thread mới</span>
        )}
      </div>
      <div
        className={`pt-[24px] px-[24px] pb-[16px] border border-b-outline bg-second-color rounded-2xl w-full max-h-[668px] ${
          api.isPostComment && refPost?.current?.clientHeight >= 600
            ? "overflow-y-scroll"
            : null
        }`}
        ref={refPost}
      >
        {api.isPostComment && (
          <div className="flex mb-1">
            <div className="mt-1 flex flex-col items-center gap-2 ">
              <img
                className="h-[36px] w-[36.58px] rounded-full bg-white object-cover"
                src={
                  post?.userData?.image ||
                  "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                }
                alt=""
              />
              <div className="border border-b-outline h-full w-[1px] min-h-[12px] flex-grow"></div>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center gap-2 ml-3">
                <span className="text-[#f3f5f7] text-[15px]">
                  {post?.userData.idUser}
                </span>
                <span className="text-[#777] text-[15px]">
                  {moment(post?.createdAt).fromNow()}
                </span>
              </div>
              <div className="text-[#f3f5f7] text-[15px] ml-3">
                {post?.content &&
                  post?.content.split("\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {post?.media && (
                <div className="flex flex-col gap-1.5 ml-3">
                  {post?.media &&
                  (post?.media.endsWith(".jpg") ||
                    post?.media.endsWith(".jpeg") ||
                    post?.media.endsWith(".png")) ? (
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
                    <div>
                      <video
                        src={post?.media}
                        className="max-h-[450px] rounded-lg object-cover"
                      ></video>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full">
          <div className="mt-2">
            <img
              className="h-[36px] w-[40px] rounded-full object-cover"
              src={
                u?.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }
              alt=""
            />
          </div>
          <div className="flex flex-col w-full">
            <div>
              <span className="text-white">{u?.idUser}</span>
            </div>
            <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-second-color outline-none text-[15px] text-white w-full"
                  type="text"
                  ref={refFocus}
                  placeholder={
                    api.isPostComment
                      ? `trả lời ${post?.userData.idUser}...`
                      : "Bắt đầu thread..."
                  }
                />
              </div>
            </form>
            {(image && image?.name.endsWith(".jpg")) ||
            image?.name.endsWith(".jpeg") ||
            image?.name.endsWith(".png") ? (
              <div className="flex">
                <div className="flex items-center gap-2 relative">
                  {image && (
                    <div className="absolute z-50 top-2 right-2">
                      <div
                        className="relative w-[24px] h-[24px] rounded-full bg-bg-primary"
                        onClick={handleRevokeImg}
                      >
                        <FontAwesomeIcon
                          className="text-[#fff] flex items-center justify-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          icon={faClose}
                        />
                      </div>
                    </div>
                  )}

                  <img
                    className="rounded-xl flex relative h-[430px] object-cover "
                    src={image.preview}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="flex items-center gap-2 relative">
                  {image && (
                    <div className="absolute z-50 top-2 right-2">
                      <div
                        className="relative w-[24px] h-[24px] rounded-full bg-bg-primary"
                        onClick={handleRevokeImg}
                      >
                        <FontAwesomeIcon
                          className="text-[#fff] flex items-center justify-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          icon={faClose}
                        />
                      </div>
                    </div>
                  )}
                  {image && (
                    <video
                      className="rounded-xl flex relative h-[430px] object-cover"
                      src={image?.preview}
                      ref={refVideo}
                    ></video>
                  )}
                </div>
              </div>
            )}
            <div className=" mt-2 flex items-center gap-3">
              <div className="relative">
                <BsImages className="text-[#4d4d4d] h-5 w-5 relative" />
                <input
                  className="absolute h-5 w-5 pr-3 left-0 opacity-0 top-0"
                  type="file"
                  onChange={handleImage}
                  multiple
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between pt-12">
          <div className="text-[#777] text-[15px]">
            <span>Bất kỳ ai cũng có thể trả lời và trích dẫn</span>
          </div>
          <div className=" ">
            <button
              onClick={handlePost}
              className="px-4 text-[#f3f5f7] text-center border-b-outline border h-9 rounded-[10px]"
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
