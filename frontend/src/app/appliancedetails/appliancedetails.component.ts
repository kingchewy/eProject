import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Appliance } from '../_models/appliance';
import { ActivatedRoute } from '@angular/router';
import { ApplianceService } from '../_services/appliance.service';
import { Subscription } from 'rxjs';
import { SurgeProtector } from '../_models/surgeprotectors';
import { SurgeprotectorService } from '../_services/surgeprotector.service';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { AppliancetypeService } from '../_services/appliancetype.service';
import { ApplianceType } from '../_models/appliancetype';

declare var $ :any;

@Component({
  selector: 'app-appliancedetails',
  templateUrl: './appliancedetails.component.html',
  styleUrls: ['./appliancedetails.component.css']
})
export class AppliancedetailsComponent implements OnInit, OnDestroy {
    
  loading: boolean = true;

  // FROM MODAL in "room-config-component"
  @Input() projectId: number;
  @Input()newAppliance: boolean;
  @Input()newApplianceInCategory: boolean;
  @Input()applianceTypeId: number;
  @Output()applianceTypeIdChange = new EventEmitter<number>();
  

  @Input()applianceId: number; //?? input notwendig?
  @Output()applianceIdChange = new EventEmitter<number>();

  //selected in Modal
  selectedApplianceType: ApplianceType = null;
  selectedSurgeProtector: SurgeProtector;
  selectedCircuitBreaker: CircuitBreaker;

  appliance: Appliance;
  applianceTypes: ApplianceType[];

  surgeProtectors: SurgeProtector[];
  circuitBreakers: CircuitBreaker[];

  //STATUS to show/hide components
  showAddSurgeProtector: boolean = false;


  //SUBSCRIPTIONS
  getSurgeProtectorsSub: Subscription;
  createApplianceSub: Subscription;
  getCircuitBreakersSub: Subscription;
  getCircuitBreakerSub: Subscription;
  getApplianceSub: Subscription;
  getSurgeProtectorSub: Subscription;
  updateApplianceSub: Subscription;
  getApplianceTypeSub: Subscription;


  constructor(private route: ActivatedRoute,
    private applianceservice: ApplianceService,
    private surgeprotectorservice: SurgeprotectorService,
    private circuitbreakerservice: CircuitbreakerService,
    private appliancetypeservice: AppliancetypeService,
  ) {
    this.appliance = new Appliance;    
   }

  ngOnInit() {    
    if(this.applianceTypeId){
      this.appliance.appliancetype_id = this.applianceTypeId;
    }
    this.getDataForNewAppliance();
    this.getApplianceDataToUpdate();
  }


  // *********** CREATE
  getDataForNewAppliance(){
    if(this.newAppliance){
      this.getSurgeProtectors();
      this.getApplianceTypes();
    }
  }  
  
  createAppliance(roomId){
    this.createApplianceSub = this.applianceservice.createApplianceByRoom(this.appliance, roomId)
    .subscribe(newAppliance =>{
      console.log("appliance created: ", newAppliance);
      this.applianceTypeIdChange.emit(newAppliance.appliancetype_id);
    })
  }
  


  // ************ UPDATE
  getApplianceDataToUpdate(){
    if(this.applianceId){
      this.getAppliance();
    }
  }
  
  getAppliance(){
    this.getApplianceSub = this.applianceservice.getAppliance(this.applianceId)
    .subscribe(appliance =>{
      this.appliance = appliance;
      console.log("On UPDATE -> GET APPLIANCE SUBSCRIPTION success: ", this.appliance)
      this.setSelectedCircuitBreaker();
    });
  }

  setSelectedCircuitBreaker(){
    this.getCircuitBreakerSub = this.circuitbreakerservice.getCircuitBreaker(this.appliance.circuitbreaker_id)
    .subscribe(circuitBreaker => {
      this.selectedCircuitBreaker = circuitBreaker;
      console.log("On UPDATE -> selected circtuitbreaker SUBSCRIPTION success: ", this.appliance)
      //
      this.setSelectedSurgeProtector();
      this.getSurgeProtectors();
    })
  }
  
  setSelectedSurgeProtector(){
    this.getSurgeProtectorSub = this.surgeprotectorservice.getSurgeProtector(this.selectedCircuitBreaker.surgeprotector_id)
    .subscribe(surgeProtector =>{
      this.selectedSurgeProtector = surgeProtector;
      this.getCircuitBreakers(surgeProtector);
    })    
  }


  updateAppliance(){
    console.log("die ID der appliance ist: ", this.appliance.name)
    this.updateApplianceSub = this.applianceservice.updateAppliance(this.appliance)
    .subscribe(appliance =>{
      console.log("successful updated appliance: ",appliance);
      this.applianceIdChange.emit(null);
    })
  }


  // ****** GENERAL *******
  setCircuitBreaker(circuitBreaker){
    this.selectedCircuitBreaker = circuitBreaker;
    this.appliance.circuitbreaker_id = circuitBreaker.id;
  }

  getApplianceTypes(){
    this.getApplianceTypeSub = this.appliancetypeservice.getApplianceTypes()
    .subscribe(applianceTypes =>{
      this.applianceTypes = applianceTypes;
    });
  }

  getCircuitBreakers(surgeProtector){
    this.getCircuitBreakersSub = this.circuitbreakerservice.getCircuitBreakers(surgeProtector.id)
    .subscribe(circuitBreakers =>{
      this.circuitBreakers = circuitBreakers;
      this.loading = false;
      console.log("circuitBreakers loaded: ", circuitBreakers);
    })
  }

  getSurgeProtectors(){
    this.getSurgeProtectorsSub = this.surgeprotectorservice.getSurgeProtectors(this.projectId)
    .subscribe(surgeProtectors =>{
      this.surgeProtectors = surgeProtectors;
      this.loading = false;
      console.log("getSurgeProtectors: ",surgeProtectors)
    })
  }

  onChangeGetCircuitBreakers(surgeProtector){
    this.selectedCircuitBreaker = null;
    this.selectedSurgeProtector = surgeProtector;
    this.getCircuitBreakers(surgeProtector);
  }

  onApplianceTypeSelected(applianceType: ApplianceType){
    console.log(applianceType);
    this.appliance.appliancetype_id = applianceType.id;
    console.log("appliance with new type-ID: ",this.appliance)
  }

  onShowAddSurgeProtectorChange(show: boolean){
    this.showAddSurgeProtector = show;
  }

  onShowAddSurgeProtector(){
    this.showAddSurgeProtector = true;
    $('#newSurgeProtectorModal').modal('toggle');
  }

  onDismissNewSurgeProtector(){
    this.showAddSurgeProtector = false;
  }



  ngOnDestroy(): void {
    this.getSurgeProtectorsSub.unsubscribe();

    if(this.createApplianceSub){
      this.createApplianceSub.unsubscribe();
    }
    if(this.getCircuitBreakerSub){
      this.getCircuitBreakerSub.unsubscribe();
    }
    if(this.getApplianceSub){
      this.getApplianceSub.unsubscribe();
    }
    if(this.getSurgeProtectorSub){
      this.getSurgeProtectorSub.unsubscribe();
    }
    if(this.updateApplianceSub){
      this.updateApplianceSub.unsubscribe();
    }
    if(this.getApplianceTypeSub){
      this.getApplianceTypeSub.unsubscribe();
    }
  }

}
