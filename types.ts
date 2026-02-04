import { LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
}

export interface StepProps {
  number: string | number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface BlogPostProps {
  category: string;
  title: string;
  excerpt: string;
  image: string;
}
