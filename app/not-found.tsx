"use client";

import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import PreviousPage from "@/components/share/previouspage/previous-page";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={APP_NAME}
        width={100}
        height={100}
        priority={true}
      />
      <div className="shadow-md p-6 rounded-lg w-1/3 text-center"></div>
      <h1 className="mt-4 mb-4 font-bold text-3xl">Page Not Found</h1>
      <p className="text-destructive">Could not find the requested page</p>
      <PreviousPage />
    </div>
  );
}
