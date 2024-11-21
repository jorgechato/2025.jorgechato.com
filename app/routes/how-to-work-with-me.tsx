import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [
    { title: 'Jorge' },
    { name: 'description', content: 'Entry point for my projects and ideas.' },
  ];
};

export default function Index() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <header className='flex flex-col items-center gap-9'>
          <h1 className='leading text-2xl font-bold text-zinc-800 dark:text-zinc-100'>
            How to work with me
          </h1>
          <h2 className='text-lg text-zinc-500 dark:text-zinc-400'>
            Work in progress
          </h2>
        </header>
      </div>
    </div>
  );
}
