import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'sensors', loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'sensors'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
