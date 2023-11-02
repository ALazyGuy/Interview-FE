import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorsPageComponent } from './components/sensors-page/sensors-page.component';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

const routes: Routes = [
  {path: '', component: SensorsPageComponent, canActivate: [AuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorsRoutingModule { }
