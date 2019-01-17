import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Room } from '../_models/room';
import { SensorType } from '../_models/sensortype';
import { Subscription } from 'rxjs';
import { SensortypeService } from '../_services/sensortype.service';
import { SensorService } from '../_services/sensor.service';

@Component({
  selector: 'app-sensor-shopping-list',
  templateUrl: './sensor-shopping-list.component.html',
  styleUrls: ['./sensor-shopping-list.component.css']
})
export class SensorShoppingListComponent implements OnInit, OnDestroy {

  @Input() show: boolean;
  @Input() roomsOfProject: Room[];
  @Output () onSensorsReady = new EventEmitter<boolean>();

  countRoomsOfProject: number = 0;

  sensorsGrouped: any[];

  sensorTypes: SensorType[];

  //SUBSCRIPTIONS:
  getSensorTypeSub: Subscription;
  getSensorsSub: Subscription;

  constructor( private sensortypeservice: SensortypeService,
                private sensorservice: SensorService) { }

  ngOnInit() {
    this.getSensorTypes();
  }

  getSensorTypes(){
    this.getSensorsSub = this.sensortypeservice.getSensorTypes()
    .subscribe(sensorTypes =>{
      if(sensorTypes != undefined || sensorTypes.length != 0){
        this.sensorTypes = sensorTypes;
        this.getSensorsForAllRooms();
      } else{
        this.onSensorsReady.emit(true);        
      }
    });
  }

  getSensorsForAllRooms(){
    this.roomsOfProject.forEach( room =>{
      this.getSensorsForRoom(room);
    })
  }

  getSensorsForRoom(room){
    this.getSensorsSub = this.sensorservice.getSensorsByRoom(room.id)
    .subscribe(sensors =>{
      console.log("sensors undefined?", sensors)
      if (sensors != undefined || sensors.length != 0){
        this.createGroupesOfSensors(sensors);
      }else{
        this.checkLoadingFinished();
      }
    });
  }

  createGroupesOfSensors(sensors){
    if(this.sensorsGrouped === undefined){
      this.sensorsGrouped = [];
    }

    sensors.forEach(sensor => {
      let typeId = sensor.sensortype_id;
      let typename: string = "";

      this.sensorTypes.forEach(type =>{
        if(type.id == typeId){
          typename = type.name;
        }
      })
      let isTwice: boolean = false;
      
      for(let i = 0; i < this.sensorsGrouped.length; i++){
        if(this.sensorsGrouped[i].sensortype_id == typeId){
              this.sensorsGrouped[i].count += 1;
              isTwice = true;
          }
      }

      if(!isTwice){
        let newGroup = {count: 1, 
                        sensortype_id: typeId,
                        typename: typename
                      };
        this.sensorsGrouped.push(newGroup);
      }
    });
    
    this.checkLoadingFinished();
    console.log("grouped Appliances ", this.sensorsGrouped)
  }
  
  checkLoadingFinished(){
    this.countRoomsOfProject += 1;
    console.log("room nr.", this.countRoomsOfProject," of ", this.roomsOfProject.length, " rooms!")
    if(this.countRoomsOfProject === this.roomsOfProject.length){
      console.log("loading Finished set to true!")
      this.onSensorsReady.emit(true);
    }
  }

  ngOnDestroy(){

  }
}
