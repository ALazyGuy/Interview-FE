import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSensors } from 'src/app/store/sensor/sensor.actions';
import { selectAllSensors } from 'src/app/store/sensor/sensor.selectors';
import { removeUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-sensors-page',
  templateUrl: './sensors-page.component.html',
  styleUrls: ['./sensors-page.component.scss']
})
export class SensorsPageComponent implements OnInit {

  public sensors$ = this.store.select(selectAllSensors);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadSensors());
  }

  logout() {
    this.store.dispatch(removeUser());
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth');
  }

}
