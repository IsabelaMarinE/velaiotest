export interface ITaskModel {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export class TaskModel implements ITaskModel {
  id!: number;
  title!: string;
  userId!: number;
  completed!: boolean;
}
