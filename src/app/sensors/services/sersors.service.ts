import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SensorsResponse } from '../models/sensors-response';

@Injectable({
  providedIn: 'root'
})
export class SersorsService {

  constructor(private apiService: ApiService) { }

  loadSensors(page: number): Observable<SensorsResponse> {
    return this.apiService.loadSensors(page);
  }

  
}
