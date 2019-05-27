import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UniqueUserNameValidatorDirective, UniqueEmailValidatorDirective } from './auth.validations';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    UniqueUserNameValidatorDirective, 
    UniqueEmailValidatorDirective],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule { }
