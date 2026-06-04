import type { ComponentType, ReactNode } from 'react';

export type StatItem = {
  value: string;
  label: string;
};

export type TrustPoint = string;

export type FeatureItem = {
  title: string;
  description: string;
  iconBackground: string;
  Icon: ComponentType;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  iconBackground: string;
  Icon: ComponentType;
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
