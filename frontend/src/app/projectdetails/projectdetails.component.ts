import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from '../_models/project';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ProjectService } from '../_services/project.service';
import { Location } from '../../../node_modules/@angular/common';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit, OnDestroy {
  @Input() project: Project = new Project;
  loading: boolean = false;
  newProject: boolean = true;

  //SUBSCRIPTIONS
  getProjectSub: Subscription;
  createProjectSub: Subscription;
  updateProjectSub: Subscription;

  constructor(private route: ActivatedRoute,
              private projectservice: ProjectService,
            private location: Location) { }

  ngOnInit() {
    console.log('in ngOnInit', this.route.snapshot.paramMap.get('id'));
    if(this.route.snapshot.paramMap.get('id')){
      this.newProject = false;
      this.getProjectToEdit();
      }
  }

  getProjectToEdit(){
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProjectSub = this.projectservice.getProject(id)
    .subscribe(project =>{
      console.log('testtest', project);
      
      this.project = project;
      this.loading = false;
    })
  }

  goBack() {
    this.location.back();
  }

  createProject(){
    this.createProjectSub = this.projectservice.createProject(this.project)
    .subscribe(project =>{
      console.log('project successful created: ',project)
      this.location.back();
    },
    error =>{
      console.log('error creating new project: ',error)
    });
  }

  updateProject(){
    this.updateProjectSub = this.projectservice.updateProject(this.project)
    .subscribe(project =>{
      console.log('project successful updated: ', project)
      this.location.back();
    })
  }

  ngOnDestroy(){
    if(this.getProjectSub){
      this.getProjectSub.unsubscribe();
    }
    if(this.createProjectSub){
      this.createProjectSub.unsubscribe();
    }
    if(this.updateProjectSub){
      this.updateProjectSub.unsubscribe();
    }
  }
  
}
