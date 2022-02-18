export interface IPost {
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  mediaType: string;
  isAdult: boolean;
  file: Blob;
}
