export interface IUserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export class UserModel implements IUserModel {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  phone!: string;
  website!: string;
}
