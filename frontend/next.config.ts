import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  /*
  experimental: {
    allowedDevOrigins: ["http://*.cloudworkstations.dev", "https://*.cloudworkstations.dev"],
  },
  */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
