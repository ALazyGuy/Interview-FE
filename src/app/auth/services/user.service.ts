import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, mergeMap, take, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  role: string | null = null;

  constructor(private apiService: ApiService) { }

  authenticate(request: LoginRequest) {
    return this.apiService.sendAuthRequest(request).pipe(
      take(1), 
      tap(value => localStorage.setItem('token', value.token)),
      mergeMap(value => this.loadRole()));
  }

  loadRole() {
    return this.apiService.loadRole().pipe(
      take(1),
      tap(value => this.role = value.role),
    );
  }

}
