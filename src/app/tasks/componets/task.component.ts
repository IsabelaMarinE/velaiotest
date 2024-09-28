import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as TasksActions from '../store/actions/task.action';
import * as TaskSelectors from '../store/selectors/task.selectors';
import * as UserSelectors from '../../users/store/selectors/user.selector';
import * as UserActions from '../../users/store/actions/user.actions';
import { TaskStoreState } from '../store/reducers/store.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { NewTaskComponent } from './new-task/new-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateStatusTaskRequest } from '../models/update-status-task.request';
import { UserStoreState } from 'src/app/users/store/reducers/store.reducer';
import { UserModel } from 'src/app/users/models/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'usuario', 'estado', 'acciones'];
  public taskData = new BehaviorSubject<TaskModel[]>([]);
  public dataSource = new MatTableDataSource<TaskModel>();
  public ngDestroyed$ = new Subject();
  public listUsers: UserModel[] = [];
  public isLoading: boolean = true;

  private subscriptions = new Subscription()

  constructor(
    private taskStore: Store<TaskStoreState>,
    private userStore: Store<UserStoreState>,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskStore.dispatch(TasksActions.loadTasks())
    );
    this.subscriptions.add(
      this.taskData.subscribe(data => {
        this.dataSource.data = data;
      })
    );
    this.subscriptions.add(
      this.userStore.dispatch(UserActions.loadUsers())
    )
    this.taskSubscriptions();
  }

  ngOnDestroy() {
    this.taskStore.dispatch(TasksActions.clearTaskFlags());
    this.subscriptions.unsubscribe();
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  public editarTarea(tarea: TaskModel){
    this.dialog.open(NewTaskComponent, {
      height: '400px',
      width: '400px',
      data: {
        id: tarea.id
      },
    });
  }

  public detallesTarea(tarea: TaskModel) {
    this.dialog.open(ViewTaskComponent, {
      height: '500px',
      width: '400px',
      data: {
        id: tarea.id
      },
    });
  }

  public filterTable(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterEstado(event: any) {
    this.dataSource.filter = event;
  }

  public agregarNuevaTarea(){
    this.dialog.open(NewTaskComponent, {
      height: '400px',
      width: '400px',
    });
  }

  public cambiarEstado(element: TaskModel){
    let request = new UpdateStatusTaskRequest();
    request = _.merge(request, { completed: !element.completed });
    this.taskStore.dispatch(TasksActions.updateStatusTask({request, id: element.id}));
  }

  public getUserName(userId: number): string {
    if(this.listUsers){
      const user = this.listUsers.find(user => user.id === userId);
      return user ? user.username : 'Desconocido';
    } else{
      return 'Desconocido';
    }
  }

  private taskSubscriptions() {
    this.subscriptions.add(
      this.taskStore
      .select(TaskSelectors.selectTasks)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.taskData.next(response!);
        }
      })
    )

    this.subscriptions.add(
      this.taskStore
      .select(TaskSelectors.createTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.isLoading = false;
          this.taskStore.dispatch(TasksActions.loadTasks())
          Swal.fire({
            icon: 'success',
            title: 'Tarea Creada',
            text: 'Agregada Exitosamente'
          });
        }
      })
    )

    this.subscriptions.add(
      this.taskStore
      .select(TaskSelectors.selectUpdateTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.isLoading = false;
          this.taskStore.dispatch(TasksActions.loadTasks())
        }
      })
    )

    this.subscriptions.add(
      this.taskStore
      .select(TaskSelectors.selectUpdateStatusTaskResponse)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        if(response){
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Tarea Actualizada',
            text: 'Estado Actualizado Exitosamente'
          });
          this.taskStore.dispatch(TasksActions.loadTasks())
        }
      })
    )

    this.subscriptions.add(
      this.userStore
        .select(UserSelectors.selectUsers)
        .pipe(takeUntil(this.ngDestroyed$))
        .subscribe((response) => {
          this.isLoading = false;
          this.listUsers = response!;
        })
    )
  }
}
