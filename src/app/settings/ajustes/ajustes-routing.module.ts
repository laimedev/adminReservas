import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/guard/auth.guard';
import { HeaderComponent } from 'src/app/header/header.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { AjustesListComponent } from './ajustes-list/ajustes-list.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'ajustes', component: AjustesListComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AjustesRoutingModule { }
