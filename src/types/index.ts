// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  year: string;
  type: string;
  featured?: boolean;
}

// GitHub Repository types
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

// Certificate types
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  imageUrl?: string;
  certificateLink?: string;
  category: string;
}

// Skill types
export interface Skill {
  name: string;
  category: string;
  level: number;
  icon?: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

// Accent color for tags
export type AccentColor = 
  | 'blue' 
  | 'purple' 
  | 'emerald' 
  | 'amber' 
  | 'crimson' 
  | 'cyan' 
  | 'pink' 
  | 'lime';

export const ACCENT_COLORS: Record<AccentColor, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20'
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20'
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20'
  },
  crimson: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20'
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20'
  },
  lime: {
    bg: 'bg-lime-500/10',
    text: 'text-lime-400',
    border: 'border-lime-500/20'
  }
};

// Helper function to get color by index
export const getAccentColor = (index: number): AccentColor => {
  const colors: AccentColor[] = ['blue', 'purple', 'emerald', 'amber', 'crimson', 'cyan', 'pink', 'lime'];
  return colors[index % colors.length];
};
