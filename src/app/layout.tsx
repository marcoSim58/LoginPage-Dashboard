"use client";

import { Inter } from "next/font/google";
import "./globals.css";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import { store } from "../../store";
import { Provider } from "react-redux";
import CustomLayout from "./customLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <StyledComponentsRegistry>
            <CustomLayout>{children}</CustomLayout>
          </StyledComponentsRegistry>
        </body>
      </Provider>
    </html>
  );
}
