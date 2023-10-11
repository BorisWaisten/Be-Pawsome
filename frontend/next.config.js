/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.dog.ceo',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'google.com',
            port: '',
            pathname: '/**',
          },
          
        ],
      },
}

module.exports = nextConfig

