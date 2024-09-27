export interface IGetUserRequest {
  id: string;
}

export class GetUserRequest implements IGetUserRequest {
  id!: string;
}
