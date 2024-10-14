import React from "react";
import { useState, useEffect } from "react";
import "./loginstyles.css";
import Image from "next/image";
import loginLogo from "./images/TVS_Logo.svg";
import { notification } from "antd";
import loginText from "./images/TVS_Text.svg";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import { logHimIn, setRole } from "../../../slices/loginSlice";
type LoginProps = {
  renderer: () => void;
};

const users = [
  {
    id: 0,
    name: "userlogin",
    password: "12345",
  },
  {
    id: 1,
    name: "managerlogin",
    password: "12345",
  },
  {
    id: 2,
    name: "bosslogin",
    password: "12345",
  },
];

const Login = ({ renderer }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const currentRole = useSelector((state: RootState) => state.roleid.value);
  console.log(currentRole);
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(0);
  const [username, setUsername] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const onPassChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onCaptchaChange = (e: any) => {
    setUserCaptcha(e.target.value);
  };

  const handleLogin = () => {
    // console.log("pressed");
    if (
      username.length > 1 &&
      password.length === 5 &&
      captcha.toString() === userCaptcha
    ) {
      const user = users.find(
        (user) => user.name === username && user.password === password
      );

      if (user) {
        api.success({
          message: "Login Successfull",
          placement: "top",
        });
        // console.log("Redirecting to dashboard...");

        dispatch(setRole(user.id));
        localStorage.setItem("status", JSON.stringify(true));
        router.push("/Dashboard");
        renderer();
        // console.log(user.id);

        // setTimeout(() => {
        //   dispatch(logHimIn());
        // }, 500);
      } else {
        api.error({
          message: "No user found",
          placement: "top",
        });
      }
    } else {
      api.error({
        message: "Login Details incorrect, please try again",
        placement: "top",
      });
    }
  };

  const handleCaptchaVisible = () => {
    const capDiv = document.querySelector(".cap-img");
    capDiv?.classList.add("loadIn");
  };

  const handleHideCaptcha = () => {
    const capDiv = document.querySelector(".cap-img");
    capDiv?.classList.remove("loadIn");
  };
  const params = usePathname();

  //   useEffect(() => {
  //     if (params !== "/") {
  //       router.push("/");
  //     }
  //   }, [params]);

  useEffect(() => {
    setTimeout(() => {
      const leftBox = document.querySelector(".left-box") as HTMLElement;
      leftBox?.classList.add("loadIn");

      setTimeout(() => {
        const mainLogo = document.querySelector(".main-logo") as HTMLElement;
        mainLogo?.classList.add("loadIn");

        setTimeout(() => {
          const textLogo = document.querySelector(".text-logo") as HTMLElement;
          textLogo?.classList.add("loadIn");

          const mainLogo = document.querySelector(".main-logo") as HTMLElement;
          mainLogo?.classList.add("zoomOut");

          setTimeout(() => {
            const leftBoxx = document.querySelector(".left-box") as HTMLElement;

            leftBoxx?.classList.add("increaseH");
          }, 1500);

          setTimeout(() => {
            const rightBox = document.querySelector(
              ".form-container"
            ) as HTMLElement;

            rightBox?.classList.add("loadIn");

            setTimeout(() => {
              const fHead = document.querySelector(".form-head") as HTMLElement;

              fHead?.classList.add("loadIn");

              setTimeout(() => {
                setTimeout(() => {
                  const numBox = document.querySelector(
                    ".num-box"
                  ) as HTMLElement;

                  numBox?.classList.add("loadIn");
                  const passBox = document.querySelector(
                    ".pass-box"
                  ) as HTMLElement;

                  passBox?.classList.add("loadIn");

                  setTimeout(() => {
                    const capBox = document.querySelector(
                      ".cap-box"
                    ) as HTMLElement;

                    capBox?.classList.add("loadIn");

                    setTimeout(() => {
                      const btnBox = document.querySelector(".btn-box");
                      btnBox?.classList.add("loadIn");

                      setTimeout(() => {
                        const lastLine = document.querySelector(".reg-tag");
                        lastLine?.classList.add("loadIn");
                      }, 500);
                    }, 400);
                  }, 400);
                }, 400);
              }, 400);
            }, 1000);
          }, 2500);
        }, 500);
      }, 500);
    }, 200);

    const newCaptcha = Math.floor(Math.random() * 9000) + 1000;

    setCaptcha(newCaptcha);

    return () => {};
  }, []);

  return (
    <div className="wrapper-container w-full h-[100vh] flex justify-center items-center ">
      {contextHolder}
      <div className="wrapper-card overflow-hidden rounded-xl flex flex-col sm:flex-row">
        <div className="left-box  bg-white flex sm:flex-col  justify-center items-center">
          <Image src={loginLogo} alt="logo" className="main-logo" />

          <div className="bg-white overflow-hidden">
            <Image src={loginText} alt="text-logo" className="text-logo" />
          </div>
        </div>
        <div className="form-container   overflow-hidden">
          <div className="flex  formFlex">
            <div className="flex flex-col items-center login-page text-[#B4B4B8]    ">
              <p className="text-xl font-semibold mt-5 form-head text-white">
                Welcome Back
              </p>
              <div className="flex flex-col  items-start  num-box  mt-10 ">
                <label className="">
                  <p className="text-sm ">Username</p>
                </label>
                <input
                  value={username}
                  onChange={onUsernameChange}
                  type="text"
                  className="num-in text-base text-white mt-1 w-full"
                />
              </div>
              <div className="flex flex-col items-start pass-box mt-5">
                <label>
                  <p className="text-sm">Password</p>
                </label>
                <input
                  type="password"
                  className="pass-in text-base text-white mt-1 w-full"
                  value={password}
                  onChange={onPassChange}
                />
                <p className="text-[10px] hover:text-white ml-auto hover:scale-110">
                  Forgot Passowrd?
                </p>
              </div>
              <div className="flex cap-box  justify-between mt-3">
                <input
                  type="text"
                  value={userCaptcha}
                  onChange={onCaptchaChange}
                  placeholder="Captcha"
                  className="cap-in text-base text-white w-[40%]"
                  onFocus={handleCaptchaVisible}
                  onBlur={handleHideCaptcha}
                />
                <div
                  className={`cap-img w-[40%] h-full bg-pink-700  text-white flex justify-center tracking-widest`}>
                  {captcha}
                </div>
              </div>
              <div className="btn-box w-full">
                <button
                  className=" bg-[#3fbfff] w-full py-1 rounded-md hover:text-white text-[#2a2a72] mt-8"
                  onClick={handleLogin}>
                  Login
                </button>

                <p className="text-xs cursor-pointer mt-4">
                  Need an account?
                  <span className="text-white text-xs ">Register</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
