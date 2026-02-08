/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/issues',
        destination: '/caveat',
        permanent: true,
      },
      {
        source: '/issues/:slug',
        destination: '/caveat/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
