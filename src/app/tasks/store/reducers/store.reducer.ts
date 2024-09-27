import { combineReducers } from '@ngrx/store';

//Reducers
import { TaskReducer, TaskState } from './task.reducer';

export const taskStoreFeatureKey = 'TaskStore';

export type TaskStoreState = {
  taskStore: TaskState
};

export const taskStoreReducer = combineReducers<TaskStoreState>({
  taskStore: TaskReducer
});
