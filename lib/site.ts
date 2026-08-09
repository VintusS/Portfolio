const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const siteUrl = deploymentHost
  ? deploymentHost.startsWith("http")
    ? deploymentHost
    : `https://${deploymentHost}`
  : "http://localhost:3000";

export const githubUrl = "https://github.com/VintusS";
export const linkedinUrl =
  "https://www.linkedin.com/in/%EF%A3%BF-dragomir-m%C3%AEndrescu-34236227b/";

