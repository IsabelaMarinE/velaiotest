import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTaskStore from '../reducers/store.reducer';

export const selectTaskStoreState =
  createFeatureSelector<fromTaskStore.TaskStoreState>(
    fromTaskStore.taskStoreFeatureKey
  );

export const selectTasks = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.TaskStoreState) =>
    state.taskStore.TasksResponse
);

export const createTaskResponse = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.TaskStoreState) =>
    state.taskStore.createTaskResponse
);

export const selectTask = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.TaskStoreState) =>
    state.taskStore.Task
);

export const selectUpdateTaskResponse = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.TaskStoreState) =>
    state.taskStore.updateTaskResponse
);

