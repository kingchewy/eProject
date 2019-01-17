import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ViewSwitchService } from '../_services/view-switch.service';
import { ProjectService } from '../_services/project.service';
import { SensorService } from '../_services/sensor.service';
import { Subscription } from 'rxjs';
import { Sensor } from '../_models/sensor';
import { ApplianceService } from '../_services/appliance.service';
import { SensordetailsComponent } from '../sensordetails/sensordetails.component';

declare var $ :any;

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit, OnDestroy {
  @ViewChild(SensordetailsComponent) child: SensordetailsComponent;

  @Output()sensorDeleted = new EventEmitter<number>();

  @Input() sensorTypeName: string;
  @Input() sensorTypeId: number;
  @Input() roomId: number;

  sensors: Sensor[];
  selectedSensor: Sensor;
  @Input() selectedSensorId: number;

  assignedAppliances: any = {};

  modalNew: boolean = false;
  loading: boolean = true;
  deletingSensor: boolean = false;
  dashboardView: boolean;


  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;
  getSensorSub: Subscription;
  getAppliancesSub: Subscription;
  deleteSensorSub: Subscription;


  constructor(private viewSwitchService: ViewSwitchService,
    private projectservice: ProjectService,
    private sensorservice: SensorService,
    private applianceservice: ApplianceService,
    ) { }

  ngOnInit() {
    this.subscribeViewSwitchService();
    this.getSensors();
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

  getSensors(){
    this.getSensorSub = this.sensorservice.getSensorsByRoom(this.roomId)
    .subscribe(sensors =>{
      this.sensors = sensors;
      console.log(sensors)
      this.getAppliancesForSensors();
    })
  }

  getAppliancesForSensors(){
    let lengthSensors = this.sensors.length;
    let count = 0;

    this.sensors.forEach(sensor => {
      if(sensor.sensortype_id == this.sensorTypeId){
        this.getAppliancesSub = this.applianceservice.getAppliance(sensor.appliance_id)
        .subscribe(appliance =>{
          count++;
          this.assignedAppliances[sensor.id] = appliance;
          if(count === lengthSensors){this.loading = false;}
        });
      }else{count++;}
    });

  }

  createSensor(){
    this.child.createSensor(this.roomId);
    $('#newSensorModal').modal('toggle');
    setTimeout(()=>{
      this.getSensors();
      this.selectedSensor = null;
      this.modalNew = false;
    },250);

  }

  updateSensor(){
    this.child.updateSensor();
    $('#updateSensorModal').modal('toggle');
    setTimeout(()=>{
      this.getSensors();
      this.selectedSensor = null;
    },250);
  }

  deleteSensor(){
    $('#deleteSensorModal').modal('toggle');
    this.deleteSensorSub = this.sensorservice.deleteSensor(this.selectedSensor.id)
    .subscribe(data=>{
      console.log("successful deleted sensor");
      this.sensorDeleted.emit(this.selectedSensor.sensortype_id);
      this.getSensors();
      this.selectedSensor = null;
    })
  }
  
  showNewSensorModal(){
    this.modalNew = true;
    $('#newSensorModal').modal('toggle');
  }

  showUpdateSensorModal(sensorToUpdate){
    if(!this.selectedSensor){
      this.selectedSensor = sensorToUpdate;
      this.selectedSensorId = sensorToUpdate.id;
      $('#updateSensorModal').modal('toggle');
    }  
  }
  
  showDeleteSensorModal(sensorToDelete){
    this.selectedSensor = sensorToDelete;
    $('#deleteSensorModal').modal('toggle');
  }


  onUpdateChangeSensorId(sensorId: number){
    this.selectedSensorId = sensorId;
  }

  onDismissNewSensor(){
    this.modalNew = false;
  }

  onDismissUpdateSensor(){
    this.selectedSensor = null;
    this.selectedSensorId = null;
  }

  onDismissDeleteSensor(){
    this.selectedSensor = null;
  }

  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
    this.getSensorSub.unsubscribe();
    this.getAppliancesSub.unsubscribe();
    if(this.deleteSensorSub){
      this.deleteSensorSub.unsubscribe();
    }
  }
}
