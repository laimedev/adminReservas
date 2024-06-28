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


import { SucursalesListComponent } from './sucursales-list/sucursales-list.component';
import { SucursalesFormComponent } from './sucursales-form/sucursales-form.component';
import { ChangeStatusComponent } from './modal/change-status/change-status.component';
import { CreateSucursalComponent } from './modal/create-sucursal/create-sucursal.component';
import { DeleteSucursalComponent } from './modal/delete-sucursal/delete-sucursal.component';
import { EditSucursalComponent } from './modal/edit-sucursal/edit-sucursal.component';
import { SucursalesRoutingModule } from './sucursales-routing.module';



@NgModule({
  declarations: [
    SucursalesListComponent,
    SucursalesFormComponent,
    ChangeStatusComponent,
    CreateSucursalComponent,
    DeleteSucursalComponent,
    EditSucursalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SucursalesRoutingModule,
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
export class SucursalesModule { }
