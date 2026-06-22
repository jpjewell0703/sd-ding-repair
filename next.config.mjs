/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve AVIF (smallest) then WebP, falling back to the original.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
