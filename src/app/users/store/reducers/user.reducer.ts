import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { UserModel } from '../../models/user.model';

export const UserFetureKey = 'User';

export interface UserState {
    UsersResponse: Array<UserModel> | undefined;
    User: UserModel | undefined;
    createUserResponse: UserModel | undefined;
}

export const initialUserState: UserState = {
    UsersResponse: undefined,
    User: undefined,
    createUserResponse: undefined,
};

export const UserReducer = createReducer(
  initialUserState,
    on(UserActions.clearUserFlags, (state: UserState) => ({
        ...state,
        UsersResponse: undefined,
        createUserResponse: undefined,
    })),
    on(UserActions.loadUsersSuccess, (state: UserState, { response }) => ({
        ...state,
        UsersResponse: response,
    })),
    on(UserActions.loadUsersFail, (state: UserState) => ({
        ...state,
        UsersResponse: undefined,
    })),
    // Get User
    on(UserActions.loadUser, (state: UserState) => ({
        ...state,
        User: undefined
    })),
    on(UserActions.loadUserSuccess, (state: UserState, { response }) => ({
        ...state,
        User: response
    })),
    on(UserActions.loadUserFail, (state: UserState) => ({
        ...state,
        User: undefined
    })),

    // Create User
    on(UserActions.createUser, (state: UserState) => ({
        ...state,
        createUserResponse: undefined
    })),
    on(UserActions.createUserSuccess, (state: UserState, { response }) => ({
        ...state,
        createUserResponse: response
    })),
    on(UserActions.createUserFail, (state: UserState) => ({
        ...state,
        createUserResponse: undefined
    })),

);

export function userReducerFunc(
    state: UserState | undefined,
    action: Action
): any {
    return userReducerFunc(state, action);
}

