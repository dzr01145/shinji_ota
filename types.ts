export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'Consulting' | 'Safety DX' | 'Research' | 'Crisis Mgmt';
}

export interface Skill {
  name: string;
  nameJa?: string;
  level: number; // 0-100
  icon: string;
  category: 'Safety Mgmt' | 'Engineering' | 'DX & Analysis' | 'Consulting';
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