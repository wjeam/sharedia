export interface IMedia {
  id: string;
  title: string;
  description: string;
  fileType: string;
  mediaType: number;
  userEmail: string;
  like: string[];
  dislike: string[];
  isAdult: boolean;
}
