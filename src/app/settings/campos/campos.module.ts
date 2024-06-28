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


import { EditCamposComponent } from './modal/edit-campos/edit-campos.component';
import { CreateCamposComponent } from './modal/create-campos/create-campos.component';
import { DeleteCamposComponent } from './modal/delete-campos/delete-campos.component';
import { ChangeStatusComponent } from './modal/change-status/change-status.component';
import { CamposListComponent } from './campos-list/campos-list.component';
import { CamposFormComponent } from './campos-form/campos-form.component';
import { CamposRoutingModule } from './campos-routing.module';



@NgModule({
  declarations: [
    EditCamposComponent,
    CreateCamposComponent,
    DeleteCamposComponent,
    ChangeStatusComponent,
    CamposListComponent,
    CamposFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CamposRoutingModule,
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
export class CamposModule { }
