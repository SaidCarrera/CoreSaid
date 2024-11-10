export interface Book {
  id?: string;
  title: string;
  author: string;
  ISBN: string;
  available: boolean;
  publicationYear: number;
  language: string;
  category: string;
}