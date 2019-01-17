import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../_models/project';
import { Floor } from '../_models/floor';
import { Room } from '../_models/room';
import { ProjectService } from '../_services/project.service';
import { Subscription, Observable } from '../../../node_modules/rxjs';
import { FloorService } from '../_services/floor.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  isLoggedIn: Observable<boolean>;
  project: Project;
  floor: Floor;
  room: Room;

  //SUBSCRIPTIONS
  projectSub: Subscription;
  floorSub: Subscription;

  constructor(private projectService: ProjectService,
    private floorService: FloorService,
    private authenticationService: AuthenticationService) {
      this.isLoggedIn = authenticationService.isLoggedIn();
     }

  ngOnInit() {
    this.subscribeCurrentProject();
  }

  subscribeCurrentProject(){
    this.projectService.currentProject.subscribe(project => this.project = project);
  }

  subscribeCurrentFloor(){
    this.floorService.currentFloor.subscribe(floor => this.floor = floor);
  }

  ngOnDestroy(){
    this.projectSub.unsubscribe();
    this.floorSub.unsubscribe();
  }
}
