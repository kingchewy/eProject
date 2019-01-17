import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplianceType } from '../_models/appliancetype';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppliancetypeService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getApplianceTypes(): Observable<ApplianceType[]>{
    return this.http.get<ApplianceType[]>(this.baseUrl + 'appliancetypes');
  }

  getApplianceType(applianceTypeId): Observable<ApplianceType>{
    return this.http.get<ApplianceType>(this.baseUrl + 'appliancetypes/' + applianceTypeId);
  }

  createApplianceType(applianceType): Observable<ApplianceType>{
    return this.http.post<ApplianceType>(this.baseUrl + 'appliancetypes', applianceType);
  }

  updateApplianceType(applianceType): Observable<ApplianceType>{
    return this.http.put<ApplianceType>(this.baseUrl + 'appliancetypes/' + applianceType.id, applianceType);
  }

  deleteApplianceType(applianceTypeId): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'appliancetypes/' + applianceTypeId);
  }
}
