import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../api/client';

export const usePersonalInfo = () =>
  useQuery({
    queryKey: ['personal'],
    queryFn: api.getPersonalInfo,
    staleTime: 1000 * 60 * 10,
  });

export const useSkills = (params?: { category?: string; proficiency?: string }) =>
  useQuery({
    queryKey: ['skills', params],
    queryFn: () => api.getSkills(params),
    staleTime: 1000 * 60 * 5,
  });

export const useEducation = () =>
  useQuery({
    queryKey: ['education'],
    queryFn: api.getEducation,
    staleTime: 1000 * 60 * 5,
  });

export const useExperiences = () =>
  useQuery({
    queryKey: ['experiences'],
    queryFn: api.getExperiences,
    staleTime: 1000 * 60 * 5,
  });

export const useProjects = (params?: { skill?: string; search?: string }) =>
  useQuery({
    queryKey: ['projects', params],
    queryFn: () => api.getProjects(params),
    staleTime: 1000 * 60 * 2,
  });

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ['project', slug],
    queryFn: () => api.getProject(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

export const useReviews = (projectSlug: string) =>
  useQuery({
    queryKey: ['reviews', projectSlug],
    queryFn: () => api.getReviews(projectSlug),
    enabled: !!projectSlug,
    staleTime: 1000 * 60 * 2,
  });

export const usePostReview = (projectSlug: string) =>
  useMutation({
    mutationFn: (data: { name: string; email: string; message: string }) =>
      api.postReview(projectSlug, data),
  });