import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { LoginRequest } from '../models/login-request';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  constructor(private apiService: ApiService, private store: Store) { }

  authenticate(request: LoginRequest) {
    return this.apiService.sendAuthRequest(request).pipe(
      tap(value => localStorage.setItem('token', value.token)),
      mergeMap(() => of(this.store.dispatch(loadUser()))));
  }

  loadRole() {
    return this.apiService.loadRole();
  }

}
