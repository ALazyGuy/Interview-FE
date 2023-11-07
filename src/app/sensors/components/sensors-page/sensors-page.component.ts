import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSensors } from 'src/app/store/sensor/sensor.actions';
import { Sensor } from 'src/app/store/sensor/sensor.model';
import { selectAllSensors, selectTotalSensors } from 'src/app/store/sensor/sensor.selectors';
import { removeUser } from 'src/app/store/user/user.actions';
import { roleSelector } from 'src/app/store/user/user.selectors';

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
  selectedSensor: Sensor | null = null;
  page: number = 0;

  searchString: string = '';

  /*
    This variable was added for bug fix.
    In case user searched for sensors and got more than one page,
    then changes value of searchString in search input and select page 2,
    but new searchString has less than 2 pages he will get empty result
  */
  lastSearchedValue: string = '';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.loadSensorsByPage();
  }

  openDialog(sensor: Sensor) {
    this.isDialogOpen = true;
    this.selectedSensor = sensor;
  }

  openCreationDialog() {
    this.isDialogOpen = true;
  }

  cancelDialog() {
    this.isDialogOpen = false;
    this.selectedSensor = null;
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
