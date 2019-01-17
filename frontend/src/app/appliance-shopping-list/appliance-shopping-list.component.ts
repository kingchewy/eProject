import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Room } from '../_models/room';
import { AppliancetypeService } from '../_services/appliancetype.service';
import { ApplianceType } from '../_models/appliancetype';
import { Subscription } from 'rxjs';
import { ApplianceService } from '../_services/appliance.service';

@Component({
  selector: 'app-appliance-shopping-list',
  templateUrl: './appliance-shopping-list.component.html',
  styleUrls: ['./appliance-shopping-list.component.css']
})
export class ApplianceShoppingListComponent implements OnInit, OnDestroy {

  @Input() show:boolean;
  @Input() roomsOfProject: Room[];
  @Output () onAppliancesReady = new EventEmitter<boolean>();

  countRoomsOfProject: number = 0;

  appliancesGrouped: any[];

  applianceTypes: ApplianceType[];


  //SUBSCRIPTIONS
  getAplianceTypesSub: Subscription;
  getAppliancesSub: Subscription;
  
  constructor( private appliancetypeservice: AppliancetypeService,
                private applianceservice: ApplianceService
                ) { }

  ngOnInit() {
    this.getApplianceTypes();
  }
  
  getApplianceTypes(){
    this.getAplianceTypesSub = this.appliancetypeservice.getApplianceTypes()
    .subscribe(applianceTypes =>{
      if(applianceTypes != undefined || applianceTypes.length != 0){
        this.applianceTypes = applianceTypes;
        this.getAppliancesForAllRooms();
      } else{
        this.onAppliancesReady.emit(true);        
      }
    });
  }

  getAppliancesForAllRooms(){
    this.roomsOfProject.forEach( room =>{
      this.getAppliancesForRoom(room);
    });
  }

  getAppliancesForRoom(room){
    this.getAppliancesSub = this.applianceservice.getAppliancesByRoom(room.id)
    .subscribe(appliances =>{
      console.log("appliances undefined?", appliances)
      if (appliances != undefined || appliances.length != 0){
        this.createGroupesOfAppliances(appliances);
      }else{
        this.checkLoadingFinished();
      }
    });
  }
  
  createGroupesOfAppliances(appliances){
    if(this.appliancesGrouped === undefined){
      this.appliancesGrouped = [];
    }

    appliances.forEach(appliance => {
      let typeId = appliance.appliancetype_id;
      let typename: string = "";

      this.applianceTypes.forEach(type =>{
        if(type.id == typeId){
          typename = type.name;
        }
      })
      let isTwice: boolean = false;
      
      for(let i = 0; i < this.appliancesGrouped.length; i++){
        if(this.appliancesGrouped[i].appliancetype_id == typeId){
              this.appliancesGrouped[i].count += 1;
              isTwice = true;
          }
      }

      if(!isTwice){
        let newGroup = {count: 1, 
                        appliancetype_id: typeId,
                        typename: typename
                      };
        this.appliancesGrouped.push(newGroup);
      }
    });
    
    this.checkLoadingFinished();
    console.log("grouped Appliances ", this.appliancesGrouped)
  }

  checkLoadingFinished(){
    this.countRoomsOfProject += 1;
    console.log("room nr.", this.countRoomsOfProject," of ", this.roomsOfProject.length, " rooms!")
    if(this.countRoomsOfProject === this.roomsOfProject.length){
      console.log("loading Finished set to true!")
      this.onAppliancesReady.emit(true);
    }
  }

  ngOnDestroy(){
    this.getAplianceTypesSub.unsubscribe();
    if(this.getAppliancesSub){
      this.getAppliancesSub.unsubscribe();
    }
  }
}
