import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorType } from '../_models/Sensortype';
import { SensortypeService } from '../_services/sensortype.service';
import { Subscription } from 'rxjs';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sensorcategories',
  templateUrl: './sensorcategories.component.html',
  styleUrls: ['./sensorcategories.component.css']
})
export class SensorcategoriesComponent implements OnInit, OnDestroy {


  loading: boolean = false;
  sensorTypes: SensorType[];

  selectedSensorType: SensorType = new SensorType;
  updatedSensorType: SensorType = new SensorType;

  update: boolean = false;

  //SUBSCRIPTIONS:
  getSensorTypesSub: Subscription;
  deleteSensorTypeSub: Subscription;
  updateSensorTypeSub: Subscription;
  createSensorTypeSub: Subscription;

  constructor(
    private sensortypeservice: SensortypeService,
  ) { }

  ngOnInit() {
    this.getSensorTypes();
  }

  getSensorTypes(){
    this.getSensorTypesSub = this. sensortypeservice.getSensorTypes()
    .subscribe(sensorTypes =>{
      console.log("SensorTypes loaded: ", sensorTypes)
      this.sensorTypes = sensorTypes;

    });
  }

  // SHOW MODALS
  showNewSensorTypeModal(){
    $('#newSensorTypeModal').modal('toggle');
  }

  showUpdateTypeModal(type: SensorType){
    this.selectedSensorType = type;
    this.updatedSensorType.name = this.selectedSensorType.name;
    this.updatedSensorType.id = this.selectedSensorType.id;
    $('#updateSensorTypeModal').modal('toggle');
  }

  showDeleteTypeModal(type: SensorType){
    this.selectedSensorType = type;
    $('#deleteSensorTypeModal').modal('toggle');
  }

  // ACTION / REQUEST
  createSensorType(){
    this.createSensorTypeSub = this.sensortypeservice.createSensorType(this.updatedSensorType)
    .subscribe(sensorType =>{
      console.log("SensorType successfully created: ", sensorType)
      this.getSensorTypes();
    });
    $('#newSensorTypeModal').modal('toggle');
    
  }

  updateSensorType(){
    this.updateSensorTypeSub = this.sensortypeservice.updateSensorType(this.updatedSensorType)
    .subscribe(sensorType =>{
      console.log("updated SensorType: ", sensorType)
      this.getSensorTypes();
    });
    $('#updateSensorTypeModal').modal('toggle');
    this.selectedSensorType = new SensorType;
  }

  deleteSensorType(){
    this.deleteSensorTypeSub = this.sensortypeservice.deleteSensorType(this.selectedSensorType.id)
    .subscribe(data=>{
      console.log("SensorType successful deleted!")
      this.getSensorTypes();
    });
    $('#deleteSensorTypeModal').modal('toggle');
  }

  // DISMISS
  onDismissNewModal(){
    $('#newSensorTypeModal').modal('toggle');
  }

  onDismissDeleteModal(){
    this.selectedSensorType = new SensorType;
    $('#deleteSensorTypeModal').modal('toggle');
  }

  onDismissUpdateModal(){
    this.selectedSensorType = new SensorType;
    this.updatedSensorType = new SensorType;
    $('#updateSensorTypeModal').modal('toggle');
  }


  ngOnDestroy(): void {
    if(this.deleteSensorTypeSub){
      this.deleteSensorTypeSub.unsubscribe();
    }
    if(this.getSensorTypesSub){
      this.getSensorTypesSub.unsubscribe();
    }
    if(this.updateSensorTypeSub){
      this.updateSensorTypeSub.unsubscribe();
    }
    if(this.createSensorTypeSub){
      this.createSensorTypeSub.unsubscribe();
    }
  }
}
