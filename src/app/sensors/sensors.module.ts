import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorsRoutingModule } from './sensors-routing.module';
import { SensorsPageComponent } from './components/sensors-page/sensors-page.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { SensorPopupComponent } from './components/sensor-popup/sensor-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SensorsService } from './services/sersors.service'


@NgModule({
  declarations: [
    SensorsPageComponent,
    SensorComponent,
    SensorPopupComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SensorsService
  ]
})
export class SensorsModule { }
