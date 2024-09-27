import { Action, createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.action';
import { TaskModel } from '../../models/task.model';

export const TaskFetureKey = 'Task';

export interface TaskState {
    TasksResponse: Array<TaskModel> | undefined;
    Task: TaskModel | undefined;
    createTaskResponse: TaskModel | undefined;
    updateTaskResponse: TaskModel | undefined;
}

export const initialTaskState: TaskState = {
    TasksResponse: undefined,
    Task: undefined,
    createTaskResponse: undefined,
    updateTaskResponse: undefined,
};

export const TaskReducer = createReducer(
  initialTaskState,
    on(TaskActions.clearTaskFlags, (state: TaskState) => ({
        ...state,
        TasksResponse: undefined,
        createTaskResponse: undefined,
        Order: undefined,
        updateTaskResponse: undefined,
    })),
    on(TaskActions.loadTasksSuccess, (state: TaskState, { response }) => ({
        ...state,
        TasksResponse: response,
    })),
    on(TaskActions.loadTasksFail, (state: TaskState) => ({
        ...state,
        TasksResponse: undefined,
    })),
    // Get Task
    on(TaskActions.loadTask, (state: TaskState) => ({
        ...state,
        Order: undefined
    })),
    on(TaskActions.loadTaskSuccess, (state: TaskState, { response }) => ({
        ...state,
        Order: response
    })),
    on(TaskActions.loadTaskFail, (state: TaskState) => ({
        ...state,
        Order: undefined
    })),

    // Create Task
    on(TaskActions.createTask, (state: TaskState) => ({
        ...state,
        createTaskResponse: undefined
    })),
    on(TaskActions.createTaskSuccess, (state: TaskState, { response }) => ({
        ...state,
        createTaskResponse: response
    })),
    on(TaskActions.createTaskFail, (state: TaskState) => ({
        ...state,
        createTaskResponse: undefined
    })),

    // Update Task
    on(TaskActions.updateTask, (state: TaskState) => ({
        ...state,
        updateTaskResponse: undefined
    })),
    on(TaskActions.updatedTaskSuccess, (state: TaskState, { response }) => ({
        ...state,
        updateTaskResponse: response
    })),
    on(TaskActions.updatedTaskFail, (state: TaskState) => ({
        ...state,
        updateTaskResponse: undefined
    })),

);

export function taskReducerFunc(
    state: TaskState | undefined,
    action: Action
): any {
    return taskReducerFunc(state, action);
}

