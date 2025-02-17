import type { LinksFunction } from '@remix-run/cloudflare';
import Footer from '@/components/core/Footer';
import NavBar from '@/components/core/NavBar';
import { ThemeProvider } from '@/components/core/ThemeProvider';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';

export const links: LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <NavBar />
          <section className="flex-grow mt-28">
            {children}
          </section>
          <Footer />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
