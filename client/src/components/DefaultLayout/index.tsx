import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "~/components/layout/Header";
import CreatePost from "~/pages/Home/CreatePost";
import { setCloseComment, setCloseCreatePost } from "~/Redux/actionSlice";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const api = useSelector((state) => state?.api.actions);
  const dispatch = useDispatch();
  const refPost = useRef(null);
  const [topIsPost, setTopIsPost] = useState("");

  useEffect(() => {
    const node = refPost.current;
    if (node) {
      const observer = new MutationObserver(() => {
        if (node?.clientHeight >= 400) {
          setTopIsPost("top-[20px]");
        } else {
          setTopIsPost("top-[180px]");
        }
      });

      observer.observe(node, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  const handleClose = () => {
    if (api.isPostComment) {
      dispatch(setCloseComment());
    } else {
      dispatch(setCloseCreatePost());
    }
  };

  return (
    <div className="relative w-full" onClick={handleClose}>
      <div
        className={` ${
          api.isPost || api.isPostComment ? "opacity-20 fixed" : ""
        } bg-bg-primary w-full  flex -z-10`}
        onClick={(e) =>
          api.isPost || api.isPostComment ? null : e.stopPropagation()
        }
      >
        <Header />
        <div className="flex justify-center w-full">{children}</div>
      </div>
      <div
        className={`${topIsPost} absolute top-[180px] left-[30%] z-50 `}
        ref={refPost}
        onClick={(e) => e.stopPropagation()}
      >
        {api.isPost && <CreatePost />}
        {api.isPostComment && <CreatePost />}
      </div>
    </div>
  );
}

export default DefaultLayout;
