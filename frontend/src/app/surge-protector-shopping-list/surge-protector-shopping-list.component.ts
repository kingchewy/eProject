import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SurgeProtector } from '../_models/surgeprotectors';
import { Subscription } from 'rxjs';
import { SurgeprotectorService } from '../_services/surgeprotector.service';
import { Project } from '../_models/project';

@Component({
  selector: 'app-surge-protector-shopping-list',
  templateUrl: './surge-protector-shopping-list.component.html',
  styleUrls: ['./surge-protector-shopping-list.component.css']
})
export class SurgeProtectorShoppingListComponent implements OnInit, OnDestroy {

  @Input() project: Project;
  @Input() show: boolean;
  @Output() onSurgeProtectorsReady =  new EventEmitter<SurgeProtector[]>();

  surgeProtectors: SurgeProtector[];
  surgeProtectorsGrouped: Object[];

  //SUBSCRIPTIONS:  
  getSurgeProtectorsSub: Subscription;

  constructor( private surgeprotectorservice: SurgeprotectorService) { }

  ngOnInit() {
    this.getSurgeProtectors();
  }

  getSurgeProtectors(){
    this.getSurgeProtectorsSub = this.surgeprotectorservice.getSurgeProtectors(this.project.id)
    .subscribe(surgeProtectors =>{
      this.surgeProtectors = surgeProtectors;
      console.log("all surgeprotectors for project: ", this.surgeProtectors)
      if(surgeProtectors !== undefined || surgeProtectors.length !== 0){
        this.setSurgeProtectorsGrouped();
      } else{
        this.onSurgeProtectorsReady.emit(null);
      }
    });
  }
  
  setSurgeProtectorsGrouped(){
    let sPGrouped: any[];

    this.surgeProtectors.forEach(element => {
      let poles = element.number_of_poles;
      let amperage = element.amperage;
      let release_current = element.release_current;

      let isTwice: boolean = false;

      if(sPGrouped === undefined){
        sPGrouped = [];
      }

      for(let i = 0; i < sPGrouped.length; i++){
        if(sPGrouped[i].number_of_poles == poles 
            && sPGrouped[i].amperage == amperage 
            && sPGrouped[i].release_current == release_current){
              sPGrouped[i].count += 1;
              isTwice = true;
          }
      }

      if(!isTwice){
        let newGroup = {count: 1, 
                        number_of_poles: poles, 
                        amperage: amperage, 
                        release_current: release_current
                      };
        sPGrouped.push(newGroup);
      }
    });

    this.surgeProtectorsGrouped = sPGrouped;
    console.log("grouped sPs: ", sPGrouped)
    this.onSurgeProtectorsReady.emit(this.surgeProtectors);
  }  
  

  ngOnDestroy(){
    this.getSurgeProtectorsSub.unsubscribe();
  }
}
