import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HeaderComponent } from './modules/header/header.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './modules/products/products.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import {InterceptorProvider} from "./commons/interceptors/http-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent,
    ProductsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
