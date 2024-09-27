export interface ICreateUserModel {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export class CreateUserModel implements ICreateUserModel {
  name!: string;
  username!: string;
  email!: string;
  phone!: string;
  website!: string;
}
