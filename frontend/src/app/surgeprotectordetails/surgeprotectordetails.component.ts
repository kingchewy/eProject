import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SurgeProtector } from '../_models/surgeprotectors';
import { SurgeprotectorService } from '../_services/surgeprotector.service';
import { Project } from '../_models/project';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-surgeprotectordetails',
  templateUrl: './surgeprotectordetails.component.html',
  styleUrls: ['./surgeprotectordetails.component.css']
})
export class SurgeprotectordetailsComponent implements OnInit {

  @Input()selectedSurgeProtector: SurgeProtector;

  @Input()newSurgeProtector: boolean;
  @Input()project: Project;
  @Input()projectId: number;
  @Output()onSurgeProtectorAction = new EventEmitter<boolean>();

  //SUBSCRIPTIONS
  createSurgeProtectorSub: Subscription;
  updateSurgeProtectorSub: Subscription;
  deleteSurgeProtectorSub: Subscription;
  
  constructor(
    private surgeprotectorservice: SurgeprotectorService,
  ) { }

  ngOnInit() {
    if(!this.selectedSurgeProtector){
      this.selectedSurgeProtector = new SurgeProtector;
    }
  }

  onDismissNewSurgeProtector(){
    this.onSurgeProtectorAction.emit(false);
  }

  createSurgeProtector(){
    this.createSurgeProtectorSub = this.surgeprotectorservice.createSurgeProtector(this.selectedSurgeProtector, this.project.id)
    .subscribe(surgeProtector=>{
      console.log("surgeProtector successfull created: ", surgeProtector)
      this.onSurgeProtectorAction.emit(false);
    })
  }

  updateSurgeProtector(){
    this.updateSurgeProtectorSub = this.surgeprotectorservice.updateSurgeProtector(this.selectedSurgeProtector)
    .subscribe(surgeProtector =>{
      console.log("updated SurgeProtector: ",surgeProtector)
      this.onSurgeProtectorAction.emit(false);
    })
  }



  ngOnDestroy(){
    if(this.createSurgeProtectorSub){
      this.createSurgeProtectorSub.unsubscribe();
    }
    if(this.updateSurgeProtectorSub){
      this.updateSurgeProtectorSub.unsubscribe();
    }
    if(this.deleteSurgeProtectorSub){
      this.deleteSurgeProtectorSub.unsubscribe();
    }
  }

}
