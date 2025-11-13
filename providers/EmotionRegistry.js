"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";

export default function EmotionRegistry({ children }) {
  const [cache] = useState(() =>
    createCache({
      key: "mui-style",
      prepend: false, // VERY IMPORTANT
    })
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
