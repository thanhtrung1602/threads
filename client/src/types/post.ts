import { IUser } from "./user";

export interface IPost {
  id: number;
  content: string;
  media: string;
  idUser: string;
  createdAt: Date;
  userData: IUser;
}
