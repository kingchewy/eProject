import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurgeProtector } from '../_models/surgeprotectors';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SurgeprotectorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSurgeProtectors(projectId): Observable<SurgeProtector[]>{
    return this.http.get<SurgeProtector[]>(this.baseUrl + 'projects/' + projectId + '/surgeprotectors')
  }

  getSurgeProtector(id): Observable<SurgeProtector>{
    return this.http.get<SurgeProtector>(this.baseUrl + 'surgeprotectors/' + id);
  }

  createSurgeProtector(surgeprotector: SurgeProtector, projectId): Observable<SurgeProtector>{
    return this.http.post<SurgeProtector>(this.baseUrl + 'projects/' + projectId + '/surgeprotectors', surgeprotector);
  }

  updateSurgeProtector(surgeprotector: SurgeProtector): Observable<SurgeProtector>{
    return this.http.put<SurgeProtector>(this.baseUrl + 'surgeprotectors/' + surgeprotector.id, surgeprotector);
  }

  deleteSurgeProtector(id): Observable<SurgeProtector>{
    return this.http.delete<SurgeProtector>(this.baseUrl + 'surgeprotectors/' + id);
  }
}
