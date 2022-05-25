import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdminGuard} from './auth-gurd/admin.guard';
import {RegistrationComponent} from './registration/registration.component';
import {PublicGuard} from './auth-gurd/public.guard';
import {CustomerCreateAddComponent} from './customer/customer-create-add/customer-create-add.component';
import {CustomerAnnouncementComponent} from './customer-announcement/customer-announcement.component';

const routes: Routes = [
  {path: 'dashboard', pathMatch: 'full', component: DashboardComponent},
  {path: 'my-announcement', pathMatch: 'full', component: CustomerAnnouncementComponent},
  {path: 'create-adds', pathMatch: 'full', component: CustomerCreateAddComponent},
  {path: '', pathMatch: 'full', component: DashboardComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [PublicGuard]},
  {path: 'registration', pathMatch: 'full', component: RegistrationComponent, canActivate: [PublicGuard]},
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
