import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStoreReducer, UserStoreFeatureKey } from './store/reducers/store.reducer';
import { UsersEffects } from './store/effects/user.effects';
import {MatTableModule} from '@angular/material/table';
import { UserComponent } from './componets/user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    UsersRoutingModule,
    StoreModule.forFeature(UserStoreFeatureKey, UserStoreReducer),
    EffectsModule.forFeature(UsersEffects)
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UsersModule { }
