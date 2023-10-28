import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from 'src/app/auth/models/jwt-response';
import { LoginRequest } from 'src/app/auth/models/login-request';
import { RoleResponse } from 'src/app/auth/models/role-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendAuthRequest(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>('user/auth', request);
  }

  loadRole(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>('user/role');
  }

}
