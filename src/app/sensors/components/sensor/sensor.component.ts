import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sensor } from 'src/app/store/sensor/sensor.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent {

  @Input()
  sensor!: Sensor;
  @Output()
  onClick = new EventEmitter<Sensor>();

  open() {
    this.onClick.emit(this.sensor);
  }

}
