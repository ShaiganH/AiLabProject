export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  category: 'web' | 'mobile' | 'ai' | 'backend';
}