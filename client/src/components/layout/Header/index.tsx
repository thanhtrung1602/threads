import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import icon from "~/assets/img";
import { Link, useParams } from "react-router-dom";
import { setHome, setProfile, setSearch } from "~/Redux/actionSlice";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import LogoutIcon from "@mui/icons-material/Logout";
import { loginSuccess } from "~/Redux/authSlice";
function Header() {
  const { id } = useParams();
  const { feedType } = useSelector((state) => state?.api.actions);
  const [urlIdUser, setUrlIdUser] = useState(id);
  const [isLogout, setIsLogout] = useState(false);
  const u = useSelector((state) => state?.auth.login.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (u?.idUser !== urlIdUser) {
      setUrlIdUser(u?.idUser);
    }
  }, [u, urlIdUser]);
  return (
    <div className="bg-bg-primary w-[76px] h-[100vh] overflow-y-visible min-h-[480px] fixed">
      <div className="flex flex-col justify-between h-full">
        <div className=" flex items-center justify-center my-[15px] ml-3">
          <img className="w-[34px] h-[34px]" src={icon.logo} alt="" />
        </div>
        <div className="flex  flex-col ml-3">
          <Link to={"/"}>
            <button
              className="relative h-[60px] w-[60px] hover:bg-custom-bgC rounded-lg"
              onClick={() => dispatch(setHome())}
            >
              <FontAwesomeIcon
                className={`${
                  feedType === "home" && "text-[#fff]"
                }  h-6 w-6 text-[#4d4d4d] absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4`}
                icon={faHouse}
              />
            </button>
          </Link>
          <Link to={"/search"}>
            <button
              className="relative h-[60px] w-[60px] hover:bg-custom-bgC rounded-lg"
              onClick={() => dispatch(setSearch())}
            >
              <FontAwesomeIcon
                className={`${
                  feedType === "search" && `text-[#fff]`
                }  h-6 w-6 text-[#4d4d4d] absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4`}
                icon={faSearch}
              />
            </button>
          </Link>
          <button className="relative h-[60px] w-[60px] hover:bg-custom-bgC rounded-lg">
            <FontAwesomeIcon
              className="h-6 w-6 text-[#4d4d4d] absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
              icon={faHeart}
            />
          </button>
          <Link to={`/${String(urlIdUser)}`}>
            <button
              className="relative h-[60px] w-[60px] hover:bg-custom-bgC rounded-lg"
              onClick={() => {
                dispatch(
                  setProfile({
                    idUser: String(urlIdUser),
                    feedType: "profile",
                  })
                );
              }}
            >
              <FontAwesomeIcon
                className={`${
                  feedType === "profile" && id === u?.idUser
                    ? "text-[#fff]"
                    : "text-[#4d4d4d]"
                }  h-6 w-6 text-[#4d4d4d] absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4`}
                icon={faUser}
              />
            </button>
          </Link>
        </div>
        <Tippy
          interactive
          visible={isLogout}
          render={(attrs) => (
            <div
              className="text-[15px] text-[#f3f5f7] font-semibold p-2 w-[240px] border border-b-outline rounded-xl"
              {...attrs}
            >
              <div
                className="p-3 cursor-pointer flex items-center justify-between"
                onClick={() => dispatch(loginSuccess(null))}
              >
                <span className="">Đăng xuất</span>
                <LogoutIcon />
              </div>
            </div>
          )}
          onClickOutside={() => setIsLogout(false)}
        >
          <div
            onClick={() => setIsLogout(true)}
            className="relative h-[60px] w-[60px] hover:bg-custom-bgC rounded-lg pb-[22px] ml-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#4d4d4d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-[#4d4d4d] absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;
