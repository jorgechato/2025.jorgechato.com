interface Gist {
  data: {
    user: {
      gist: {
        files: {
          text: string;
        }[];
      };
    };
  };
}

export async function Gist(
  user: string,
  id: string,
  filePosition: number = 0,
): Promise<string> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "${user}") {
            gist(name: "${id}") {
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
    throw new Error(`Failed to fetch gist: ${res.status} ${res.statusText}`);
  }

  const body: Gist = await res.json();
  return body.data.user.gist.files[filePosition].text;
}
