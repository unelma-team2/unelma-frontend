"use client";
import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export default function EmotionRegistry({ children }) {
  const [cache] = React.useState(() =>
    createCache({
      key: "mui-custom",
      prepend: false,
    })
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
