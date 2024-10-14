import React from "react";
import { Layout, Flex } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState, useEffect } from "react";
import Sidebar from "./Component/sidebar";
import CustomHeader from "./Component/customHeader";
import Login from "./Login/login";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

interface CustomLayoutProps {
  children: React.ReactNode;
  //   isLoggedIn: boolean;
  //   collapsed: boolean;
  //   toggleCollapsed: () => void;
  //   toggleCollapsedOnHover: () => void;
  //   siderWidth: string;
}

const headerStyle: React.CSSProperties = {
  textAlign: "center",

  height: 64,
  padding: "0 30px",

  backgroundColor: "#F0F3FF",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "100%",
  overflow: "auto",

  backgroundColor: "#ffff",
};

const siderStyle: React.CSSProperties = {
  // lineHeight: '120px',
  color: "#fff",
  backgroundColor: "#ffff",
};

const layoutStyle = {
  height: "100vh",
  width: "100vw",
};

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const router = useRouter();
  const loggedIn = useSelector((state: RootState) => state.roleid.loggedin);
  // console.log(loggedIn);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  const [keepOpen, setKeepOpen] = useState(false);

  const [siderWidth, setWidth] = useState("240px");

  const [rerender, setrender] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);

    setKeepOpen(!keepOpen);
  };

  const toggleCollapsedOnHover = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setWidth("100%");
      console.log("width changed");
    }

    const storedStatus = localStorage.getItem("status");
    const status: boolean =
      storedStatus !== null ? JSON.parse(storedStatus) : false;
    console.log(status);
    setLoggedIn(status);
  }, []);

  const forceRender = () => {
    setLoggedIn(!isLoggedIn);
  };

  //   console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <Flex>
          <Layout style={layoutStyle}>
            <Header className="border-b-2" style={headerStyle}>
              <CustomHeader renderer={forceRender} />
            </Header>

            <Layout>
              <Sider
                collapsed={collapsed}
                width={siderWidth}
                style={siderStyle}>
                <Sidebar
                  siderclose={toggleCollapsed}
                  siderHoverToggle={toggleCollapsedOnHover}
                  sidercollapsed={collapsed}
                  holdOpen={keepOpen}
                />
              </Sider>
              <Content style={contentStyle}>{children}</Content>
            </Layout>
          </Layout>
        </Flex>
      ) : (
        <Login renderer={forceRender} />
      )}
    </div>
  );
};

export default CustomLayout;
