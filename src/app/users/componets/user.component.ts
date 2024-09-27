import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.actions';
import * as UserSelectors from '../store/selectors/user.selector';
import { UserStoreState } from '../store/reducers/store.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'usuario', 'correo', 'telefono' ,'website'];
  public userData = new BehaviorSubject<UserModel[]>([]);
  public dataSource = new MatTableDataSource<UserModel>();
  public ngDestroyed$ = new Subject();

  private subscriptions = new Subscription()

  constructor(
    private userStore: Store<UserStoreState>,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.userStore.dispatch(UserActions.loadUsers())
    );
    this.subscriptions.add(
      this.userData.subscribe(data => {
        this.dataSource.data = data;
      })
    )
    this.userSubscriptions();
  }

  ngOnDestroy() {
    this.userStore.dispatch(UserActions.clearUserFlags());
    this.subscriptions.unsubscribe();
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.unsubscribe();
  }

  private userSubscriptions() {
    this.subscriptions.add(
      this.userStore
      .select(UserSelectors.selectUsers)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((response) => {
        this.userData.next(response!);
      })
    )
  }
}
