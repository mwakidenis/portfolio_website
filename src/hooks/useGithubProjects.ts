import { useState, useEffect, useMemo, useCallback } from 'react';
import { GithubRepo } from '@/types';

// Whitelist of repos to display
const FEATURED_REPOS = [
  'Mpesa-Based_Wi-Fi-Hotspot_Billing_System',
  'HornBill',
  'shamba-smart-scan',
  'react-portfolio',
  'denis-portfolio',
  'my-portfolio',
  'wifi-billing-system',
  'mpesa-integration',
];

export interface TransformedProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl: string;
  year: string;
  type: string;
  stars: number;
  forks: number;
}

interface UseGithubProjectsReturn {
  repos: TransformedProject[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGithubProjects = (): UseGithubProjectsReturn => {
  const [repos, setRepos] = useState<TransformedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const username = import.meta.env.VITE_GITHUB_USERNAME || 'mwakidenis';

      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      };

      if (token) {
        headers.Authorization = `token ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        }
        if (response.status === 404) {
          throw new Error('User not found.');
        }
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }

      const data: GithubRepo[] = await response.json();

      // Filter repos by whitelist
      const filteredRepos = data.filter((repo) => {
        return FEATURED_REPOS.includes(repo.name);
      });

      // Transform and sort repos
      const transformedRepos: TransformedProject[] = filteredRepos.map((repo) => ({
        id: repo.id.toString(),
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        description: repo.description || 'No description available',
        imageSrc: '/placeholder.svg',
        tags: repo.topics?.slice(0, 6) || [repo.language || 'Code'].filter(Boolean),
        liveDemoUrl: repo.homepage || undefined,
        githubUrl: repo.html_url,
        year: new Date(repo.created_at).getFullYear().toString(),
        type: repo.language || 'Project',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));

      // Sort by stars (descending)
      transformedRepos.sort((a, b) => b.stars - a.stars);

      setRepos(transformedRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return {
    repos,
    loading,
    error,
    refetch: fetchRepos,
  };
};

export default useGithubProjects;
