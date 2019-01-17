import { Pipe, PipeTransform } from '@angular/core';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';

@Pipe({
  name: 'circuitbreakerOfAppliance',
  pure: false
})
export class CircuitbreakerOfAppliancePipe implements PipeTransform {

  circuitBreaker: CircuitBreaker;

  private cachedData: any = null;
  private cachedId = 0;

  constructor(private circuitbreakerService: CircuitbreakerService){}

  transform(id: number, args?: any): any {
    console.log("in pipe")
    if (id !== this.cachedId){
      this.cachedData = null;
      this.cachedId = id;

      this.circuitbreakerService.getCircuitBreaker(id)
      .subscribe(circuitBreaker =>{ this.cachedData = circuitBreaker.name})
    }
   // console.log("return bevor return",this.cachedData)
    return this.cachedData;
  }

}
