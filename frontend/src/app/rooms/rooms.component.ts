import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { RoomService } from '../_services/room.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { ViewSwitchService } from '../_services/view-switch.service';
import { Room } from '../_models/room';
import { Floor } from '../_models/floor';

declare var $ :any;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  @Input() floor: Floor;
  rooms: Room[];
  loading: boolean = true;
  dashboardView: boolean;

  selectedRoom: Room;

  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;
  getRoomsSub: Subscription;
  deleteRoomSub: Subscription;

  constructor(private roomservice: RoomService,
    private router: Router,
    private viewSwitchService: ViewSwitchService,
  ) { }

  ngOnInit() {
    this.subscribeViewSwitchService();
    this.getRooms();
  }

  subscribeViewSwitchService(){
    this.viewSwitchSub = this.viewSwitchService.isDashboardView().subscribe(data =>{
      this.dashboardView = data;
      console.log('ProjectComponent current Value. IsDashboardView?? -> ',data)
    },
    error =>{
      console.log("Error to get Dashboard-View state: ", error);
    })
  }

  getRooms(){
    this.getRoomsSub = this.roomservice.getAllRooms(this.floor.id).subscribe(rooms =>{
      this.rooms = rooms;
      console.log('RoomsComponent got rooms: ', this.rooms);
      this.loading = false;
    },
    error =>{
      console.log("Error to get Rooms: ",error);
    })
  }

  createRoom(){
    console.log("clicked create Room. mit floorId: ", this.floor.id, " & Floor-Object: ", this.floor);
    this.router.navigate(['main/floors/'+ this.floor.id + '/rooms/new']);
  }

  updateRoom(room){
    this.router.navigate(['main/rooms/'+ room.id, { floor: this.floor.id}]);
    console.log("clicked edit Room with roomId: ", room.id);
  }

  deleteRoom(room){
    this.deleteRoomSub = this.roomservice.deleteRoom(room.id)
    .subscribe(responseData =>{
      console.log("room deleted successfully");
      this.getRooms();
      $('#deleteRoomModal').modal('toggle');
    });
  }

  onDismissDeleteModal(){
    $('#deleteRoomModal').modal('toggle');
    this.selectedRoom = null;
  }

  showDeleteRoomModal(room){
    this.selectedRoom = room;
    $('#deleteRoomModal').modal('toggle');
  }
  
  navigateIntoRoom(room){
    if(!this.selectedRoom){
      this.router.navigate(['main/config/room/' + room.id]);
    }
  }

  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
    this.getRoomsSub.unsubscribe();
    if(this.deleteRoomSub){
      this.deleteRoomSub.unsubscribe();
    }
  }

}
