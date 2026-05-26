export interface Section {
  id: string;
  num: string;
  label: string;
}

export type SkillLevel = 'confident' | 'building' | 'learning';

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface ExperienceEntry {
  date: string;
  company: string;
  role: string;
  body: string;
  tags: string[];
}

export interface Project {
  name: string;
  status: string;
  statusClass: string;
  role: string;
  color: string;
  accentBg: string;
  desc: string;
  tech: string[];
  glyph: string;
  githubUrl: string | null;
  liveUrl: string | null;
}

export interface OpenSourceEntry {
  title: string;
  framework: string;
  frameworkDesc: string;
  body: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export interface AboutMeta {
  label: string;
  value: string;
}

export interface AboutNow {
  pre: string;
  bold: string;
  post: string;
}

export interface AboutData {
  intro: string[];
  meta: AboutMeta[];
  now: AboutNow[];
}

export interface ContactChannel {
  label: string;
  value: string;
  url: string;
  icon: string;
}

export interface ContactSocial {
  name: string;
  url: string;
}

export interface ContactData {
  channels: ContactChannel[];
  socials: ContactSocial[];
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
