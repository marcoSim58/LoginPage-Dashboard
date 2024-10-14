"use client";

import React, { useState } from "react";
import { Button, Menu, Typography, type MenuProps } from "antd";
import {
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import CompanyLogo from "./images/CompanyLogo.png";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "Home" },

  {
    key: "2",
    icon: <PieChartOutlined />,
    label: "Settings",
    children: [
      { key: "201", icon: <PieChartOutlined />, label: "Update Password" },
      { key: "202", icon: <PieChartOutlined />, label: "Profile" },
    ],
  },

  {
    key: "3",
    icon: <PieChartOutlined />,
    label: "Information & Policy",
    children: [
      { key: "301", icon: <PieChartOutlined />, label: "User Agreement" },
      { key: "302", icon: <PieChartOutlined />, label: "Certificate" },
      { key: "303", icon: <PieChartOutlined />, label: "Safety & Security" },
      { key: "304", icon: <PieChartOutlined />, label: "Privacy Policy" },
      { key: "305", icon: <PieChartOutlined />, label: "Terms & Conditions" },
    ],
  },
];

interface ChildrenProp {
  siderclose: () => void;
  siderHoverToggle: () => void;
  sidercollapsed: boolean;
  holdOpen: boolean;
}

const Sidebar: React.FC<ChildrenProp> = ({
  siderclose,
  sidercollapsed,
  holdOpen,
  siderHoverToggle,
}) => {
  return (
    <div className="h-full flex md:flex-col flex-col-reverse ">
      <div
        className="h-[100%] pt-2 overflow-auto scrollbar-setting"
        onMouseEnter={() => {
          !holdOpen ? siderHoverToggle() : "";
          console.log("hovered");
        }}
        onMouseLeave={() => (!holdOpen ? siderHoverToggle() : "")}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          inlineIndent={24}
          items={items}
        />
      </div>

      <div className="border border-slate-300 flex justify-center items-center h-10 ">
        <Button type="text" onClick={siderclose} className="w-full">
          {sidercollapsed ? (
            <MenuUnfoldOutlined />
          ) : (
            <div className="flex items-center justify-center">
              <MenuFoldOutlined />
              <Typography className="text-slate-400 ml-3"> Collapse</Typography>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
