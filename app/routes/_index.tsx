import type { MetaFunction } from '@remix-run/cloudflare';
import ProfilePicture from '@/components/core/ProfilePicture';
import { Link } from '@remix-run/react';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: Profile.NAME },
    { name: 'description', content: Profile.DESCRIPTION },
  ];
};

export default function Index() {
  return (
    <div className="flex items-center justify-center flex-col mb-24">
      <ProfilePicture />
      <h1 className="leading text-2xl font-bold text-zinc-800 dark:text-zinc-100 py-2">
        This is
        {' '}
        {Profile.NAME}
        {' '}
        site
      </h1>
      <h2 className="text-lg text-zinc-500 dark:text-zinc-400 py-4">
        An awesome landing page is in progress.
        In the meantime, you can check out:
      </h2>
      <ul className="list-disc">
        <li>
          <Link to="/how-to-work-with-me" className="underline font-bold underline-offset-2 text-yellow-500">How to work with me</Link>
        </li>
        <li>
          <Link to="/where-i-am-today" className="underline font-bold underline-offset-2 text-yellow-500">Where I am today</Link>
        </li>
        <li>
          <Link to="https://what.jorgechato.com/" className="underline font-bold underline-offset-2 text-yellow-500">What I am doing Today</Link>
        </li>
      </ul>
    </div>
  );
}
