import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { SurgeProtector } from '../_models/surgeprotectors';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-circuitbreakerdetails',
  templateUrl: './circuitbreakerdetails.component.html',
  styleUrls: ['./circuitbreakerdetails.component.css']
})
export class CircuitbreakerdetailsComponent implements OnInit, OnDestroy {

  loading: boolean = true;

  @Input()selectedCircuitBreaker: CircuitBreaker = new CircuitBreaker;
  @Output()selectedCircuitBreakerChange = new EventEmitter<CircuitBreaker>();
  @Output()onCircuitBreakerCreated = new EventEmitter<boolean>();
  
  @Input()surgeProtector: SurgeProtector;

  @Input()newCircuitBreaker: boolean;

  //SUBSCRIPTIONS
  updateCircuitBreakerSub: Subscription;
  createCircuitBreakerSub: Subscription;

  constructor(
    private circuitbreakerservice: CircuitbreakerService,
  ) { }

  ngOnInit() {
  }


  updateCircuitBreaker(){
    this.updateCircuitBreakerSub = this.circuitbreakerservice.udpateCircuitBreaker(this.selectedCircuitBreaker)
    .subscribe(circuitBreaker=>{
      console.log("circuitBreaker successful updated!")
      this.selectedCircuitBreakerChange.emit(null)
    })
  }

  createCircuitBreaker(){
    this.createCircuitBreakerSub = this.circuitbreakerservice.createCircuitBreaker(this.selectedCircuitBreaker, this.surgeProtector.id)
    .subscribe(circuitBreaker=>{
      console.log("CircuitBreaker successful created: ", circuitBreaker)
      this.onCircuitBreakerCreated.emit(false);
    })
  }

  ngOnDestroy(){
    if(this.createCircuitBreakerSub){
      this.createCircuitBreakerSub.unsubscribe();
    }
    if(this.updateCircuitBreakerSub){
      this.updateCircuitBreakerSub.unsubscribe();
    }
  }
}
