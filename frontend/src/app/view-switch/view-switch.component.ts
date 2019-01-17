import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ViewSwitchService } from '../_services/view-switch.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.css']
})
export class ViewSwitchComponent implements OnInit, OnDestroy {
  
  dashboardView: boolean;

  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;

  constructor(private viewSwitchService: ViewSwitchService) { }

  ngOnInit() {
    this.subcribeViewSwitchService();
  }
  
  subcribeViewSwitchService(){
    this.viewSwitchSub = this.viewSwitchService.isDashboardView().subscribe(data =>{
      this.dashboardView = data;
      console.log('ViewSwitchComponent current Value. IsDashboardView?? -> ',data)
    },
    error =>{
      console.log("Error to get Dashboard-View state: ", error);
    })
  }
  
  onChangeView(){
    this.viewSwitchService.setView(this.dashboardView = !this.dashboardView);
    console.log('change: ',this.dashboardView)
  }
  
  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
  }

}
