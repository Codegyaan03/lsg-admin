export interface Article {
  id: string;
  title: string;
  content: string; // Replace with the actual content type
  source: {
    id: string;
    title: string;
    link: string;
  };
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  viewersCount: number;
}
