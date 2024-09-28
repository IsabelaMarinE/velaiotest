import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import * as UserActions from '../../../users/store/actions/user.actions';
import * as UserSelectors from '../../../users/store/selectors/user.selector';
import * as TaskActions from '../../store/actions/task.action';
import * as TaskSelectors from '../../store/selectors/task.selectors';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { UserStoreState } from 'src/app/users/store/reducers/store.reducer';
import { UserModel } from 'src/app/users/models/user.model';
import { CommonModule } from '@angular/common';
import { TaskStoreState } from '../../store/reducers/store.reducer';
import { UpdateTaskRequest } from '../../models/update-task.request';
import { GetTaskRequest } from '../../models/get-task.request';
import { CreateTaskRequest } from '../../models/create-task.request';


@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public listUsers: UserModel[] = [];
  public ngDestroyed$ = new Subject();
  public id: number = 0;
  public isUpdated: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewTaskComponent>,
    private fb: FormBuilder,
    private userStore: Store<UserStoreState>,
    private taskStore: Store<TaskStoreState>,
  ) {
    if (data){
      this.id = data.id;
      this.isUpdated = true;
    }

    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      userId: ['', Validators.required],
      completed: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.isUpdated){
      let request = new GetTaskRequest();
      request = _.merge(request, { id: this.id });
      this.taskStore.dispatch(TaskActions.loadTask({request}));
    }

    this.userStore.dispatch(UserActions.loadUsers());
    this.userSubscriptions();
  }

  ngOnDestroy() {
    this.userStore.dispatch(UserActions.clearUserFlags());
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  userSubscriptions() {
    this.userStore
      .select(UserSelectors.selectUsers)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        this.listUsers = response!;
      });

    this.taskStore
      .select(TaskSelectors.selectUpdateTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.dialogRef.close();
        }
      });

    this.taskStore
      .select(TaskSelectors.createTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.dialogRef.close();
        }
      });

    this.taskStore
      .select(TaskSelectors.selectTask)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.form.patchValue({
            id: response.id,
            title: response.title,
            userId: response.userId,
            completed: response.completed
          });
        }
      })
  }

  onSubmit(): void {
    if (this.form.valid) {
      if(this.isUpdated){
        let request = new UpdateTaskRequest();
        request = _.merge(request, this.form.value);
        this.taskStore.dispatch(TaskActions.updateTask({request}));
      }else {
        let request = new CreateTaskRequest();
        request = _.merge(request, this.form.value);
        this.taskStore.dispatch(TaskActions.createTask({request}));
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Llene por favor todos los campos',
        text: 'Para poder continuar'
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
