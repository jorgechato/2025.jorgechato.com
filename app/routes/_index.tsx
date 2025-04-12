import type { MetaFunction } from '@remix-run/cloudflare';
import { ThreeD } from '@/components/ThreeD';
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
      <ThreeD name={Profile.AT} bg={Profile.COLOR} />
    </div>
  );
}
