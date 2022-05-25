import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CreateAddsComponent} from './create-adds/create-adds.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {AddsListComponent} from './adds-list/adds-list.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonSharedModule} from '../../common.module';
import {ShowAddsDetailsComponent} from './show-adds-details/show-adds-details.component';
import {EditAddsComponent} from './edit-adds/edit-adds.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UserListComponent} from './user-list/user-list.component';


@NgModule({
  imports: [WelcomeRoutingModule, NzTableModule,
    CommonModule, NzButtonModule, NzFormModule, ReactiveFormsModule,
    NzSelectModule, NzLayoutModule, NzMenuModule, NzIconModule, CommonSharedModule, FormsModule],
  declarations: [
    WelcomeComponent,
    CreateAddsComponent,
    AddsListComponent,
    ShowAddsDetailsComponent,
    EditAddsComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserListComponent
  ],

  exports: [WelcomeComponent, ShowAddsDetailsComponent]
})
export class WelcomeModule {
}
