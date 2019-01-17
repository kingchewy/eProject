import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from '../_models/room';
import { Subscription } from '../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { RoomService } from '../_services/room.service';
import { Location } from '../../../node_modules/@angular/common';
import { Floor } from '../_models/floor';
import { FloorService } from '../_services/floor.service';

@Component({
  selector: 'app-roomdetails',
  templateUrl: './roomdetails.component.html',
  styleUrls: ['./roomdetails.component.css']
})
export class RoomdetailsComponent implements OnInit, OnDestroy {
  room: Room = new Room;
  roomId: number;

  floorId: number;
  floor: Floor;

  loading: boolean = true;
  newRoom: boolean = true;

  //SUBSCRIPTIONS
  createRoomSub: Subscription;
  getRoomSub: Subscription;
  updateRoomSub: Subscription;
  getFloorSub: Subscription;
  getRouteParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private roomservice: RoomService,
    private floorservice: FloorService,
    private location: Location
  ) {
    this.getRouteParamsSub = this.route.params.subscribe(params => {
      console.log("constructor roomdetails params: ",params);
      if(params.floor){
        this.floorId = params.floor;
      } else{
        this.floorId = params.floorid;
      }

      this.getFloorOfRoom(this.floorId);
      console.log("Floor Object from route initiated: ", this.floorId);
    })
   }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('roomid')){
      this.newRoom = false;
      this.roomId = +this.route.snapshot.paramMap.get('roomid');
      this.getRoomToEdit();
    }
  }
  
  getFloorOfRoom(floorId){
    this.getFloorSub = this.floorservice.getFloor(floorId).subscribe(floor =>{
      this.floor = floor;
      this.loading = false;
    })
  }

  getRoomToEdit(){
    this.getRoomSub = this.roomservice.getRoom(this.roomId)
      .subscribe(room =>{
        this.room = room;
        this.loading = false;
      })
  }

  createRoom(){
    const floorId = this.route.snapshot.paramMap.get('floorid');
    console.log(this.room);
    this.createRoomSub = this.roomservice.createRoom(this.room, floorId)
      .subscribe(room =>{
        console.log('room succesful created: ', room);
        this.location.back();
      },
      error =>{
        console.log('roomdetails-component, error creating room: ', error);
      });
  }

  updateRoom(){
    this.updateRoomSub = this.roomservice.updateRoom(this.room, this.roomId)
      .subscribe(room =>{
        console.log('room successful updated: ', room);
        this.location.back();
      },
      error =>{
        console.log('roomdetails-component, error updating room: ', error)
      })
  }

  goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    if(this.createRoomSub){
      this.createRoomSub.unsubscribe();
    }

    if(this.getFloorSub){
      this.getFloorSub.unsubscribe();
    }

    if(this.getRoomSub){
      this.getRoomSub.unsubscribe();
    }

    if(this.updateRoomSub){
      this.updateRoomSub.unsubscribe();
    }
    if(this.getRouteParamsSub){
      this.getRouteParamsSub.unsubscribe();
    }
  }

}
