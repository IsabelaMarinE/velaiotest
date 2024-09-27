import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() =>
                from(this._userService.getAllUsers()).pipe(
                    map((response) => {
                        return UserActions.loadUsersSuccess({ response });
                    }),
                    catchError(() => {
                        return of(UserActions.loadUsersFail());
                    })
                )
            )
        )
    );

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap((action) =>
                from(this._userService.getUser(action.request)).pipe(
                    map((response) => {
                        return UserActions.loadUserSuccess({ response });
                    }),
                    catchError(() => {
                        return of(UserActions.loadUserFail());
                    })
                )
            )
        )
    )

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            switchMap((action) =>
                from(this._userService.createNewUser(action.request)).pipe(
                    map((response) => {
                        return UserActions.createUserSuccess({ response })
                    }),
                    catchError(() => {
                        return of(UserActions.createUserFail());
                    })
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private _userService: UsersService
    ) {

    }
}

