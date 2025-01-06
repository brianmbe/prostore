"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="Product Image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-center object-cover"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer",
              current === index && "border-2 border-green-500"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={80}
              height={80}
              onClick={() => setCurrent(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
