/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/isbn/**",
      },
      {
        protocol: "https",
        hostname: "readmake.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
        port: "",
        pathname: "/images/g/HggAAOSwimBjL4BI/**",
      },
      {
        protocol: "https",
        hostname: "images.thalia.media",
        port: "",
        pathname: "/07/-/92885d86a7474687a7998d7b72ca95da/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/I/**",
      },
    ],
  },
};

module.exports = nextConfig;
