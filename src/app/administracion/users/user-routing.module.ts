import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/guard/auth.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/header/header.component';

const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'users', component: UserListComponent },
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
  ],
  exports: [RouterModule]
})

export class UserRoutingModule { }

