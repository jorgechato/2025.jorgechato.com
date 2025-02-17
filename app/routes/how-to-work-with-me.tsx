import type { MetaFunction } from '@remix-run/cloudflare';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: `How to work with ${Profile.HEADER}` },
    { name: 'description', content: 'Key points to have a clear understanding of how to work with me.' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            How to work with me
          </h1>
        </header>
      </div>
    </div>
  );
}
