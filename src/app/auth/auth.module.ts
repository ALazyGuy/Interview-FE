import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AnonymouseGuard } from './guards/anonymouse.guard';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticatedGuard,
    AnonymouseGuard
  ]
})
export class AuthModule { }
