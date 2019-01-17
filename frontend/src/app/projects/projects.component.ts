import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { Router } from '../../../node_modules/@angular/router';
import { ViewSwitchService } from '../_services/view-switch.service';
import { Location } from '../../../node_modules/@angular/common';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[];
  loading: boolean = false;
  dashboardView: boolean;

  //SUBSCRIPTIONS
  viewSwitchSub: Subscription;


  constructor(private projectservice: ProjectService,
    private router: Router,
    private viewSwitchService: ViewSwitchService,
    private location: Location) { }


  ngOnInit() {
    this.subcribeViewSwitchService();
    this.loading = true;
    this.resetCurrentProject();
    this.getProjects();
    
  }
  
  resetCurrentProject(){
    localStorage.removeItem('currentProjectId');
    this.projectservice.changeCurrentProject(new Project);
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

  
  getProjects(){
    this.projectservice.getAllProjects().subscribe(projects =>{
      
      console.log('HTTP call is success from component: ', projects );
      this.projects = projects;
      this.loading = false;
      console.log('projects: ',this.projects,' view: ',this.dashboardView);
    }, (error) =>{
      console.log('Http call failed from component', error);
    })
  }

  onSelectProject(project){
    console.log('id = ', project.id)
    this.projectservice.changeCurrentProject(project);
    this.router.navigate(['main/projects/' + project.id + '/floors']);
  }

  updateProject(project){
    this.router.navigate(['main/projects/' + project.id]);
  }

  ngOnDestroy(){
    this.viewSwitchSub.unsubscribe();
  }

}
