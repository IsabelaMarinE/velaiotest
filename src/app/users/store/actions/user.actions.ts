import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { GetUserRequest } from '../../models/get-user.request';
import { CreateUserModel } from '../../models/create-user.request';

export const clearUserFlags = createAction('[Users] Clear User Flags');

export const clearUsers = createAction('[Users] Clear Users');

export const loadUsers= createAction(
  '[Users] Load Users'
);
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ response: Array<UserModel> }>()
);
export const loadUsersFail = createAction('[Users] Load Users Fail');

// --------------Get User
export const loadUser = createAction(
  '[User] Load User',
  props<{ request: GetUserRequest }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ response: UserModel }>()
)

export const loadUserFail = createAction(
  '[User] Load User Fail'
)

// --------------Create User
export const createUser = createAction(
  '[Users] Create User',
  props<{ request: CreateUserModel}>()
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ response: UserModel}>()
);
export const createUserFail = createAction(
  '[Users] Create User Fail'
);
