export interface IGetTaskRequest {
  id: string;
}

export class GetTaskRequest implements IGetTaskRequest {
  id!: string;
}
