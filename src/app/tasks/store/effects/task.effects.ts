import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import * as TaskActions from '../actions/task.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';

@Injectable()
export class TasksEffects {
    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            switchMap(() =>
                from(this._taskService.getAllTasks()).pipe(
                    map((response) => {
                        return TaskActions.loadTasksSuccess({ response });
                    }),
                    catchError(() => {
                        return of(TaskActions.loadTasksFail());
                    })
                )
            )
        )
    );

    getTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTask),
            switchMap((action) =>
                from(this._taskService.getTask(action.request)).pipe(
                    map((response) => {
                        return TaskActions.loadTaskSuccess({ response });
                    }),
                    catchError(() => {
                        return of(TaskActions.loadTaskFail());
                    })
                )
            )
        )
    )

    createTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.createTask),
            switchMap((action) =>
                from(this._taskService.createNewTask(action.request)).pipe(
                    map((response) => {
                        return TaskActions.createTaskSuccess({ response })
                    }),
                    catchError(() => {
                        return of(TaskActions.createTaskFail());
                    })
                )
            )
        )
    )

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            switchMap((action) =>
                from(this._taskService.updateTask(action.request)).pipe(
                    map((response) => {
                        return TaskActions.updatedTaskSuccess({ response })
                    }),
                    catchError(() => {
                        return of(TaskActions.updatedTaskFail());
                    })
                )
            )
        )
    )

    updateStatusTask$ = createEffect(() =>
      this.actions$.pipe(
          ofType(TaskActions.updateStatusTask),
          switchMap((action) =>
              from(this._taskService.updateStatusTask(action.request, action.id)).pipe(
                  map((response) => {
                      return TaskActions.updatedStatusTaskSuccess({ response })
                  }),
                  catchError(() => {
                      return of(TaskActions.updatedStatusTaskFail());
                  })
              )
          )
      )
  )

    constructor(
        private actions$: Actions,
        private _taskService: TasksService
    ) {

    }
}

