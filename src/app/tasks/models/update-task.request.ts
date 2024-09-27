export interface IUpdateTaskRequest {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export class UpdateTaskRequest implements IUpdateTaskRequest {
  id!: number;
  title!: string;
  userId!: number;
  completed!: boolean;
}
