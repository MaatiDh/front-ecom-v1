import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './modules/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from './modules/registration/registration.component';
import { ProductsComponent } from './modules/products/products.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
