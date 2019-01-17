import { Pipe, PipeTransform } from '@angular/core';
import { SurgeprotectorService } from '../_services/surgeprotector.service';

@Pipe({
  name: 'surgeprotectorOfCircuitbreaker'
})
export class SurgeprotectorOfCircuitbreakerPipe implements PipeTransform {

  
  private cachedData: any = null;
  private cachedId = 0;

  constructor(private surgeprotectorservice: SurgeprotectorService){}

  transform(id: number, args?: any): any {
    console.log("in 'SurgeprotectorOfCircuitbreaker'-pipe! mit der ID: ", id)
    if (id !== this.cachedId){
      this.cachedData = null;
      this.cachedId = id;

      this.surgeprotectorservice.getSurgeProtector(id)
      .subscribe(surgeProtector =>{ this.cachedData = surgeProtector.name; console.log('a kloana test: ',surgeProtector)})
      
    }

    return this.cachedData;
  }
}
