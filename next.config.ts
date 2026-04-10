import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: ["*.replit.dev", "*.repl.co"],
};

export default nextConfig;
