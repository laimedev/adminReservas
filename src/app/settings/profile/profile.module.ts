import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//IMPORTS
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
import { UtilsModule } from 'src/app/utils/utils.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { CRUDTableModule } from 'src/app/utils/crud-table';

import { ProfileListComponent } from './profile-list/profile-list.component';
import { EditProfileComponent } from './modal/edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    ProfileListComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ProfileRoutingModule,
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
export class ProfileModule { }
