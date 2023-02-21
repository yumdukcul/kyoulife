/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.IMAGE_URL],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    },
}

module.exports = nextConfig
