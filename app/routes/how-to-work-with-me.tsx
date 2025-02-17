import type { MetaFunction } from '@remix-run/cloudflare';
import type { Gist } from '~/utils/api';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: `How to work with ${Profile.HEADER}` },
    { name: 'description', content: 'Key points to have a clear understanding of how to work with me.' },
  ];
};

export async function loader() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line node/prefer-global/process
      'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "${process.env.GITHUB_OWNER}") {
            gist(name: "${process.env.GITHUB_GIST}") {
              files {
                text
              }
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    return '';
  }

  const body: Gist = await res.json();
  return body.data.user.gist.files[0].text;
}

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
