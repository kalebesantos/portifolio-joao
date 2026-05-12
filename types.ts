
export interface VideoProject {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string; // Opcional para projetos que são apenas fotos
  section: 'reels' | 'video';
  followers?: string;
  isCustomDescription?: boolean;
  isPhoto?: boolean; // Novo campo para indicar se é uma foto
}

export enum SectionId {
  ABOUT = 'about',
  PORTFOLIO = 'portfolio',
  SERVICES = 'services',
  CONTACT = 'contact'
}
