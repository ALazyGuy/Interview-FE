import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsPageComponent } from './components/sensors-page/sensors-page.component';


@NgModule({
  declarations: [
    SensorsPageComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule
  ]
})
export class SensorsModule { }
