import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'roollloo35-max.github.io',
      port: '',
      pathname: '/**'
    }]
  },

  reactCompiler: true,
};

export default nextConfig;
