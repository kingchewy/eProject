import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CircuitbreakerService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCircuitBreaker(id): Observable<CircuitBreaker>{
    return this.http.get<CircuitBreaker>(this.baseUrl + 'circuitbreakers/' + id);
  }

  getCircuitBreakers(surgeProtectorId): Observable<CircuitBreaker[]>{
    return this.http.get<CircuitBreaker[]>(this.baseUrl + 'surgeprotectors/' + surgeProtectorId + '/circuitbreakers');
  }

  createCircuitBreaker(circuitBreaker, surgeProtectorId): Observable<CircuitBreaker>{
    return this.http.post<CircuitBreaker>(this.baseUrl + 'surgeprotectors/' + surgeProtectorId + '/circuitbreakers', circuitBreaker);
  }

  udpateCircuitBreaker(circuitBreaker): Observable<CircuitBreaker>{
    return this.http.put<CircuitBreaker>(this.baseUrl + 'circuitbreakers/' + circuitBreaker.id, circuitBreaker);
  }

  deleteCircuitBreaker(circuitBreakerId): Observable<CircuitBreaker>{
    return this.http.delete<CircuitBreaker>(this.baseUrl + 'circuitbreakers/' + circuitBreakerId);
  }
}
