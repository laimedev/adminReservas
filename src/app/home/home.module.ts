import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { GreetingPipe } from './pipes/greeting.pipe';
import { TodayPipe } from './pipes/today.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormatdatePipe } from './pipes/formatdate.pipe';
import { ReservaEditComponent } from './modals/reserva-edit/reserva-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [HomeComponent, GreetingPipe, TodayPipe, FormatdatePipe, ReservaEditComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSelectFilterModule,
    MatInputModule,
    MatAutocompleteModule, 
    NgSelectModule,
    MatIconModule
  ]
})
export class HomeModule { }
