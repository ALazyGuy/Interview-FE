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
  @Input()
  role!: string;
  @Output()
  onEdit = new EventEmitter<Sensor>();
  @Output()
  onRemove = new EventEmitter<Sensor>();

  edit() {
    this.onEdit.emit(this.sensor);
  }

  remove() {
    this.onRemove.emit(this.sensor);
  }

}
