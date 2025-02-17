import { Github, Linkedin, Newspaper, Twitter } from 'lucide-react';

export const SOCIAL_MEDIA: Record<string, typeof Newspaper> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  substack: Newspaper,
};

export interface LinkType {
  name: string;
  url: string;
  inHeader: boolean;
}

export interface SnSType extends LinkType {
  icon: typeof Newspaper;
}
