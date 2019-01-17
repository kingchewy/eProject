import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SurgeProtector } from '../_models/surgeprotectors';
import { Subscription } from 'rxjs';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';

@Component({
  selector: 'app-circuit-breaker-shopping-list',
  templateUrl: './circuit-breaker-shopping-list.component.html',
  styleUrls: ['./circuit-breaker-shopping-list.component.css']
})
export class CircuitBreakerShoppingListComponent implements OnInit, OnDestroy {

  @Input() surgeProtectors: SurgeProtector[];
  @Input() show: boolean;
  @Output() onCircuitBreakersReady = new EventEmitter<boolean>();
  
  circuitBreakersGrouped: any[] = [];
  numberOfRuns: number = 0;
  

  //SUBSCRIPTIONS
  getCircuitBreakersSub: Subscription;

  constructor(private circuitbreakerservice: CircuitbreakerService
  ) { }

  ngOnInit() {
    this.getCircuitBreakersForSurgeProtectors();
    console.log("surgeprotectors onINIT: ",this.surgeProtectors)
  }

  getCircuitBreakersForSurgeProtectors(){
    this.surgeProtectors.forEach(surgeProtector => {
      this.getCircuitBreakers(surgeProtector);
    });
  }

  getCircuitBreakers(surgeProtector){
    this.getCircuitBreakersSub = this.circuitbreakerservice.getCircuitBreakers(surgeProtector.id)
    .subscribe(circuitbreakers =>{
      this.setCircuitBreakersGrouped(circuitbreakers);
      this.checkLoadingFinished();
    });
  }

  checkLoadingFinished(){
    this.numberOfRuns += 1;
    console.log("run nr. ", this.numberOfRuns, "of: ",this.surgeProtectors.length)
    if(this.numberOfRuns === this.surgeProtectors.length){
      this.onCircuitBreakersReady.emit(true);
    }
  }

  setCircuitBreakersGrouped(circuitBreakers){
    
    circuitBreakers.forEach(circuitBreaker =>{
      let poles = circuitBreaker.number_of_poles;
      let amperage = circuitBreaker.amperage;
      let tripping_characteristic = circuitBreaker.tripping_characteristic;

      let isTwice: boolean = false;

      for(let i = 0; i < this.circuitBreakersGrouped.length; i++){
        if(this.circuitBreakersGrouped[i].number_of_poles == poles
            && this.circuitBreakersGrouped[i].amperage == amperage
            && this.circuitBreakersGrouped[i].tripping_characteristic == tripping_characteristic){
              this.circuitBreakersGrouped[i].count += 1;
              isTwice = true;
            }
      }

      if(!isTwice){
        let newGroup = {count: 1,
                        number_of_poles: poles,
                        amperage: amperage,
                        tripping_characteristic: tripping_characteristic
                      };
        this.circuitBreakersGrouped.push(newGroup);
      }
    });       
  }

  ngOnDestroy(){
    if(this.getCircuitBreakersSub){
      this.getCircuitBreakersSub.unsubscribe();
    }
  }
}
