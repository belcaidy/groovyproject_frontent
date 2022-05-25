import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {LoginComponent} from './login/login.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {CommonSharedModule} from './common.module';
import {AnnouncementInterceptor} from './service/announcement.interceptor';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotifyComponent} from './common/notify/notify.component';
import {WelcomeModule} from './pages/welcome/welcome.module';
import {AdminGuard} from './auth-gurd/admin.guard';
import {CustomerGuard} from './auth-gurd/customer.guard';
import {RegistrationComponent} from './registration/registration.component';
import {HeaderComponent} from './common/header/header.component';
import {CustomerCreateAddComponent} from './customer/customer-create-add/customer-create-add.component';
import {CustomerAnnouncementComponent} from './customer-announcement/customer-announcement.component';
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotifyComponent,
    RegistrationComponent,
    HeaderComponent,
    CustomerCreateAddComponent,
    CustomerAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    CommonSharedModule,
    WelcomeModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    AdminGuard,
    CustomerGuard,
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AnnouncementInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
