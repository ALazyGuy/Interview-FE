import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { deleteSensor, loadSensors } from 'src/app/store/sensor/sensor.actions';
import { EMPTY_SENSOR, Sensor } from 'src/app/store/sensor/sensor.model';
import { selectAllSensors, selectTotalSensors } from 'src/app/store/sensor/sensor.selectors';
import { removeUser } from 'src/app/store/user/user.actions';
import { roleSelector } from 'src/app/store/user/user.selectors';
import { SensorUpdateRequest } from '../../models/sensor-update-request';
import { SensorsService } from '../../services/sersors.service';

@Component({
  selector: 'app-sensors-page',
  templateUrl: './sensors-page.component.html',
  styleUrls: ['./sensors-page.component.scss']
})
export class SensorsPageComponent implements OnInit {

  public sensors$ = this.store.select(selectAllSensors);
  public total$ = this.store.select(selectTotalSensors);
  public role$ = this.store.select(roleSelector);

  isDialogOpen: boolean = false;
  selectedSensor$: BehaviorSubject<Sensor> = new BehaviorSubject(EMPTY_SENSOR);
  error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  page: number = 0;

  searchString: string = '';

  /*
    This variable was added for bug fix.
    In case user searched for sensors and got more than one page,
    then changes value of searchString in search input and select page 2,
    but new searchString has less than 2 pages he will get empty result
  */
  lastSearchedValue: string = '';

  constructor(private store: Store, private router: Router, private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.loadSensorsByPage();
  }

  openDialog(sensor: Sensor) {
    this.isDialogOpen = true;
    this.selectedSensor$.next(sensor);
  }

  openCreationDialog() {
    this.isDialogOpen = true;
  }

  removeSensor(sensor: Sensor) {
    if(confirm(`Are you sure you want to remove sensor '${sensor.name}'?`)) {
      this.store.dispatch(deleteSensor({id: sensor.id, searchString: this.searchString}));
    }
  }

  saveSensor(data: {body: SensorUpdateRequest, id: number | null}) {
    if(data.id !== null) {
      this.sensorsService.updateSensor(data.id, data.body).subscribe({
        next: () => {
          this.selectPage(0);
          this.cancelDialog();
          this.error$.next(null);
        },
        error: response => this.error$.next(response.error.msg)
      });
    }
  }

  cancelDialog() {
    this.isDialogOpen = false;
    this.selectedSensor$.next(EMPTY_SENSOR);
  }

  logout() {
    this.store.dispatch(removeUser());
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth');
  }

  nextPage(total: number) {
    if(Math.ceil(total / 4) === this.page + 1) {
      return;
    }
    this.page++;
    this.loadSensorsByPage();
  }

  previousPage() {
    if(this.page === 0) {
      return;
    }
    this.page--;
    this.loadSensorsByPage();
  }

  countPages(total: number) {
    return new Array(Math.ceil(total / 4));
  }

  selectPage(page: number) {
    if(this.searchString === this.lastSearchedValue) {
      this.page = page;
    } else {
      this.page = 0;
    }
    this.loadSensorsByPage();
  }

  clearQuery() {
    this.searchString = '';
    this.lastSearchedValue = '';
    this.page = 0;
    this.loadSensorsByPage();
  }

  private loadSensorsByPage() {
    this.lastSearchedValue = this.searchString;
    this.store.dispatch(loadSensors({page: this.page, searchString: this.searchString}));
  }

}
