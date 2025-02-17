import type { MetaFunction } from '@remix-run/cloudflare';
import { Profile } from '~/utils/content';

export const meta: MetaFunction = () => {
  return [
    { title: Profile.NAME },
    { name: 'description', content: Profile.DESCRIPTION },
  ];
};

export default function Index() {
  return (
    <div className="flex items-center justify-center">
    </div>
  );
}
