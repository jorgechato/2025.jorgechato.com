import type { MetaFunction } from '@remix-run/cloudflare';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type { Gist } from '~/utils/api';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useLoaderData } from '@remix-run/react';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: `How to work with ${Profile.HEADER}` },
    { name: 'description', content: 'Key points to have a clear understanding of how to work with me.' },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  let res: Response = null;
  try {
    res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line node/prefer-global/process
        'Authorization': `Bearer ${context.cloudflare.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        query {
          user(login: "${context.cloudflare.env.GITHUB_OWNER || process.env.GITHUB_OWNER}") {
            gist(name: "${context.cloudflare.env.GITHUB_GIST || process.env.GITHUB_GIST}") {
              files {
                text
              }
            }
          }
        }
      `,
      }),
    });

    const body: Gist = await res.json();
    return body.data.user.gist.files[0].text;
  }
  catch (error) {
    return `${error} [${res.status} ${res.statusText} ${context.cloudflare.env.GITHUB_OWNER} ${context.cloudflare.env.GITHUB_GIST}]`;
  }
}

export default function Index() {
  const data = useLoaderData<string>();
  console.log(data);

  return (
    <section className="max-w-screen-md px-4 mb-24 object-center m-auto text-center select-none">
      <MarkdownRenderer content={data} />
    </section>
  );
}
