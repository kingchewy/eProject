import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable, Subscription } from '../../../node_modules/rxjs';
import { Project } from '../_models/project';
import { ProjectService } from '../_services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedProject : Project;
  isLoggedIn : Observable<boolean>;
  home: string = "Home";

  //SUBSCRIPTIONS
  currentProjectSub: Subscription;

  constructor(private authenticationService: AuthenticationService,
    private projectservice: ProjectService,
    private router: Router
  ) { 
    this.isLoggedIn = authenticationService.isLoggedIn();
  }

  ngOnInit() {
    console.log("HEADER: current URL Info -> ", this.router.url)
    this.getLastSelectedProject();
    
    this.subcribeCurrentProject();
  }

  subcribeCurrentProject(){    
    this.currentProjectSub = this.projectservice.currentProject.subscribe(project => {
      console.log('REFRESH. Value from Projects BehaviorSubject = ',project)
      this.selectedProject = project
    });
  }

  getLastSelectedProject(){
    if(this.router.url != "main/projects"){
      this.projectservice.pushLastKnownActiveProject();
    }
  }

  updateProjectDetails(){
    this.router.navigate(['/main/projects/'+ this.selectedProject.id]);
  }


  onLogout(){
   this.authenticationService.logout();
  }

  ngOnDestroy(){
    this.currentProjectSub.unsubscribe();
    console.log('header destroyed')
  }
}
