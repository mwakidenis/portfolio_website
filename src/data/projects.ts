import { Project } from '@/types';

// Featured project - Mpesa WiFi Billing System (always pinned at top)
export const FEATURED_PROJECT: Project = {
  id: '1',
  title: 'Mpesa-Based Wi-Fi Hotspot Billing System 🧾',
  description: 'A Wi-Fi hotspot billing system with M-Pesa STK Push, Okoa Internet option, time-based access, MikroTik control (MikroTik RB750UPr2), real-time monitoring, and a web-based admin dashboard.',
  imageSrc: '/JobPortal.png',
  tags: ['React', 'Node.js', 'Next.js', 'MySQL', 'Prisma', 'M-Pesa', 'MikroTik'],
  liveDemoUrl: 'https://anotherone-production-dcdb.up.railway.app',
  githubUrl: 'https://github.com/mwakidenis/Mpesa-Based_Wi-Fi-Hotspot_Billing_System',
  year: '2025',
  type: 'Web App',
  featured: true,
};

// Other hardcoded projects to keep (if any)
export const STATIC_PROJECTS: Project[] = [
  // Add any static projects here that shouldn't come from GitHub
];

// GitHub repo whitelist - these repos will be fetched from GitHub API
export const GITHUB_WHITELIST = [
  'Mpesa-Based_Wi-Fi-Hotspot_Billing_System',
  'HornBill',
  'shamba-smart-scan',
  'react-portfolio',
  'denis-portfolio',
  'my-portfolio',
  'wifi-billing-system',
  'mpesa-integration',
];
