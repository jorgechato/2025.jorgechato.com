import { Github, Linkedin, Newspaper, Twitter } from 'lucide-react';

export const SOCIAL_MEDIA: Record<string, typeof Newspaper> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  substack: Newspaper,
};

export interface MenuType {
  name: string;
  url: string;
}

export interface SnSType {
  name: string;
  url: string;
  inHeader: boolean;
}

export interface RichSnSType extends SnSType {
  icon: typeof Newspaper;
}
