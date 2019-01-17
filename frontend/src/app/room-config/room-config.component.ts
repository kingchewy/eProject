import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Room } from '../_models/room';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomService } from '../_services/room.service';
import { Appliance } from '../_models/appliance';
import { Sensor } from '../_models/sensor';
import { ApplianceService } from '../_services/appliance.service';
import { SensorService } from '../_services/sensor.service';
import { ProjectService } from '../_services/project.service';
import { ApplianceType } from '../_models/appliancetype';
import { AppliancetypeService } from '../_services/appliancetype.service';
import * as _ from 'underscore';
import { SensorType } from '../_models/sensortype';
import { SensortypeService } from '../_services/sensortype.service';
import { Project } from '../_models/project';
import { AppliancedetailsComponent } from '../appliancedetails/appliancedetails.component';
import { SensordetailsComponent } from '../sensordetails/sensordetails.component';

declare var $ :any;

@Component({
  selector: 'app-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.css']
})
export class RoomConfigComponent implements OnInit, OnDestroy {
  @ViewChild(AppliancedetailsComponent) childApplianceDetails: AppliancedetailsComponent;
  @ViewChild(SensordetailsComponent) childSensorDetails: SensordetailsComponent;
  project: Project;
  roomId: number;
  room: Room;

  appliances: Appliance[];
  applianceTypes: ApplianceType[];  
  roomsApplianceTypes: ApplianceType[];
  selectedApplianceType: number;
  
  sensors: Sensor[];
  sensorTypes: SensorType[];
  roomsSensorTypes: SensorType[];
  selectedSensorType: number;
  
  loading: boolean = true;
  modalNew: boolean = false;

  //SUBSCRIPTIONS
  getRoomSub: Subscription;
  getAppliancesSub: Subscription;
  getProjectSub: Subscription;
  getCircuitBreakerSub: Subscription;
  getApplianceTypeSub: Subscription;
  getSensorsSub: Subscription;
  getSensorTypeSub: Subscription;
  getAppliancesAfterDeleteSub: Subscription;
  getSensorsAfterDeleteSub: Subscription;

  
  constructor(private route: ActivatedRoute,
    private roomservice: RoomService,
    private applianceservice: ApplianceService,
    private sensorservice: SensorService,
    private sensortypeservice: SensortypeService,
    private appliancetypeservice: AppliancetypeService,
    private projectservice: ProjectService,
  ) { }

  ngOnInit() {
    this.getRoomIdFromRoute();
    this.getRoom();
    this.getAppliances();
    this.getSensors();
    this.getApplianceTypes();
    this.getSensorTypes();
    this.getProject();
  }

  getRoomIdFromRoute(){
    this.roomId = +this.route.snapshot.paramMap.get('roomid');    
  }

  getRoom(){
    this.getRoomSub = this.roomservice.getRoom(this.roomId).subscribe(room =>{
      this.room = room;
    })
  }
  
  getAppliances(){
    this.getAppliancesSub = this.applianceservice.getAppliancesByRoom(this.roomId)
    .subscribe(appliances =>{
      this.appliances = appliances;
      console.log(appliances)
    })
  }

  getSensors(){
    this.getSensorsSub = this.sensorservice.getSensorsByRoom(this.roomId)
    .subscribe(sensors =>{
      this.sensors = sensors;
    })
  }
  
  getApplianceTypes(){
    setTimeout(()=>{
      
      this.getApplianceTypeSub = this.appliancetypeservice.getApplianceTypes()
      .subscribe(appliancetypes =>{
        this.applianceTypes = appliancetypes;
        console.log("ApplianceTypes: ", this.applianceTypes)
        this.getApplianceTypesForRoom();
      })
    }, 300);
  }

  getSensorTypes(){
    setTimeout(()=>{
      this.getSensorTypeSub = this.sensortypeservice.getSensorTypes()
      .subscribe(sensortypes =>{
        console.log("sensortypes: ", sensortypes)
        this.sensorTypes = sensortypes;
        this.getSensorTypesForRoom();
      })

    }, 300);
  }
  
  
  getApplianceTypesForRoom(){
    let that = this;
    this.roomsApplianceTypes = [];
    
    this.applianceTypes.forEach(function(type){
      let isPresent = _.find(that.appliances, function(obj){
        return obj.appliancetype_id == type.id})
        
        if(isPresent != null && isPresent.appliancetype_id === type.id){
          console.log("Present ApplianceType = ", isPresent)
          that.roomsApplianceTypes.push(type);          
        }
    });
    console.log("Final Array of RooomsApplianceTypes: ",this.roomsApplianceTypes);
    this.loading = false;
  }
  
  
  getSensorTypesForRoom(){
    let that = this;
    this.roomsSensorTypes = [];

    this.sensorTypes.forEach(function(type){
      let isPresent = _.find(that.sensors, function(obj){
        return obj.sensortype_id == type.id})

        if(isPresent != null && isPresent.sensortype_id === type.id){
          that.roomsSensorTypes.push(type);
        }
    })
    console.log('Final Array of RoomsSensorTypes: ', this.roomsSensorTypes);
  }
   
  
  getProject(){
    this.getProjectSub = this.projectservice.currentProject.subscribe(project =>{
      this.project = project
      if(!project.id){
        this.projectservice.pushLastKnownActiveProject();
      }
      console.log("projekt = ", project)
    });
  }


  showAppliances(typeId){
    if(this.selectedApplianceType == typeId){
      console.log("in")
      this.selectedApplianceType = null;
    } else{
      this.selectedApplianceType = typeId;
    }
  }


  showSensors(typeId){
    if(this.selectedSensorType == typeId){
      console.log("in")
      this.selectedSensorType = null;
    } else{
      this.selectedSensorType = typeId;
    }
  }

  showSensorInCategoryModal(){
    this.modalNew = true;
    $('#newSensorInCategoryModal').modal('toggle');
  }

 
  showApplianceInCategoryModal(){
    this.modalNew = true;
    $('#newApplianceInCategoryModal').modal('toggle');
  }

  createApplianceInCategory(roomId){
    this.childApplianceDetails.createAppliance(roomId);
    $('#newApplianceInCategoryModal').modal('toggle');
    this.refreshApplianceView();
  }

  createSensorInCategory(roomId){
    this.childSensorDetails.createSensor(roomId);
    $('#newSensorInCategoryModal').modal('toggle');
    this.refreshSensorView();
  }
  
  onDismissNewApplianceInCategory(){
    this.modalNew = false;
  }

  onDismissNewSensorInCategory(){
    this.modalNew = false;
  }
  
  onNewApplianceCreated(applianceTypeId: any){
    console.log("appliance created! emitted appliancetypeId =",applianceTypeId)
    this.selectedApplianceType = applianceTypeId;
    this.modalNew = false;
  }

  onNewSensorCreated(sensorTypeId: any){
    console.log("sensor created! emitted sensortypeId =",sensorTypeId)
    this.selectedSensorType = sensorTypeId;
    this.modalNew = false;
  }

  onApplianceDeleted(applianceTypeId: any){
    this.getAppliancesAfterDeleteSub = this.applianceservice.getAppliancesByRoom(this.roomId)
    .subscribe(appliances =>{
      var wasLast = true;
      appliances.forEach(function(appliance){
        if(appliance.appliancetype_id == applianceTypeId){
          wasLast = false;
        }
      });
      if(wasLast){
        this.refreshApplianceView();
        console.log("was last")
      }
    })
  }

  onSensorDeleted(sensorTypeId: any){
    this.getSensorsAfterDeleteSub = this.sensorservice.getSensorsByRoom(this.roomId)
    .subscribe(sensors =>{
      var wasLast= true;
      sensors.forEach(function(sensor){
        if(sensor.sensortype_id = sensorTypeId){
          wasLast = false;
        }
      });
      if(wasLast){
        this.refreshSensorView();
      }
    })
  }

  refreshApplianceView(){
    setTimeout(()=>{
      this.getAppliances();
      this.getApplianceTypes();     
    },100);    
  }

  refreshSensorView(){
    setTimeout(()=>{
      this.getSensors();
      this.getSensorTypes();
    },100);
  }

  ngOnDestroy(){
    this.getRoomSub.unsubscribe();
    this.getAppliancesSub.unsubscribe();
    this.getProjectSub.unsubscribe();
    this.getApplianceTypeSub.unsubscribe();
    this.getSensorsSub.unsubscribe();
    this.getSensorTypeSub.unsubscribe();
    if(this.getAppliancesAfterDeleteSub){
      this.getAppliancesAfterDeleteSub.unsubscribe();
    }
    if(this.getSensorsAfterDeleteSub){
      this.getSensorsAfterDeleteSub.unsubscribe();
    }
  }
}
