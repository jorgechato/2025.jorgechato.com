declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    GITHUB_TOKEN: string;
    GITHUB_OWNER: string;
    GITHUB_GIST: string;
    NOMADLIST_USERNAME: string;
    NOMADLIST_KEY: string;
  }
}
