import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppliancetypeService } from '../_services/appliancetype.service';
import { ApplianceType } from '../_models/appliancetype';
import { Subscription } from 'rxjs';

declare var $ :any;

@Component({
  selector: 'app-appliancecategories',
  templateUrl: './appliancecategories.component.html',
  styleUrls: ['./appliancecategories.component.css']
})
export class AppliancecategoriesComponent implements OnInit, OnDestroy {


  loading: boolean = false;
  applianceTypes: ApplianceType[];

  selectedApplianceType: ApplianceType = new ApplianceType;
  updatedApplianceType: ApplianceType = new ApplianceType;

  update: boolean = false;

  //SUBSCRIPTIONS:
  getApplianceTypesSub: Subscription;
  deleteApplianceTypeSub: Subscription;
  updateApplianceTypeSub: Subscription;
  createApplianceTypeSub: Subscription;

  constructor(
    private appliancetypeservice: AppliancetypeService
  ) { }

  ngOnInit() {
    this.getApplianceTypes();
  }

  getApplianceTypes(){
    this.getApplianceTypesSub = this. appliancetypeservice.getApplianceTypes()
    .subscribe(applianceTypes =>{
      console.log("ApplianceTypes loaded: ", applianceTypes)
      this.applianceTypes = applianceTypes;
    });
  }

  // SHOW MODALS
  showNewTypeModal(){
    $('#newApplianceTypeModal').modal('toggle');
  }

  showUpdateTypeModal(type: ApplianceType){
    this.selectedApplianceType = type;
    this.updatedApplianceType.name = this.selectedApplianceType.name;
    this.updatedApplianceType.id = this.selectedApplianceType.id;
    $('#updateApplianceTypeModal').modal('toggle');
  }

  showDeleteTypeModal(type: ApplianceType){
    this.selectedApplianceType = type;
    $('#deleteApplianceTypeModal').modal('toggle');
  }

  // ACTION / REQUEST
  createApplianceType(){
    this.createApplianceTypeSub = this.appliancetypeservice.createApplianceType(this.updatedApplianceType)
    .subscribe(applianceType =>{
      console.log("applianceType successfully created: ", applianceType)
      this.getApplianceTypes();
    });
    $('#newApplianceTypeModal').modal('toggle');
    
  }

  updateApplianceType(){
    this.updateApplianceTypeSub = this.appliancetypeservice.updateApplianceType(this.updatedApplianceType)
    .subscribe(applianceType =>{
      console.log("updated applianceType: ", applianceType)
      this.getApplianceTypes();
    });
    $('#updateApplianceTypeModal').modal('toggle');
    this.selectedApplianceType = new ApplianceType;
  }

  deleteApplianceType(){
    this.deleteApplianceTypeSub = this.appliancetypeservice.deleteApplianceType(this.selectedApplianceType.id)
    .subscribe(data=>{
      console.log("ApplianceType successful deleted!")
      this.getApplianceTypes();
    });
    $('#deleteApplianceTypeModal').modal('toggle');
  }

  // DISMISS
  onDismissNewModal(){
    $('#newApplianceTypeModal').modal('toggle');
  }

  onDismissDeleteModal(){
    this.selectedApplianceType = new ApplianceType;
    $('#deleteApplianceTypeModal').modal('toggle');
  }

  onDismissUpdateModal(){
    this.selectedApplianceType = new ApplianceType;
    this.updatedApplianceType = new ApplianceType;
    $('#updateApplianceTypeModal').modal('toggle');
  }


  ngOnDestroy(): void {
    if(this.deleteApplianceTypeSub){
      this.deleteApplianceTypeSub.unsubscribe();
    }
    if(this.getApplianceTypesSub){
      this.getApplianceTypesSub.unsubscribe();
    }
    if(this.updateApplianceTypeSub){
      this.updateApplianceTypeSub.unsubscribe();
    }
    if(this.createApplianceTypeSub){
      this.createApplianceTypeSub.unsubscribe();
    }
  }
}
