import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsPageComponent } from './components/sensors-page/sensors-page.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorPopupComponent } from './components/sensor-popup/sensor-popup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SensorsPageComponent,
    SensorComponent,
    SensorPopupComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    FormsModule
  ]
})
export class SensorsModule { }
