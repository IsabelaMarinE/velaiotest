export interface IUpdateStatusTaskRequest {
  completed: boolean;
}

export class UpdateStatusTaskRequest implements IUpdateStatusTaskRequest {
  completed!: boolean;
}
