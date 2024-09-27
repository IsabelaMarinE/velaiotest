export interface ICreateTaskRequest {
  title: string;
  userId: number;
  completed: boolean;
}

export class CreateTaskRequest implements ICreateTaskRequest {
  title!: string;
  userId!: number;
  completed!: boolean;
}
