export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'AI/ML' | 'Web/App' | 'Creative' | 'Blockchain';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'AI';
  description?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}