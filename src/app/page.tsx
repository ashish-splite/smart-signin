"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { saveReturnUrl } from "./utils";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url") || "";

    saveReturnUrl(url);

    router.push("/signin");
  }, []);
  return null;
}
