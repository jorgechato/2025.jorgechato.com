import { GithubIcon } from '@/icons/brand/github';
import { LinkedinIcon } from '@/icons/brand/linkedin';
import { XIcon } from '@/icons/brand/x';

export const SOCIAL_MEDIA: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  // substack: Newspaper,
};

export interface LinkType {
  name: string;
  url: string;
  inHeader: boolean;
}

export interface SnSType extends LinkType {
  icon: typeof GithubIcon;
}
