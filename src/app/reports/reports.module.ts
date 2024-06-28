import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasListComponent } from './reservas/reservas-list/reservas-list.component';
import { PagosListComponent } from './pagos/pagos-list/pagos-list.component';

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
import { ReportsRoutingModule } from './reports-routing.module';
import { MatSelectFilterModule } from 'mat-select-filter';
import { DeleteReservaComponent } from './reservas/modal/delete-reserva/delete-reserva.component';
import { PayRservaComponent } from './reservas/modal/pay-rserva/pay-rserva.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  declarations: [
    ReservasListComponent,
    PagosListComponent,
    DeleteReservaComponent,
    PayRservaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReportsRoutingModule,
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
    MatIconModule,
    MatSelectFilterModule,
  ]
})
export class ReportsModule { }
