export default interface IThread {
  id: string;
  content: string;
  userEmail: string;
  creationDateTime: string;
  threads: [];
  parentId: string;
}
