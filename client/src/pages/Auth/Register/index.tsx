import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { fetchPost } from "~/API";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: register } = fetchPost();
  const navigate = useNavigate();
  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      idUser: username,
      email,
      username: fullName,
      password,
    };
    register(
      { url: "/auth/register", data },
      {
        onSuccess: () => {
          toast.success("Register successful!");
          navigate("/accounts/login");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center mt-6 bg-white">
      <div className="flex gap-3">
        <div className="">
          <img
            className="w-[380px] h-[581px]"
            src="https://res.cloudinary.com/dxuknuxer/image/upload/v1719908315/threads/Screenshot_2024-07-02_151649_dghe3i.png"
            alt=""
          />
        </div>
        <div className="border w-[350px]">
          <div className="flex items-center justify-center mt-9 mb-3">
            <img
              className="w-[174px] "
              src="https://res.cloudinary.com/dxuknuxer/image/upload/v1719861326/threads/thread-brand-design-logo-png-19_twltpd.png"
              alt=""
            />
          </div>
          <h2 className="text-center mx-10 text-[#737373] text-base font-semibold mt-3 mb-6">
            Sign up to see photos and videos from your friends.
          </h2>
          <form onSubmit={handleSubmitRegister}>
            <div className="flex flex-col">
              <div className="mx-10 mb-1.5 ">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pt-[9px] outline-none pb-[7px] pl-[8px] bg-[#fafafa] border w-[268px] h-9 rounded-sm"
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                />
              </div>
              <div className="mx-10 mb-1.5 ">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pt-[9px] outline-none pb-[7px] pl-[8px] bg-[#fafafa] border w-[268px] h-9 rounded-sm"
                  type="text"
                  name=""
                  id=""
                  placeholder="Username"
                />
              </div>
              <div className="mx-10 mb-1.5 ">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pt-[9px] outline-none pb-[7px] pl-[8px] bg-[#fafafa] border w-[268px] h-9 rounded-sm"
                  type="text"
                  name=""
                  id=""
                  placeholder="Full Name"
                />
              </div>
              <div className="mx-10 mb-1.5 ">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pt-[9px] outline-none pb-[7px] pl-[8px] bg-[#fafafa] border w-[268px] h-9 rounded-sm"
                  type="text"
                  name=""
                  id=""
                  placeholder="Password"
                />
              </div>
            </div>
            <p className="mx-10 text-center flex flex-col">
              <span className="text-center text-[#737373] text-xs mt-3">
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </span>
              <span className="text-center text-[#737373] text-xs mt-3 mb-6">
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </span>
            </p>
            <div className="mx-10 my-2">
              <button className="border w-[268px] h-8 bg-custom-blue text-white rounded-lg px-4 py-[7px] leading-3 text-sm font-semibold">
                Sign up
              </button>
            </div>

            <p className="mx-10 text-center text-sm">Have an account? Log in</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
