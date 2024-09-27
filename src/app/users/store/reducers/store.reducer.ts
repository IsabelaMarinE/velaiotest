import { combineReducers } from '@ngrx/store';

//Reducers
import { UserReducer, UserState } from './user.reducer';

export const UserStoreFeatureKey = 'UserStore';

export type UserStoreState = {
  UserStore: UserState
};

export const UserStoreReducer = combineReducers<UserStoreState>({
  UserStore: UserReducer
});
