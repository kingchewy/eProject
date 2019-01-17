import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { Floor } from '../_models/floor';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  projectId: number;

  private floorSource = new BehaviorSubject<Floor>(new Floor);
  currentFloor = this.floorSource.asObservable();

  private url: string = 'http://lumen.test/projects/';
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  changeFloor(floor: Floor){
    this.floorSource.next(floor);
  }

  getAllFloors(projectId): Observable<Floor[]>{
    return this.http.get<Floor[]>(this.baseUrl + 'projects/' + projectId + '/floors');
  }

  getFloor(id: number): Observable<Floor>{
    return this.http.get<Floor>(this.baseUrl + 'floors/' +id);
  }

  createFloor(floor: Floor, projectId): Observable<Floor>{
    return this.http.post<Floor>(this.baseUrl + 'projects/' + projectId + '/floors', floor);
  }

  updateFloor(floor: Floor, floorId): Observable<any>{
    return this.http.put<Floor>(this.baseUrl + 'floors/' + floorId, floor);
  }

  deleteFloor(floorId): Observable<any>{
    return this.http.delete<Floor>(this.baseUrl + 'floors/' + floorId);
  }
}
