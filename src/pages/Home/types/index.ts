import type { ReactNode } from 'react';

export type StatItem = {
  value: string;
  label: string;
};

export type TrustPoint = string;

export type FeatureItem = {
  title: string;
  description: string;
  iconBackground: string;
  Icon: () => JSX.Element;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  iconBackground: string;
  Icon: () => JSX.Element;
};

export type BlogPost = {
  title: string;
  category: string;
  readTime: string;
  coverBackground: string;
  Cover: () => JSX.Element;
};

export type CtaContent = {
  heading: ReactNode;
  description: string;
};
