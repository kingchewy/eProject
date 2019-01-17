import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { FloorService } from '../_services/floor.service';
import { Location } from '../../../node_modules/@angular/common';
import { Floor } from '../_models/floor';

@Component({
  selector: 'app-floordetails',
  templateUrl: './floordetails.component.html',
  styleUrls: ['./floordetails.component.css']
})
export class FloordetailsComponent implements OnInit, OnDestroy {
  floor: Floor = new Floor;
  floorId: number;

  loading: boolean = false;
  newFloor: boolean = true;


  //SUBSCRIPTIONS
  createFloorSub: Subscription;
  getFloorSub: Subscription;
  updateFloorSub: Subscription;

  constructor(private route: ActivatedRoute,
    private floorservice: FloorService,
    private location: Location) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('floorid')){
      this.newFloor = false;
      this.floorId = +this.route.snapshot.paramMap.get('floorid');
      this.getFloorToEdit();
    }
    console.log("onInit floordetails. FloorId= ", this.route.snapshot.paramMap.get('floorid'))
  }

  getFloorToEdit(){
    this.loading = true;
    this.getFloorSub = this.floorservice.getFloor(this.floorId)
    .subscribe(floor =>{
      console.log('testtest', floor);
      
      this.floor = floor;
      this.loading = false;
    })
  }

  createFloor(){
    const projectId = this.route.snapshot.paramMap.get('projectid');
    console.log(this.floor.name, this.floor.count_from_basement)

    this.createFloorSub = this.floorservice.createFloor(this.floor, projectId)
    .subscribe(floor =>{
      console.log('floor successful created: ', floor)
      this.location.back();
    },
    error =>{
      console.log('error creating new floor: ',error)
    });
  }

  updateFloor(){
    this.updateFloorSub = this.floorservice.updateFloor(this.floor, this.floor.id).subscribe(floor =>{
      console.log('successful update floor')
      this.location.back();
    })
  }

  goBack() {
    // window.history.back();
    this.location.back();
  }

  ngOnDestroy(){
    if(this.getFloorSub){
      this.getFloorSub.unsubscribe();
    }
    if(this.createFloorSub){
      this.createFloorSub.unsubscribe();
    }
    if(this.updateFloorSub){
      this.updateFloorSub.unsubscribe();
    }
  }
}
