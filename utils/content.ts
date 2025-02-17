import type { LinkType, SnSType } from '~/utils/helper';
import locations from '~/content/locations.json';
import menu from '~/content/menu.json';
import profile from '~/content/profile.json';
import sns from '~/content/sns.json';
import { SOCIAL_MEDIA } from '~/utils/helper';

export function getSNS(inHeader?: boolean): SnSType[] {
  let snsList: LinkType[] = sns;

  if (inHeader !== undefined) {
    snsList = sns.filter((item: LinkType) => item.inHeader === inHeader);
  }

  return snsList
    .map(item => ({
      ...item,
      icon: SOCIAL_MEDIA[item.name.toLowerCase()],
    }));
}

export function getSiteMap(inHeader?: boolean): LinkType[] {
  let menuList: LinkType[] = menu;

  if (inHeader !== undefined) {
    menuList = menu.filter((item: LinkType) => item.inHeader === inHeader);
  }

  return menuList as LinkType[];
}

export const SnS: LinkType[] = sns;
export const SiteMap: LinkType[] = menu;
export const Profile = profile;
export const ThumbnailLocations: Record<string, string> = locations;
