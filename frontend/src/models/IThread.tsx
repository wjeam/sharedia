export default interface IThread {
  id: string;
  content: string;
  userEmail: string;
  creationDateTime: string;
  like: string[];
  dislike: string[];
  threads: IThread[];
  parentId: string;
}
