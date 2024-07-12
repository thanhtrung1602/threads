import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "~/Redux/requsetApi";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      idUser: user,
      password,
    };
    loginUser(data, dispatch, navigate, toast);
  };

  return (
    <div className="bg-black w-full h-screen bg-no-repeat top-0 bg-contain bg-top bg-[url(https://res.cloudinary.com/dxuknuxer/image/upload/v1719914543/threads/7LVg0KiH0gH_vntdjm.png)]">
      <div className="flex items-center justify-center pt-4">
        <div className=" max-w-[418px] p-6 mt-[15vh] mb-[52px]">
          <h2 className="text-white text-center mb-3">Login</h2>
          <div className="flex flex-col">
            <form className="flex-1 mb-3" onSubmit={handleLogin}>
              <div className="mb-2 rounded-xl px-4 py-4 w-[370px] bg-[#1e1e1e] ">
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="text-[15px] rounded-xl  outline-none text-white w-full bg-[#1e1e1e]"
                  type="text"
                  name=""
                  id=""
                  placeholder="Username or email"
                />
              </div>
              <div className="mb-2 rounded-xl px-4 py-4 w-[370px] bg-[#1e1e1e] ">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[15px] rounded-xl  outline-none text-white w-full bg-[#1e1e1e]"
                  type="text"
                  name=""
                  id=""
                  placeholder="Password"
                />
              </div>
              <div className="mb-2 rounded-xl px-4 py-4 w-[370px] bg-white">
                <button
                  className="text-[15px] rounded-xl  outline-none text-zinc-400 w-full "
                  type="submit"
                >
                  Log in
                </button>
              </div>
              <p className="text-[#777] text-[15px] text-center">
                Forgot password?
              </p>
            </form>
            <div className="mt-6 flex items-center mb-3 gap-2">
              <div className="border w-[45%]"></div>
              <span className=" text-[#777] text-[15px] ">or</span>
              <div className="border w-[45%]"></div>
            </div>

            <div className="w-[370px] flex-1 py-5 pr-3 pl-5 border mt-5 h-[86px] rounded-2xl">
              <button className="flex items-center justify-between w-full">
                <img
                  className="w-[45px] h-[45px]"
                  src="https://res.cloudinary.com/dxuknuxer/image/upload/v1719918476/threads/ig-logo-135_dmy800.png"
                  alt="ig-logo"
                />
                <span className="text-[#f3f5f7] text-base font-bold">
                  Continue with Instagram
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 h-4 w-4 text-[#767676]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-14">
        <ul className="text-[#777] text-xs flex items-center gap-4">
          <li>&copy; 2024</li>
          <li>Threads Terms</li>
          <li>Privacy Policy</li>
          <li>Cookies Policy</li>
          <li>Cookie Settings</li>
          <li>Report a problem</li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
