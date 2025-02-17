import type { MetaFunction } from '@remix-run/cloudflare';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useLoaderData } from '@remix-run/react';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: `How to work with ${Profile.HEADER}` },
    { name: 'description', content: 'Key points to have a clear understanding of how to work with me.' },
  ];
};

export async function loader() {
  try {
    const filePath = path.resolve('content', 'how-to-work-with-me.md');
    const content = await readFile(filePath, 'utf-8');
    return content;
  }
  catch {
    return '';
  }
}

export default function Index() {
  const data = useLoaderData<string>();

  return (
    <section className="max-w-screen-md px-4 mb-24 object-center m-auto text-center select-none">
      <MarkdownRenderer content={data} />
    </section>
  );
}
