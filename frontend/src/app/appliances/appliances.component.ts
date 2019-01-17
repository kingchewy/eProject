import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appliance } from '../_models/appliance';
import { ApplianceService } from '../_services/appliance.service';
import { Router } from '@angular/router';
import { ViewSwitchService } from '../_services/view-switch.service';
import { SurgeprotectorService } from '../_services/surgeprotector.service';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { AppliancedetailsComponent } from '../appliancedetails/appliancedetails.component';


declare var $ :any;

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.css']
})
export class AppliancesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(AppliancedetailsComponent) child: AppliancedetailsComponent;

  @Output()applianceDeleted = new EventEmitter<number>();
  
  @Input() applianceTypeName: string;
  @Input() applianceTypeId: number;
  @Input() roomId: number;
  
  modalNew: boolean = false;
  selectedAppliance: Appliance;
  @Input() selectedApplianceId: number;
  
  project: Project;
  
  appliances: Appliance[];
  assignedCircuitBreakers: any = {};
  assignedSurgeProtectors: any = {};
  
  loading: boolean = true;
  deletingAppliance: boolean = false;
  dashboardView: boolean;
  
  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;
  getAppliancesSub: Subscription;
  getSurgeProtectorsSub: Subscription;
  getProjectSub: Subscription;
  getCircuitBreakersSub: Subscription;
  deleteApplianceSub: Subscription;
  
  
  constructor(private applianceservice: ApplianceService,
    private router: Router,
    private viewSwitchService: ViewSwitchService,
    private surgeprotectorservice: SurgeprotectorService,
    private projectservice: ProjectService,
    private circuitbreakerservice: CircuitbreakerService,
  ) { }
  
  
  ngOnInit() {    
    this.subscribeViewSwitchService();
    this.getAppliances();
    this.getProject();
  }
  
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit -> child: ", this.child);
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
 
  
  getAppliances(){
    this.getAppliancesSub = this.applianceservice.getAppliancesByRoom(this.roomId)
    .subscribe(appliances =>{
      this.appliances = appliances;
      console.log("RENEW appliances: ",appliances)
      this.getCircuitBreakersForAppliances();
    })
  }
  
  
  getCircuitBreakersForAppliances(){
    let lengthAppliances = this.appliances.length;
    let count_ = 0;
    
    this.appliances.forEach(appliance => {
      //console.log("element = ", appliance)
      
      if(appliance.appliancetype_id == this.applianceTypeId){
        this.getCircuitBreakersSub = this.circuitbreakerservice.getCircuitBreaker(appliance.circuitbreaker_id)
        .subscribe(circuitbreaker => {
          count_++;
          console.log("CircuitBreaker for Appliance: ", circuitbreaker)
          this.assignedCircuitBreakers[appliance.id] = circuitbreaker;    
          if(count_ === lengthAppliances){this.getSurgeProtectors();}     
        });
      } else{count_ ++;}
    });
    // console.log("All CircuitBreakers: ", this.circuitBreakers)
    //console.log("Start to get SurgeProtectors!")
  }
  
  
  getSurgeProtectors(){
    let lengthCircuitBreakers = Object.keys(this.assignedCircuitBreakers).length;
    console.log("*****************START TO GET SURGEPROTECTORS \n circuitBreakers LENGTH: ", lengthCircuitBreakers)
    let count = 0;
    for (let cB in this.assignedCircuitBreakers){      
      //console.log("cB = ", cB)
      let circuitBreaker = this.assignedCircuitBreakers[cB];
      //console.log('circuitBreaker = ',circuitBreaker)
      this.getSurgeProtectorsSub = this.surgeprotectorservice.getSurgeProtector(circuitBreaker.surgeprotector_id)
      .subscribe(surgeProtector => {
        this.assignedSurgeProtectors[cB] = surgeProtector;
        //console.log("FI's für Raum: ", this.surgeProtectors)
        console.log("count vor erhöhung: ", count)
        count ++;
        if(count == lengthCircuitBreakers){
          console.log("last surgeprtector loaded. set loading to false")
          this.loading = false;}
        });      
      }    
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
  
  createAppliance(roomId){
    console.log('should close modal');
    this.child.createAppliance(roomId);
    $('#newApplianceModal').modal('toggle');
    this.modalNew = false;
    setTimeout(()=>{
      this.getAppliances();
    },250);
  }
  
  updateAppliance(){
    this.child.updateAppliance();
    $('#updateApplianceModal').modal('toggle');
    setTimeout(()=>{
      this.getAppliances();
      this.selectedAppliance = null;
    },250);
  }
  
  deleteAppliance(){
    $('#deleteApplianceModal').modal('toggle');
    this.deleteApplianceSub = this.applianceservice.deleteAppliance(this.selectedAppliance.id)
    .subscribe(data=>{
      console.log("successful deleted appliance");
      this.applianceDeleted.emit(this.selectedAppliance.appliancetype_id);
      this.getAppliances();
      this.selectedAppliance = null;
    });
  }
  
  showNewApplianceModal(){
    this.modalNew = true;
    $('#newApplianceModal').modal('toggle');
  }
  
  showUpdateApplianceModal(applianceToUpdate){
    if(!this.selectedAppliance){
      this.selectedAppliance = applianceToUpdate;
      this.selectedApplianceId = applianceToUpdate.id;
      $('#updateApplianceModal').modal('toggle');
    }
  }
  
  showDeleteApplianceModal(applianceToDelete){
    this.selectedAppliance = applianceToDelete;
    $('#deleteApplianceModal').modal('toggle');
    //this.deleteAppliance(applianceId);
  }
    
  onUpdateChangeApplianceId(applianceId: number){
    this.selectedApplianceId = applianceId;
  }
    
  onDismissNewAppliance(){
    this.modalNew = false;
  }

  onDismissUpdateAppliance(){
    this.selectedAppliance = null;
    this.selectedApplianceId = null;
  }

  onDismissDeleteAppliance(){
    this.selectedAppliance = null;
  }

  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
    this.getAppliancesSub.unsubscribe();
    if(this.getSurgeProtectorsSub){
      this.getSurgeProtectorsSub.unsubscribe();
    }
    this.getProjectSub.unsubscribe();
    this.getCircuitBreakersSub.unsubscribe();
    if(this.deleteApplianceSub){
      this.deleteApplianceSub.unsubscribe();
    }
  }
}
