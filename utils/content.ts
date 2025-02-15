import type { MenuType, RichSnSType, SnSType } from '~/utils/helper';
import menu from '~/content/menu.json';
import profile from '~/content/profile.json';
import sns from '~/content/sns.json';
import { SOCIAL_MEDIA } from '~/utils/helper';

export function getSNS(inHeader?: boolean): RichSnSType[] {
  let snsList: SnSType[] = sns;

  if (inHeader !== undefined) {
    snsList = sns.filter((item: SnSType) => item.inHeader === inHeader);
  }

  return snsList
    .map(item => ({
      ...item,
      icon: SOCIAL_MEDIA[item.name.toLowerCase()],
    }));
}

export function getNavItems(): MenuType[] {
  return [
    ...menu,
    ...sns.filter((item: SnSType) => item.inHeader),
  ] as MenuType[];
}

export const SnS: SnSType[] = sns;
export const SiteMap: MenuType[] = menu;
export const Profile = profile;
