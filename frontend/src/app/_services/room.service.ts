import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { Room } from '../_models/room';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  floorId: number;

  private roomSource = new BehaviorSubject<Room>(new Room);
  currentRoom = this.roomSource.asObservable();

  private baseUrl: string = environment.baseUrl;
  private url: string = 'http://lumen.test/floors/'

  constructor(private http: HttpClient) { }
  
  changeRoom(room: Room){
    this.roomSource.next(room);
  }

  getAllRooms(floorId): Observable<Room[]>{
    return this.http.get<Room[]>(this.baseUrl + 'floors/' + floorId + '/rooms');
  }

  getRoom(id: number): Observable<Room>{
    return this.http.get<Room>(this.baseUrl + 'rooms/'+id);
  }

  createRoom(room, floorId): Observable<Room>{
    return this.http.post<Room>(this.baseUrl + 'floors/' + floorId + '/rooms', room);
  }

  updateRoom(room, roomId): Observable<Room>{
    return this.http.put<Room>(this.baseUrl + 'rooms/'+ roomId, room);
  }

  deleteRoom(roomId): Observable<Room>{
    return this.http.delete<Room>(this.baseUrl + 'rooms/' + roomId);
  }

}
