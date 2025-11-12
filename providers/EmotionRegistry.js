"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";

export default function EmotionRegistry({ children }) {
  const [cache] = useState(() => createCache({ key: "mui", prepend: true }));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
