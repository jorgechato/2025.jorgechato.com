import { NavLink } from '@remix-run/react';
import { Menu, X } from 'lucide-react';
import { getSiteMap, getSNS, Profile } from '~/utils/content';

export default function NavBar() {
  return (
    <header id="header-nav" className="fixed top-0 w-full px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-16">
        <NavLink
          to="/"
          className="relative z-10 flex items-center gap-4 flex-row"
        >
          <img src="/logo.webp" loading="lazy" className="w-5" alt="Logo" />
          <h2 className="text-xl font-bold">
            { Profile.HEADER }
          </h2>
        </NavLink>
        <nav
          id="header-menu"
          className="fixed w-full h-dvh inset-0 bg-white md:text-md lg:text-md flex flex-col items-center justify-center
            lg:justify-end md:justify-end gap-2 md:gap-8 -translate-y-full transition-transform duration-300 target:translate-y-0 md:static md:h-[initial] md:bg-[initial] md:flex-row md:translate-y-[initial]"
        >
          {getSiteMap(true).map(item => (
            <NavLink
              key={item.name}
              className="hover:opacity-100 transition-opacity duration-300 cursor-pointer font-semibold"
              to={item.url}
            >
              {item.name}
            </NavLink>
          ))}
          {getSNS(true).map(item => (
            <NavLink
              key={item.name}
              className="hover:opacity-100 transition-opacity duration-300 opacity-80 cursor-pointer"
              to={item.url}
              target="_blank"
            >
              <item.icon />
            </NavLink>
          ))}
          <a href="#header-nav" className="md:hidden absolute top-6 right-6">
            <X />
          </a>
        </nav>
        <a href="#header-menu" className="md:hidden"><Menu /></a>
      </div>
    </header>
  );
}
