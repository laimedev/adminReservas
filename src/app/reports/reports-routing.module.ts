import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReservasListComponent } from './reservas/reservas-list/reservas-list.component';
import { PagosListComponent } from './pagos/pagos-list/pagos-list.component';

const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'reservas', component: ReservasListComponent },
      { path: 'pagos', component: PagosListComponent },
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
export class ReportsRoutingModule { }