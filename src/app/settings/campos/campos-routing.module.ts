import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { AuthGuard } from 'src/app/services/guard/auth.guard';
import { CamposListComponent } from './campos-list/campos-list.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'campos', component: CamposListComponent },
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
export class CamposRoutingModule { }

