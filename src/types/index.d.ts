export interface IUser {
  email: string;
  name: string;
  password: string;
}
export interface IColor {
  name: string;
  id: string;
  code: string;
}
export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}
export interface ICategory {
  _id: String;
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

export interface ITask {
  _id: String;
  name: String;
  categoryId: String;
  user: string;
  isCompleted: boolean;
  isEditable: boolean;
  date: String;
  createdAt: String;
  updatedAt: String;
}
