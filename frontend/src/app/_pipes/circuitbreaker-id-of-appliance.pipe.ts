import { Pipe, PipeTransform } from '@angular/core';
import { CircuitBreaker } from '../_models/circuitbreaker';
import { CircuitbreakerService } from '../_services/circuitbreaker.service';
import { SurgeprotectorService } from '../_services/surgeprotector.service';

@Pipe({
  name: 'circuitbreakerIdOfAppliance',
  pure: false
})
export class CircuitbreakerIdOfAppliancePipe implements PipeTransform {

  private cachedData: any = null;
  private cachedId = 0;

  constructor(private circuitbreakerService: CircuitbreakerService,
  private surgeprotectorService: SurgeprotectorService){}

  transform(id: number, args?: any): any {
    console.log("in pipe with id of BLJKBLKJBÖLKJBÖL", id)
    if (id !== this.cachedId){
      let that = this;
      this.cachedData = null;
      this.cachedId = id;

      this.circuitbreakerService.getCircuitBreaker(id)
      .subscribe(circuitBreaker =>{ 
        console.log("antwort im subscrib: ", circuitBreaker)
        //this.cachedData = circuitBreaker


        this.surgeprotectorService.getSurgeProtector(circuitBreaker.surgeprotector_id)
        .subscribe(surgeProtector => {
          that.cachedData = surgeProtector.name
          console.log("antwort im subscrib: ", surgeProtector)

        })
      })
    }
    console.log("return from circuitbreakerID of Appliance: ",this.cachedData)
    return this.cachedData;
  }
}
