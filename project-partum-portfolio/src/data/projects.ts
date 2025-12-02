import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: '/images/project1.jpg',
    projectUrl: 'https://example.com',
    category: 'web'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    imageUrl: '/images/project2.jpg',
    category: 'mobile'
  },
  {
    id: '3',
    title: 'AI Chatbot System',
    description: 'Intelligent customer service chatbot with natural language processing',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    imageUrl: '/images/project3.jpg',
    category: 'ai'
  }
];