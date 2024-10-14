"use client";

import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard/dashboard";
import Login from "./Login/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const params = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (params === "/") {
      router.push("/Dashboard");
    }
  }, [params, router]);

  return <div className="h-full"></div>;
}
