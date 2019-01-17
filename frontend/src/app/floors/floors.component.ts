import { Component, OnInit, OnDestroy } from '@angular/core';
import { Floor } from '../_models/floor';
import { Subscription } from '../../../node_modules/rxjs';
import { FloorService } from '../_services/floor.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { ViewSwitchService } from '../_services/view-switch.service';
import { Location } from '../../../node_modules/@angular/common';
import { Project } from '../_models/project';
import { ProjectService } from '../_services/project.service';

declare var $ :any;

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent implements OnInit, OnDestroy {
  selectedProject: Project;
  
  floors: Floor[];
  selectedFloor: Floor;
  lastCollapsedFloor: Floor;
  loading: boolean = false;
  dashboardView: boolean;

  //SORTING
  order: string = 'floor.count_from_basement';
  reverse: boolean = true;

  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;
  getProjectSub: Subscription;
  getFloorSub: Subscription;
  deleteFloorsSub: Subscription;

  constructor(private floorservice: FloorService,
    private router: Router,
    private route: ActivatedRoute,
    private viewSwitchService: ViewSwitchService,
    private projectservice: ProjectService
    ) { }

  ngOnInit() {
    this.loading = true;
    this.subcribeViewSwitchService();
    this.getProject();
    this.getFloors();
    this.onReturnShowRooms();
  }


  getProject(){
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("id for project = ", id)
    this.getProjectSub = this.projectservice.getProject(id)
    .subscribe(project =>{
      console.log('testtest', project);
      
      this.selectedProject = project;
      this.projectservice.changeCurrentProject(this.selectedProject);
      this.loading = false;
    })
  }

  subcribeViewSwitchService(){
    this.viewSwitchSub = this.viewSwitchService.isDashboardView().subscribe(data =>{
      this.dashboardView = data;
      console.log('ProjectComponent current Value. IsDashboardView?? -> ',data)
    },
    error =>{
      console.log("Error to get Dashboard-View state: ", error);
    })
  }

  getFloors(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.floorservice.getAllFloors(id).subscribe(floors =>{
      this.floors = floors;
      console.log(floors)
      this.loading = false;
    })
  }

  onReturnShowRooms(){
    this.route.params.subscribe(params =>{
      console.log("returnparameters in floors-component with floorid :",params)
    })
  }

  getFloorAndShowRooms(floorId){
    this.getFloorSub = this.floorservice.getFloor(floorId).subscribe(floor =>{
      this.selectedFloor = floor;
    })
  }
  
  addFloor(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigate(['main/projects/'+id+'/floors/new']);
    console.log('add a floor')
  }
  
  showRooms(floor){
    if(this.selectedFloor == floor){
      console.log("in")
      this.selectedFloor = null;
    } else{

      this.selectedFloor = floor;
    }
  }

  updateFloor(floor){
    this.router.navigate(['main/floors/'+ floor.id, { project: this.selectedProject.id}]);
    console.log("clicked edit Room with roomId: ", floor.id);
  }

  showDeleteFloorModal(floor){
    this.selectedFloor = floor;
    $('#deleteFloorModal').modal('toggle');
  }

  onDismissDeleteModal(){
    $('#deleteFloorModal').modal('toggle');
    this.selectedFloor = null;
  }

  deleteFloor(){
    this.deleteFloorsSub = this.floorservice.deleteFloor(this.selectedFloor.id)
    .subscribe(data=>{
      console.log("successful deleted Floor!")      
      this.getFloors();
      $('#deleteFloorModal').modal('toggle');
    })
  }

  onRoomActionDone(floor: Floor){
    this.selectedFloor = floor;
  }

  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
    this.getProjectSub.unsubscribe();
    if(this.getFloorSub){
      this.getFloorSub.unsubscribe();
    }
    if(this.deleteFloorsSub){
      this.deleteFloorsSub.unsubscribe();
    }
  }
}
