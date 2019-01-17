import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Sensor } from '../_models/sensor';
import { SensorService } from '../_services/sensor.service';
import { Subscription } from 'rxjs';
import { SensorType } from '../_models/sensortype';
import { Appliance } from '../_models/appliance';
import { ApplianceService } from '../_services/appliance.service';
import { SensortypeService } from '../_services/sensortype.service';

declare var $ :any;

@Component({
  selector: 'app-sensordetails',
  templateUrl: './sensordetails.component.html',
  styleUrls: ['./sensordetails.component.css']
})
export class SensordetailsComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  sensor: Sensor;

  //FROM MODAL in "room-config-component"
  @Input()roomId: number;
  @Input() projectId: number;
  @Input() newSensor: boolean;
  @Input() newSensorInCategory: boolean;
  @Input() sensorTypeId: number;
  @Output() sensorTypeIdChange = new EventEmitter<number>();

  @Input()sensorId: number;
  @Output()sensorIdChange = new EventEmitter<number>();

  appliances: Appliance[];
  assignedAppliance: Appliance = null;

  sensorTypes: SensorType[];
  selectedSensorType: SensorType = null;

  //SUBSCRIPTIONS
  createSensorSub: Subscription;
  updateSensorSub: Subscription;
  getSensorSub: Subscription;
  getAssignedAppliancesSub: Subscription;
  getAssignedApplianceSub: Subscription;
  getSensorTypeSub: Subscription;
  getAppliancesSub: Subscription;

  randomNum;

  constructor(
    private sensorservice: SensorService,
    private applianceservice: ApplianceService,
    private sensortypeservice: SensortypeService,
  ) { 
    this.sensor = new Sensor;
    this.randomNum = Math.random();
  }


  ngOnInit() {
    if(this.sensorTypeId){
      this.sensor.sensortype_id = this.sensorTypeId;      
    }
    this.getDataForNewSensor();
    this.getSensorDataToUpdate();
  }

  logData(){
    console.log("current values of Sensor to create: ",this.sensor)
  }

  // ************ CREATE
  getDataForNewSensor(){
    if(this.newSensor){
      this.getAppliancesForRoom();
    }
    if(this.newSensorInCategory){
      this.getSensorTypes();
    }
  }

  createSensor(roomId){
    console.log("in create sensor method. sensor to create =",this.sensor)
    this.createSensorSub = this.sensorservice.createSensorByRoom(this.sensor, roomId)
    .subscribe(newSensor =>{
      console.log("sensor created: ", newSensor);
      this.sensorTypeIdChange.emit(newSensor.sensortype_id);
    })
  }

  getSensorTypes(){
    this.getSensorTypeSub = this.sensortypeservice.getSensorTypes()
    .subscribe(sensorTypes=>{
      this.sensorTypes = sensorTypes;
    });
  }

  // ************* UPDATE
  getSensorDataToUpdate(){
    if(this.sensorId){
      this.getSensor();
    }
  }

  getSensor(){
    this.getSensorSub = this.sensorservice.getSensor(this.sensorId)
    .subscribe(sensor=>{
      this.sensor = sensor;
      this.getAppliancesForRoom();
    })
  }

  
  getAppliancesForRoom(){
    this.getAssignedAppliancesSub = this.applianceservice.getAppliancesByRoom(this.roomId)
    .subscribe(appliances=>{
      this.appliances = appliances;
      this.setAssignedAppliance();
      this.loading = false;
    })
  }

  setAssignedAppliance(){
    this.appliances.forEach((appliance, index) =>{
      if(appliance.id === this.sensor.appliance_id){
        this.assignedAppliance = this.appliances[index];
      }
    })
  }

  updateSensor(){
    this.updateSensorSub = this.sensorservice.updateSensor(this.sensor)
    .subscribe(sensor=>{
      console.log("successful updated sensor: ",sensor);
      this.sensorIdChange.emit(null);
    })
  }
  // ************* GENERAL
  
  onSensorTypeSelected(sensorType: SensorType){
    this.sensor.sensortype_id = sensorType.id;
  }

  onChangeSetAppliance(selectedAppliance){
    this.assignedAppliance = selectedAppliance;
    if(selectedAppliance === null){

    }

    console.log("Name: ",this.sensor.name, "Position: ", this.sensor.position, "zugewiesener Verbraucher: ", this.assignedAppliance.name)
  }

  onApplianceSelected(appliance: Appliance){
    this.assignedAppliance = appliance;
    if(!appliance){
      this.sensor.appliance_id = null;
    } else{
      this.sensor.appliance_id = appliance.id;
    }
    console.log("Name: ",this.sensor.name, "Position: ", this.sensor.position, "zugewiesener Verbraucher: ", this.assignedAppliance)

  }
  
  ngOnDestroy(): void {
    if(this.createSensorSub){
      this.createSensorSub.unsubscribe();
    }
    if(this.updateSensorSub){
      this.updateSensorSub.unsubscribe();
    }
    if(this.getSensorSub){
      this.getSensorSub.unsubscribe();
    }
    if(this.getAssignedAppliancesSub){
      this.getAssignedAppliancesSub.unsubscribe();
    }
    if(this.getAssignedApplianceSub){
      this.getAssignedApplianceSub.unsubscribe();
    }
    if(this.getAppliancesSub){
      this.getAppliancesSub.unsubscribe();
    }
  }
}
