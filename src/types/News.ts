export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  source: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

export interface NewsCategory {
  id: string;
  name: string;
}