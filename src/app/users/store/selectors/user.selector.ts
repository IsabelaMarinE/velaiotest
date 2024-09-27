import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUserStore from '../reducers/store.reducer';

export const selectUserStoreState =
  createFeatureSelector<fromUserStore.UserStoreState>(
    fromUserStore.UserStoreFeatureKey
  );

export const selectUsers = createSelector(
  selectUserStoreState,
  (state: fromUserStore.UserStoreState) =>
    state.UserStore.UsersResponse
);

export const createUserResponse = createSelector(
  selectUserStoreState,
  (state: fromUserStore.UserStoreState) =>
    state.UserStore.createUserResponse
);

export const selectUser = createSelector(
  selectUserStoreState,
  (state: fromUserStore.UserStoreState) =>
    state.UserStore.User
);

