import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitchService {
  isDashboardViewSubject = new BehaviorSubject<boolean>(this.hasDashboardView());

  constructor() { }

  isDashboardView() : Observable<boolean>{
    return this.isDashboardViewSubject.asObservable()
  }

  setView(view) : void{
    
    switch(view){
      case true:{
        localStorage.setItem('view', 'dashboard');
        this.isDashboardViewSubject.next(true);
        console.log('case true')
        break;
      }
      case false:{
        localStorage.setItem('view', 'list');
        this.isDashboardViewSubject.next(false);
        console.log('case false')
        break;
      }
      default:{
        console.log("View value not 'list' or 'dashboard'");
        break;
      }
    }
  }

  private hasDashboardView(): boolean{
    let isDashboardView: boolean;
    let currentView = localStorage.getItem('view');
    console.log('localstorage set???????', currentView)

    switch(currentView){
      case "dashboard":{
        isDashboardView = true;
        break;
      }
      case "list":{
        isDashboardView = false;
        break;
      }
      default:{ //default value if not set in localstorage = true (dashboardview on)
        isDashboardView = true;
        break;
        }
    }

    return isDashboardView
  }
}
