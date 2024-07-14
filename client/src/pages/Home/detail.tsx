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
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IPost } from "~/types/post";
import { fetchAll, fetchId } from "~/API";
import { setComment, setHome } from "~/Redux/actionSlice";
import Posts from "~/components/common/posts";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IMedia } from "~/types/media";
import Media from "~/components/common/mediaPost";
import Like from "~/components/common/like";

function Detail() {
  const { id } = useParams();
  const { data: posts } = fetchAll(`/posts/getOnePost/${id}`);
  const post: IPost = posts?.getPostId;
  const u = useSelector((state) => state?.auth.login.currentUser);
  const dispatch = useDispatch();
  const { data: mediaPost } = fetchId("/posts/getMedia/", Number(id));
  const { data: countComments } = fetchId(
    "/comment/getCountComment/",
    Number(post?.id)
  );
  const { data: getFollows } = fetchId(
    "/users/getFollow/",
    String(post?.userData?.idUser)
  );
  const countComment = countComments?.count;
  const medias = mediaPost?.getMedia;

  const isFollow = getFollows?.allFollow.some(
    (follow: { followerId: string }) => {
      const result = follow.followerId === u?.idUser;
      return result;
    }
  );
  const { isLiked, countLike, handleLiked, handleUnLike } = Like({
    meId: u?.idUser,
    postId: post?.id,
  });

  return (
    <div>
      <div className="text-center h-[60px] z-50 flex items-center justify-center w-[650px] bg-bg-primary fixed text-[#f3f5f7]">
        <Link to={`/`} onClick={() => dispatch(setHome())}>
          <ArrowBackIcon className="" />
        </Link>
        <p className="text-center w-full  font-semibold text-[15px]">Thread</p>
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
                    <div className="w-[16px] h-[16px] absolute rounded-full flex items-center justify-center bg-white bottom-[-2px] right-0">
                      <FontAwesomeIcon className="w-3 h-3" icon={faCheck} />
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
            <div
              className={` flex items-center gap-2 overflow-x-scroll no-scrollbar`}
            >
              {medias &&
                medias.map((media: IMedia, index: number) => (
                  <Media index={index} media={media} medias={medias} />
                ))}
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
