import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SurgeProtector } from '../_models/surgeprotectors';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { SurgeprotectorService } from '../_services/surgeprotector.service';
import { ProjectService } from '../_services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../_models/project';
import { SurgeprotectordetailsComponent } from '../surgeprotectordetails/surgeprotectordetails.component';

declare var $ :any;

@Component({
  selector: 'app-surgeprotectors',
  templateUrl: './surgeprotectors.component.html',
  styleUrls: ['./surgeprotectors.component.css']
})
export class SurgeprotectorsComponent implements OnInit, OnDestroy {
  @ViewChild(SurgeprotectordetailsComponent) child: SurgeprotectordetailsComponent;
  
  loading: boolean = true;
  activeProject: Project;
  surgeProtectors: SurgeProtector[];
  selectedSurgeProtector: SurgeProtector = new SurgeProtector;

  modalNew: boolean;

  //SUBSCRIPTIONS
  getProjectSub: Subscription;
  getSurgeProtectorsSub: Subscription;
  getCircuitBreakerSub: Subscription;
  deleteSurgeProtectorSub: Subscription;

  constructor(
    private projectservice: ProjectService,
    private surgeprotectorservice: SurgeprotectorService
  ) { }

  ngOnInit() {
    this.getProject();
  }


  getProject(){
    this.getProjectSub = this.projectservice.currentProject.subscribe(project =>{
      this.activeProject = project
      if(!project.id){
        this.projectservice.pushLastKnownActiveProject();
      }
      console.log("projekt = ", project)
      this.getSurgeProtectors();
    });
  }

  getSurgeProtectors(){
    this.getSurgeProtectorsSub = this.surgeprotectorservice.getSurgeProtectors(this.activeProject.id)
    .subscribe(surgeProtectors=>{
      this.surgeProtectors = surgeProtectors;
      console.log("surgeprotectors for project: ",this.surgeProtectors)
      this.loading = false;
    })
  }

  showCircuitBreakers(surgeProtector){
    if(this.selectedSurgeProtector.id == surgeProtector.id){
      this.selectedSurgeProtector = new SurgeProtector;
    } else{
      this.selectedSurgeProtector.id = surgeProtector.id;
    }
  }

  showNewSurgeProtectorModal(){
    this.modalNew = true;
    $('#newSurgeProtectorModal').modal('toggle');
  }

  showUpdateSurgeProtectorModal(surgeProtector){
    this.selectedSurgeProtector = surgeProtector;
    $('#updateSurgeProtectorModal').modal('toggle');
  }

  showDeleteSurgeProtectorModal(surgeProtector){
    this.selectedSurgeProtector = surgeProtector;
    $('#deleteSurgeProtectorModal').modal('toggle');
  }

  onDismissNewSurgeProtector(){
    this.modalNew = false;
  }

  onDismissUpdateModal(){
    this.selectedSurgeProtector = new SurgeProtector;
  }
  
  onDismissDeleteModal(){
    $('#deleteSurgeProtectorModal').modal('toggle');
    this.selectedSurgeProtector = new SurgeProtector;
  }

  createSurgeProtector(){
    this.child.createSurgeProtector();
  }

  updateSurgeProtector(){
    this.child.updateSurgeProtector();
  }

  
  deleteSurgeProtector(){
    this.deleteSurgeProtectorSub = this.surgeprotectorservice.deleteSurgeProtector(this.selectedSurgeProtector.id)
    .subscribe(data=>{
      console.log("successful deleted SurgeProtector!")      
      this.getSurgeProtectors();
      $('#deleteSurgeProtectorModal').modal('toggle');
    })
  }

  afterSurgeProtectorNew(showModal:boolean){
    console.log("method = afterSurgeProtectorAction")
    $('#newSurgeProtectorModal').modal('toggle');
    this.modalNew = showModal;
    this.getSurgeProtectors();
  }

  afterSurgeProtectorUpdate(showModal: boolean){
    $('#updateSurgeProtectorModal').modal('toggle');
    this.selectedSurgeProtector = new SurgeProtector;
    this.getSurgeProtectors();
  }

  refreshSurgeProtectorsView(){
    this.getSurgeProtectors();
  }

  ngOnDestroy(): void {
    this.getProjectSub.unsubscribe();
    this.getSurgeProtectorsSub.unsubscribe();
    if(this.deleteSurgeProtectorSub){
      this.deleteSurgeProtectorSub.unsubscribe();
    }
  }
}
