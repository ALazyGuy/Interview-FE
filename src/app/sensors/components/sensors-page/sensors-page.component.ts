import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSensors } from 'src/app/store/sensor/sensor.actions';
import { selectAllSensors } from 'src/app/store/sensor/sensor.selectors';

@Component({
  selector: 'app-sensors-page',
  templateUrl: './sensors-page.component.html',
  styleUrls: ['./sensors-page.component.scss']
})
export class SensorsPageComponent implements OnInit {

  public sensors$ = this.store.select(selectAllSensors);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadSensors());
  }

}
