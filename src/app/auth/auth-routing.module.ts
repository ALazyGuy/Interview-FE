import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AnonymouseGuard } from './guards/anonymouse.guard';

const routes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [AnonymouseGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
