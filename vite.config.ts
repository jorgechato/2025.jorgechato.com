import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/cloudflare' {
  interface Future {
    v3_singleFetch: true;
  }
}
export function loader({ context }: LoaderFunctionArgs) {
  const { env } = context.cloudflare;
  env.NOMADLIST_USERNAME;
  env.NOMADLIST_KEY;
  env.GITHUB_OWNER;
  env.GITHUB_GIST;
  env.GITHUB_TOKEN;
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
