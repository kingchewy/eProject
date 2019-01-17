import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from '../../../node_modules/rxjs';
import { Project } from '../_models/project';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnDestroy{

  private projectSource = new BehaviorSubject<Project>(new Project);
  currentProject = this.projectSource.asObservable();

  private baseUrl: string = environment.baseUrl;
  private url: string = this.baseUrl + 'projects';


  //SUBSCRIPTIONS
  private currentProjectSub: Subscription;
  private getProjectSub: Subscription;

  constructor(private http: HttpClient) { 
    this.pushLastKnownActiveProject();
  }

/*   getAllProjects(){
    console.log("getProjects methode, vor http request:")
    return this.http.get('http://lumen.test/projects');
  } */

  changeCurrentProject(project: Project){
    this.projectSource.next(project);

    if(project.id){
      let projectId = project.id;
      localStorage.setItem("currentProjectId", projectId.toString());
    }
  }

  pushLastKnownActiveProject(){
    this.currentProjectSub = this.currentProject.subscribe(project =>{
      console.log("project in behaviourSubject = ",project)
      if(!project.id){
        this.getProjectFromLocalStorage();
      }
    }); 
  }

  private getProjectFromLocalStorage(){
    if(localStorage.getItem('currentProjectId')){
      let projectId = +localStorage.getItem('currentProjectId');

        this.getProjectSub = this.getProject(projectId).subscribe(projectData =>{
          this.changeCurrentProject(projectData);        
        } 
      )};
  }

  getAllProjects(): Observable<Project[]>{
    console.log("getProjects methode, vor http request:")

    return this.http.get<Project[]>(this.url)
  }

  getProject(id: number): Observable<Project>{
    //const url ='/${this.url}/${id}';
    const url = this.url + '/' + id;
    return this.http.get<Project>(url)

    //return this.http.get(this.url+'/'+id);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<Project>(this.url + '/' + project.id, project);
  }

  deleteProject(){

  }

  ngOnDestroy(){
    if(this.currentProjectSub){
      this.currentProjectSub.unsubscribe();
    }
    if(this.getProjectSub){
      this.getProjectSub.unsubscribe();
    }
  }

}
