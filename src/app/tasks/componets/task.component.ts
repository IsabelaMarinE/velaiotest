import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { BehaviorSubject, Subject, Subscription, takeUntil, map } from 'rxjs';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import * as TasksActions from '../store/actions/task.action';
import * as TaskSelectors from '../store/selectors/task.selectors';
import { TaskStoreState } from '../store/reducers/store.reducer';
import { MatTableDataSource } from '@angular/material/table';

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

  private subscriptions = new Subscription()

  constructor(
    private taskStore: Store<TaskStoreState>,
  ){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskStore.dispatch(TasksActions.loadTasks())
    );
    this.subscriptions.add(
      this.taskData.subscribe(data => {
        this.dataSource.data = data;
      })
    )
    this.taskSubscriptions();
  }

  ngOnDestroy() {
    this.taskStore.dispatch(TasksActions.clearTaskFlags());
    this.subscriptions.unsubscribe();
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  public filterTable(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public filterEstado(event: any) {
    this.dataSource.filter = event;
  }

  private taskSubscriptions() {
    this.subscriptions.add(
      this.taskStore
      .select(TaskSelectors.selectTasks)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        this.taskData.next(response!);
      })
    )
  }
}
