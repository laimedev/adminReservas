import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UtilsModule } from 'src/app/utils/utils.module';
import { CRUDTableModule } from 'src/app/utils/crud-table';
import { CreateUserComponent } from './users/modal/create-user/create-user.component';
import { EditUserComponent } from './users/modal/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/modal/delete-user/delete-user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ChangeStatusComponent } from './users/modal/change-status/change-status.component';



@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    ChangeStatusComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    UtilsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatPaginatorModule,
    NgbModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CRUDTableModule,
    MatIconModule
  ]
})

export class UserModule { }
