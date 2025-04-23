export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
}

export interface Event {
  _id: string;
  user: User;
  createdAt: string;
  tag: string;
  group: string;
  metaData: any;
  __v: number;
}