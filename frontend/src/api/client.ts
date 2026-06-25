import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10_000,
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Skill {
  id: number;
  name: string;
  slug: string;
  category: 'Language' | 'Framework' | 'Tool' | 'Other';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
  description: string;
}

export interface PersonalInfo {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  photo: string;
  description: string;
  github_link: string | null;
  linkedin_link: string | null;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  duration: string;
  description: string;
}

export interface Experience {
  id: number;
  title: string;
  slug: string;
  company: string;
  start_date: string;
  end_date: string | null;
  duration: string;
  skills_earned: Skill[];
  description: string;
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  main_image: string;
  short_description: string;
  description?: string;
  images?: ProjectImage[];
  skills_used: Skill[];
  github_link: string | null;
  live_preview_link: string | null;
  created_at: string;
  end_date: string | null;
  order: number;
}

export interface ProjectReview {
  id: number;
  project: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// ─── API functions ────────────────────────────────────────────────────────────

export const api = {
  getPersonalInfo: () =>
    apiClient.get<PersonalInfo>('/personal/me/').then(r => r.data),

  getSkills: (params?: { category?: string; proficiency?: string }) =>
    apiClient.get<Skill[]>('/skills/', { params }).then(r => r.data),

  getEducation: () =>
    apiClient.get<Education[]>('/education/').then(r => r.data),

  getExperiences: () =>
    apiClient.get<Experience[]>('/experience/').then(r => r.data),

  getProjects: (params?: { skill?: string; search?: string }) =>
    apiClient.get<Project[]>('/projects/', { params }).then(r => r.data),

  getProject: (slug: string) =>
    apiClient.get<Project>(`/projects/${slug}/`).then(r => r.data),

  getReviews: (projectSlug: string) =>
    apiClient.get<ProjectReview[]>(`/projects/${projectSlug}/reviews/`).then(r => r.data),

  postReview: (projectSlug: string, data: { name: string; email: string; message: string }) =>
    apiClient.post<ProjectReview>(`/projects/${projectSlug}/reviews/`, data).then(r => r.data),
};