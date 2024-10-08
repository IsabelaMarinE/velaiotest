import { createAction, props } from '@ngrx/store';
import { TaskModel } from '../../models/task.model';
import { CreateTaskRequest } from '../../models/create-task.request';
import { UpdateTaskRequest } from '../../models/update-task.request';
import { GetTaskRequest } from '../../models/get-task.request';
import { UpdateStatusTaskRequest } from '../../models/update-status-task.request';


export const clearTaskFlags = createAction('[Tasks] Clear Task Flags');

export const clearTasks = createAction('[Tasks] Clear Tasks');

export const loadTasks= createAction(
  '[Tasks] Load Tasks'
);
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ response: Array<TaskModel> }>()
);
export const loadTasksFail = createAction('[Tasks] Load Tasks Fail');

// --------------Get Task
export const loadTask = createAction(
  '[Task] Load Task',
  props<{ request: GetTaskRequest }>()
);

export const loadTaskSuccess = createAction(
  '[Task] Load Task Success',
  props<{ response: TaskModel }>()
)

export const loadTaskFail = createAction(
  '[Task] Load Task Fail'
)

// --------------Create Task
export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ request: CreateTaskRequest}>()
);
export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ response: TaskModel}>()
);
export const createTaskFail = createAction(
  '[Tasks] Create Task Fail'
);

// --------------Updated Task
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ request: UpdateTaskRequest}>()
);
export const updatedTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ response: TaskModel}>()
);
export const updatedTaskFail = createAction(
  '[Tasks] Update Task Fail'
);

// --------------Updated Status Task
export const updateStatusTask = createAction(
  '[Tasks] Update Status Task',
  props<{ request: UpdateStatusTaskRequest, id: number}>()
);
export const updatedStatusTaskSuccess = createAction(
  '[Tasks] Update Status Task Success',
  props<{ response: TaskModel}>()
);
export const updatedStatusTaskFail = createAction(
  '[Tasks] Update Status Task Fail'
);
