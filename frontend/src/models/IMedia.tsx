export interface IMedia {
  id: string;
  title: string;
  description: string;
  fileType: string;
  mediaType: number;
  like: Record<string, number>;
  dislike: Record<string, number>;
}
