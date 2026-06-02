/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",   // Mux video thumbnails
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",   // Supabase storage (avatars, uploads)
      },
    ],
  },
  // Allow large video files to be served from public/ during development
  // (Production: use Mux streaming URLs instead)
  experimental: {
    serverComponentsExternalPackages: ["@mux/mux-node"],
  },
};

module.exports = nextConfig;
