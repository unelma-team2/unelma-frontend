/** @type {import('next').NextConfig} */

// Create a URL object from your env variable
const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
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
    ],
  },
};

export default nextConfig;
