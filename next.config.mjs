/** @type {import('next').NextConfig} */

const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:1337"
);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", ""), // http or https
        hostname: backendUrl.hostname, // localhost or domain
        port: backendUrl.port, // 1337 / 1338 / etc.
        pathname: "/uploads/**", // path for Strapi uploads
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
