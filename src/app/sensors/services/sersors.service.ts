import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SensorsResponse } from '../models/sensors-response';
import { PopupData } from '../models/popup-data';
import { SensorUpdateRequest } from '../models/sensor-update-request';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private apiService: ApiService) { }

  loadSensors(page: number, searchString: string): Observable<SensorsResponse> {
    return this.apiService.loadSensors(page, searchString);
  }

  deleteSensor(id: number): Observable<any> {
    return this.apiService.deleteSensor(id);
  }

  loadPopupData(): Observable<PopupData> {
    return this.apiService.loadPopupData();
  }

  saveSensor(id: number, body: SensorUpdateRequest): Observable<any> {
    if(id === -1) {
      return this.apiService.createSensor(body);
    } else {
      return this.apiService.updateSensor(id, body);
    }
  }

}
