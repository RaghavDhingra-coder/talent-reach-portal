
export type UserRole = 'jobseeker' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  position?: string;
  location?: string;
  bio?: string;
  website?: string;
  resume?: string;
  skills?: string[];
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  category: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  featured: boolean;
  urgent: boolean;
  postedBy: string;
  postedAt: string;
  expireAt: string;
  applicants?: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'rejected' | 'accepted';
  appliedAt: string;
}

export interface JobCategory {
  id: string;
  name: string;
  count: number;
}

export interface JobFilter {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  featured?: boolean;
  urgent?: boolean;
  sort?: 'newest' | 'oldest' | 'relevance';
}

export interface Stats {
  jobs: number;
  companies: number;
  jobseekers: number;
  applications: number;
}
