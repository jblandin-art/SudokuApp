/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  images: {
    // When using `output: 'export'` (static HTML export) the Next.js
    // Image Optimization API is not available. Disable optimization
    // so `next/image` will render plain images instead of calling
    // the image optimization API at runtime.
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "/jblandin",
  assetPrefix: "/jblandin/",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/jblandin",
  },
};

export default nextConfig;
