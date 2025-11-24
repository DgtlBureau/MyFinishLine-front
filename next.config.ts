import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["images.unsplash.com", "logo.clearbit.com"],
  },
};

export default nextConfig;
