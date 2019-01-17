import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { Appliance } from '../_models/appliance';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAppliance(applianceId): Observable<Appliance>{
    return this.http.get<Appliance>(this.baseUrl + 'appliances/' + applianceId);
  }

  getAppliancesByRoom(roomId): Observable<Appliance[]>{
    return this.http.get<Appliance[]>(this.baseUrl + 'rooms/' + roomId + '/appliances');
  }

  getAppliancesByCircuitBreaker(circuitBreakerId): Observable<Appliance[]>{
    return this.http.get<Appliance[]>(this.baseUrl + 'circuitbreakers/' + circuitBreakerId + '/appliances');
  }

  createApplianceByRoom(appliance, roomId): Observable<Appliance>{
    return this.http.post<Appliance>(this.baseUrl + 'rooms/' + roomId + '/appliances', appliance);
  }

  createApplianceByCircuitBreaker(appliance, circuitBreakerId): Observable<Appliance[]>{
    return this.http.post<Appliance[]>(this.baseUrl + 'circuitbreakers/' + circuitBreakerId + '/appliances', appliance);
  }

  updateAppliance(appliance: Appliance): Observable<any>{
    return this.http.put<Appliance>(this.baseUrl + 'appliances/' + appliance.id, appliance);
  }

  deleteAppliance(applianceId): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'appliances/' + applianceId);
  }

}

