import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorType } from '../_models/sensortype';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SensortypeService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSensorTypes(): Observable<SensorType[]>{
    return this.http.get<SensorType[]>(this.baseUrl + 'sensortypes');
  }

  getSensorType(sensorTypeId): Observable<SensorType>{
    return this.http.get<SensorType>(this.baseUrl + 'sensortypes/' + sensorTypeId);
  }

  createSensorType(sensorType): Observable<SensorType>{
    return this.http.post<SensorType>(this.baseUrl + 'sensortypes', sensorType);
  }

  updateSensorType(sensorType): Observable<SensorType>{
    return this.http.put<SensorType>(this.baseUrl + 'sensortypes/' + sensorType.id, sensorType);
  }

  deleteSensorType(sensorTypeId): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'sensortypes/' + sensorTypeId);
  }
}
