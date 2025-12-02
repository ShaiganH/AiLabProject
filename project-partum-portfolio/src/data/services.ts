import type { Service } from '../types/service';

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    icon: 'FiGlobe',
    features: ['React/Vue.js Development', 'Full-Stack Solutions', 'API Integration', 'Responsive Design'],
    pricing: 'contact'
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    icon: 'FiSmartphone',
    features: ['iOS & Android Apps', 'React Native', 'Flutter Development', 'App Store Deployment'],
    pricing: 'contact'
  },
  {
    id: '3',
    title: 'AI Solutions',
    description: 'Artificial intelligence and machine learning implementations',
    icon: 'FiBrain',
    features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Data Analytics'],
    pricing: 'contact'
  },
  {
    id: '4',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions and DevOps services',
    icon: 'FiCloud',
    features: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
    pricing: 'contact'
  }
];