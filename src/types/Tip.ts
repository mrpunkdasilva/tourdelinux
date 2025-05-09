export interface Tip {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
}

export interface TipCategory {
  id: string;
  name: string;
}

export interface RelatedTip {
  id: number;
  title: string;
  excerpt: string;
}