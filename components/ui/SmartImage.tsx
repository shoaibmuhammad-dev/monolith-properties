"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { blurDataURL } from "@/lib/utils";

/** next/image with a blur placeholder and a graceful fallback if the remote image fails. */
export function SmartImage({ onError, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
      src={failed ? "/placeholder.svg" : props.src}
      unoptimized={failed || props.unoptimized}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
