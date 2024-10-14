import React, { useState } from "react";
import Image from "next/image";
import CompanyLogo from "./images/TVS_Motor.svg";
import ProfileImage from "./images/Ar.jpg";
import { Avatar, Button, Popover, Typography } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  PinterestOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

// type LogoutProps = {
//   renderer: () => void;
// };

const CustomHeader = ({ renderer }) => {
  const router = useRouter();
  const handleLogOut = () => {
    const statusToStore: boolean = false;
    localStorage.setItem("status", JSON.stringify(statusToStore));
    router.push("/");
    renderer();
  };
  const content = (
    <div className="text-center p-2">
      <p className="text-2xl mt-2 font-semibold text-slate-700">Arnold</p>
      <p className="mt-1 font-">+91 9919 999 000</p>
      <div className="flex gap-4 mt-4">
        <div className="bg-[#F0F3FF] rounded-md p-2">
          <p className=" font-semibold text-slate-600 mr-2 w-[200px] ">
            Employee Account{" "}
          </p>
        </div>
      </div>
      <div className="border-b border-gray-300 mt-5"></div>
      <div className="flex flex-col">
        <Button className=" mt-6" size="large">
          <div className="flex">
            <PinterestOutlined className=" text-xl" />
            <p className=" text-base ml-6  text-slate-700">Change PIN</p>
          </div>
        </Button>
        <Button className=" mt-2" size="large">
          <div className="flex">
            <SettingOutlined className=" text-xl" spin />
            <p className=" text-base ml-6  text-slate-700">Settings</p>
          </div>
        </Button>
        <Button className=" mt-2" size="large">
          <div className="flex" onClick={handleLogOut}>
            <LogoutOutlined className=" text-xl" />
            <p className=" text-base ml-6  text-slate-700">Logout</p>
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center h-full justify-between">
      <Image
        src={CompanyLogo}
        width={180}
        alt="logo-img"
        className="bg-[#F0F3FF]"
      />
      <div className="flex h-full items-center">
        <Popover content={content} trigger="click" placement="bottomRight">
          <Avatar
            size={45}
            src={
              <Image
                src={ProfileImage}
                alt="profile-logo"
                width={undefined}
                height={undefined}
              />
            }
            alt="Profile-logo"
          />
        </Popover>
      </div>
    </div>
  );
};

export default CustomHeader;
