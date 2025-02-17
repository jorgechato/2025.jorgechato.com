import type { MetaFunction } from '@remix-run/cloudflare';
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
    const response = await fetch('https://gist.githubusercontent.com/jorgechato/7ac38bc8be549240ff1835f83cc74adf/raw');
    const content = await response.text();
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
