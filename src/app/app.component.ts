import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser, removeUser } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sensors-FE';

  constructor(private store: Store) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token) {
      this.store.dispatch(loadUser());
    } else {
      this.store.dispatch(removeUser());
    }
  }
}
