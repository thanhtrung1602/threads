import { fetchAll } from "~/API";
import { IPost } from "~/types/post";
import Post from "./post";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import instance from "~/services/customize-axios";
// import { useParams } from "react-router-dom";

function Posts() {
  const { id } = useParams();
  const { feedType, idUser, idPost } = useSelector(
    (state) => state?.api.actions
  );

  const [paramsId, setParamsId] = useState(idUser);
  useEffect(() => {
    if (id !== paramsId) {
      setParamsId(idUser);
    }
  }, [idUser, id, paramsId]);

  const getPostEndPoint = () => {
    if (feedType === "profile" && id === paramsId) {
      return `/posts/getAllPostUser/${id}`;
    } else if (feedType === "home") {
      return "/posts/getAllPost";
    } else if (feedType === "profile") {
      return `/posts/getAllPostUser/${id}`;
    } else if (feedType === "comment") {
      return `/comment/getComment/${idPost}`;
    } else {
      return "/posts/getAllPost";
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  const {
    data,
    isLoading: isLoadingAll,
    refetch,
    isRefetching,
  } = fetchAll(POST_ENDPOINT);
  const posts = data?.getAll || [];

  const isLoading = isLoadingAll;

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      {isLoading && isRefetching ? <div>Đang load...</div> : null}
      {posts && posts.map((post: IPost) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Posts;
