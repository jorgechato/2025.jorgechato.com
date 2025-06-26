import { Link } from '@remix-run/react';
import { getSiteMap, getSNS, Profile } from '~/utils/content';

export default function Footer() {
  return (
    <footer className="bg-zinc-100/20 dark:bg-zinc-900/30">
      <div className="mx-auto w-full max-w-screen-xl p-4 px-6 py-6 lg:py-8">
        <div className="flex flex-row flex-wrap gap-16 sm:gap-8 justify-center">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              Follow my work at
            </h2>
            <ul className="flex flex-col gap-2 font-medium text-zinc-600 dark:text-zinc-400">
              {getSNS().map(item => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className="hover:underline duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              Site Map
            </h2>
            <ul className="flex flex-col gap-2 font-medium text-zinc-600 dark:text-zinc-400">
              {getSiteMap().map(item => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className="hover:underline duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-6 border-zinc-200/60 dark:border-zinc-800/60 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-zinc-300 dark:text-zinc-700 sm:text-center">
            &copy;
            {' '}
            {Profile.NAME}
            {' '}
            2013 -&nbsp;
            {new Date().getFullYear()}
&nbsp;
          </span>
        </div>
      </div>
    </footer>
  );
}
