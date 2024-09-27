import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/effects/task.effects';
import { taskStoreReducer, taskStoreFeatureKey } from './store/reducers/store.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './componets/task.component';
import { TasksRoutingModule } from './tasks-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    StoreModule.forFeature(taskStoreFeatureKey, taskStoreReducer),
    EffectsModule.forFeature(TasksEffects)
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TaskModule { }
