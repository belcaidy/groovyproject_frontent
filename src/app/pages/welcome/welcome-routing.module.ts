import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { CreateAddsComponent } from './create-adds/create-adds.component';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { EditAddsComponent } from './edit-adds/edit-adds.component';
import { AdminGuard } from '../../auth-gurd/admin.guard';
import {CreateUserComponent} from './create-user/create-user.component';
import {UserListComponent} from './user-list/user-list.component';
import {UpdateUserComponent} from './update-user/update-user.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'create', component: CreateAddsComponent, pathMatch: 'full', canActivate: [AdminGuard]},
  {path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [AdminGuard]},
  {path: 'update/:id', component: EditAddsComponent, pathMatch: 'full', canActivate: [AdminGuard]},

  {path: 'user-create', component: CreateUserComponent, pathMatch: 'full', canActivate: [AdminGuard]},
  {path: 'user-list', pathMatch: 'full', component: UserListComponent, canActivate: [AdminGuard]},
  {path: 'user-update/:id', component: UpdateUserComponent, pathMatch: 'full', canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
