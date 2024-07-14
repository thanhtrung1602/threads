import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";

import { setCreatePost } from "~/Redux/actionSlice";
import Posts from "~/components/common/posts";
function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login.currentUser);

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="">
          <div className="text-center min-h-[60px] z-40 flex items-center justify-center w-[650px] bg-bg-primary sticky top-0">
            <span className="text-center text-[#f3f5f7] font-semibold text-[15px]">
              Dành cho bạn
            </span>
          </div>
          <div className="bg-second-color border-r border-l border-t border-b-outline w-[640px] min-h-[685px] rounded-tr-3xl rounded-tl-3xl">
            <div className="border-b border-b-outline flex items-center justify-between p-4 px-6">
              <div className="flex items-center text-[#777] gap-3 w-full">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={
                    user?.image ||
                    "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                  }
                  alt=""
                />
                <div
                  className="w-full"
                  onClick={() => dispatch(setCreatePost())}
                >
                  <span>Bắt đầu thread...</span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => dispatch(setCreatePost())}
                  className="px-4 text-[#f3f5f7] text-center border-b-outline border h-9 rounded-[10px]"
                >
                  Đăng
                </button>
              </div>
            </div>
            <div className="bg-second-color w-[640px] min-h-[620px] border-r border-b-outline rounded-tr-3xl rounded-tl-3xl">
              <div className="sticky top-0 bg-second-color w-[640px] border-r border-b-outline">
                <Posts />
              </div>
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
  );
}

export default Home;
