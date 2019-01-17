import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SurgeProtector } from '../_models/surgeprotectors';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { Subscription } from 'rxjs';
import { ViewSwitchService } from '../_services/view-switch.service';
import { CircuitbreakerdetailsComponent } from '../circuitbreakerdetails/circuitbreakerdetails.component';

declare var $ :any;

@Component({
  selector: 'app-circuitbreakers',
  templateUrl: './circuitbreakers.component.html',
  styleUrls: ['./circuitbreakers.component.css']
})
export class CircuitbreakersComponent implements OnInit {
  @ViewChild(CircuitbreakerdetailsComponent) child: CircuitbreakerdetailsComponent;

  @Input()surgeProtector: SurgeProtector;

  circuitBreakers: CircuitBreaker[];
  selectedCircuitBreaker: CircuitBreaker;

  loading: boolean = true;
  dashboardView: boolean;
  newModal: boolean;
  deleteModal: boolean;

  //SUBSCRIPTIONS
  getCircuitBreakersSub: Subscription;
  viewSwitchSub: Subscription;
  createCircuitBreakerSub: Subscription;
  deleteCircuitBreakerSub: Subscription;

  constructor(
    private circuitbreakerservice: CircuitbreakerService,
    private viewSwitchService: ViewSwitchService,
  ) { }

  ngOnInit() {
    this.subscribeViewSwitchService();
    this.getCircuitBreakers();
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

  getCircuitBreakers(){
    this.getCircuitBreakersSub = this.circuitbreakerservice.getCircuitBreakers(this.surgeProtector.id)
    .subscribe(circuitBreakers=>{
      this.circuitBreakers = circuitBreakers;
      this.loading = false;
    })
  }

  
  /* ********** M O D A L S *************/
  // UPDATE
  showUpdateCircuitBreakerModal(circuitBreaker){
    if(!this.deleteModal){
    this.selectedCircuitBreaker = circuitBreaker;
    $('#updateCircuitBreakerModal').modal('toggle');
    }
  }
  
  updateCircuitBreaker(){
    this.child.updateCircuitBreaker();
    $('#updateCircuitBreakerModal').modal('toggle');

  }
  
  onDismissUpdateCircuitBreaker(){
    this.selectedCircuitBreaker = null;
    $('#updateCircuitBreakerModal').modal('toggle');
  }
  
  onUpdateSelectedCircuitBreaker(selectedCircuitBreaker){
    console.log("emitted value on Update circuit breaker: ",selectedCircuitBreaker)
    //should be NULL as emitted selectedCircuitBreaker value
    this.selectedCircuitBreaker = selectedCircuitBreaker;
  }
  

  // CREATE / NEW
  showNewCircuitBreakerModal(){
    this.newModal = true;
    $('#newCircuitBreakerModal').modal('toggle');
  }

  createCircuitBreaker(){
    this.child.createCircuitBreaker();
    $('#newCircuitBreakerModal').modal('toggle');
  }
  
  onDismissNewCircuitBreaker(){
    this.newModal = false;
    $('#newCircuitBreakerModal').modal('toggle');
  }

  onCircuitBreakerCreated(showModal: boolean){
    this.newModal = showModal;
    this.getCircuitBreakers();
  }
   


  // DELETE
  showDeleteCircuitBreakerModal(circuitbreaker){
    this.deleteModal = true;
    this.selectedCircuitBreaker = circuitbreaker;
    $('#deleteCircuitBreakerModal').modal('toggle');
  }

  deleteCircuitBreaker(){
    this.deleteCircuitBreakerSub = this.circuitbreakerservice.deleteCircuitBreaker(this.selectedCircuitBreaker.id)
    .subscribe(data=>{
      console.log("CircuitBreaker successful deleted: ", data)
      this.getCircuitBreakers();
    })
    $('#deleteCircuitBreakerModal').modal('toggle');
    this.selectedCircuitBreaker = null;
    this.deleteModal = false;
  }

  onDismissDeleteCircuitBreaker(){
    this.selectedCircuitBreaker = null;
    this.deleteModal = false;
    $('#deleteCircuitBreakerModal').modal('toggle');
  }

f
  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
    this.getCircuitBreakersSub.unsubscribe();
    if(this.createCircuitBreakerSub){
      this.createCircuitBreakerSub.unsubscribe();
    }
    if(this.deleteCircuitBreakerSub){
      this.deleteCircuitBreakerSub.unsubscribe();
    }
  }

}
