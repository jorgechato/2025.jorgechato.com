import { Link, NavLink } from '@remix-run/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getSiteMap, getSNS, Profile } from '~/utils/content';

export default function NavBar() {
  // State to track if the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Function to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header id="header-nav" className="fixed top-0 w-full px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-16">
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 flex-row"
        >
          <img src="/logo.webp" loading="lazy" className="w-9" alt="Logo" />
          <h2 className="text-xl font-bold">
            {Profile.HEADER}
          </h2>
        </Link>

        <nav
          id="header-menu"
          className={`fixed w-full h-dvh inset-0 md:text-md lg:text-md flex flex-col items-center justify-center
            lg:justify-end md:justify-end gap-2 md:gap-8 transition-transform duration-300 ${isMenuOpen ? 'translate-y-0 bg-white dark:bg-zinc-950' : '-translate-y-full'}
            md:static md:h-[initial] md:bg-[initial] md:flex-row md:translate-y-[initial]`}
        >
          {getSiteMap(true).map(item => (
            <NavLink
              key={item.name}
              className="hover:opacity-100 transition-opacity duration-300 cursor-pointer font-semibold"
              to={item.url}
              onClick={closeMenu} // Close the menu when a link is clicked
            >
              {item.name}
            </NavLink>
          ))}
          {getSNS(true).map((item, index) => (
            <NavLink
              key={item.name}
              className={`hover:opacity-100 transition-opacity duration-300 opacity-80 cursor-pointer -mx-2 ${index === 0 ? 'ml-0' : ''}`}
              to={item.url}
              target="_blank"
              onClick={closeMenu} // Close the menu when a link is clicked
            >
              <item.icon />
            </NavLink>
          ))}
          <a href="#header-nav" className="md:hidden absolute top-6 right-6" onClick={closeMenu}>
            <X />
          </a>
        </nav>

        <a href="#header-menu" className="md:hidden" onClick={toggleMenu}>
          <Menu />
        </a>
      </div>
    </header>
  );
}
