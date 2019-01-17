import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../_models/sensor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSensor(sensorId): Observable<Sensor>{
    return this.http.get<Sensor>(this.baseUrl + 'sensors/' + sensorId);
  }

  getSensorsByRoom(roomId): Observable<Sensor[]>{
    return this.http.get<Sensor[]>(this.baseUrl + 'rooms/' + roomId + '/sensors');
  }

  getSensorsByAppliance(applianceId): Observable<Sensor[]>{
    return this.http.get<Sensor[]>(this.baseUrl + 'appliances/' + applianceId + '/sensors');
  }

  createSensorByRoom(sensor, roomId): Observable<Sensor>{
    return this.http.post<Sensor>(this.baseUrl + 'rooms/' + roomId + '/sensors', sensor);
  }

  createSensorByAppliance(sensor, applianceId): Observable<Sensor>{
    return this.http.post<Sensor>(this.baseUrl + 'appliances/' + applianceId + '/sensors', sensor);
  }

  updateSensor(sensor): Observable<Sensor>{
    return this.http.put<Sensor>(this.baseUrl + 'sensors/' + sensor.id, sensor);
  }

  deleteSensor(sensorId): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'sensors/' + sensorId);
  }

}
