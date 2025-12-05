/** @type {import('next').NextConfig} */

const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:1337"
);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", ""), 
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/uploads/**",
      },
      {
        protocol: backendUrl.protocol.replace(":", ""),
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "zljsrfapkqfwregvucmx.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
