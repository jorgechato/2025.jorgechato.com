declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    NOMADLIST_USERNAME: string;
    NOMADLIST_KEY: string;
  }
}
