export interface Project {
  id: string;
  projectName: string;
  oneLiner: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  role: string;
  category: string;
  techSkills: string[];
  dateRange: string;
  featured: boolean;
  demoLink?: string;
  repoLink?: string;
  impact: string[];
  responsibilities: string[];
  coverPath?: string;
  slug: string;
}

export interface NotionProject {
  id: string;
  properties: {
    [key: string]: any;
  };
}