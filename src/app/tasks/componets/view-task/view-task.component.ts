import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject  } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as UserActions from '../../../users/store/actions/user.actions';
import * as UserSelectors from '../../../users/store/selectors/user.selector';
import * as TaskSelectors from '../../store/selectors/task.selectors';
import * as TaskActions from '../../store/actions/task.action';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserStoreState } from 'src/app/users/store/reducers/store.reducer';
import { UserModel } from 'src/app/users/models/user.model';
import { CommonModule } from '@angular/common';
import { TaskStoreState } from '../../store/reducers/store.reducer';
import { TaskModel } from '../../models/task.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { GetTaskRequest } from '../../models/get-task.request';
import { GetUserRequest } from 'src/app/users/models/get-user.request';


@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskComponent implements OnInit, OnDestroy {
  public user?: UserModel;
  public task?: TaskModel;
  public id: number = 0;
  public ngDestroyed$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewTaskComponent>,
    private userStore: Store<UserStoreState>,
    private taskStore: Store<TaskStoreState>,
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    let request = new GetTaskRequest();
    request = _.merge(request, { id: this.id });
    this.taskStore.dispatch(TaskActions.loadTask({request}));
    this.userSubscriptions();
  }

  ngOnDestroy() {
    this.userStore.dispatch(UserActions.clearUserFlags());
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  userSubscriptions() {
    this.userStore
      .select(UserSelectors.selectUser)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.user = response!;
        }
      })

    this.taskStore
    .select(TaskSelectors.selectTask)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.task = response!;
          let request = new GetUserRequest();
          request = _.merge(request, { id: response.userId });
          this.userStore.dispatch(UserActions.loadUser({request}));
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
