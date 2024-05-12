/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.igdb.com",
      },
    ],
  },
};

export default nextConfig;
