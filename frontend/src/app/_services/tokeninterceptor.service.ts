import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { tap } from '../../../node_modules/rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{
  //private tokenExpired = new BehaviorSubject<boolean>(false);
 //isTokenExpired = this.tokenExpired.asObservable();

  constructor(public auth: AuthenticationService,  private router: Router) { }

/*   tokenIsExpired(expired: boolean){
    this.tokenExpired.next(expired);
  } */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //console.log('!!!!!!!!!!!!!!! intercept started')
    let token = localStorage.getItem("currentUser");
    //console.log("read token from storage:", token);
    request = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
      });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //console.log("successful token authenticated! 'eventdata'= ", event)
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        //console.log("error from server: ", err, "status from error: ", err.status);
        if (err.status === 400) {
          //console.log("Token Expired! status 400 -> ", err.status, "error -> ", err.error)
          // redirect to the login route
          //console.log("should redirect to login next:")
          this.auth.isTokenExpired(true);
          this.router.navigate(['login', { tokenExpired: true}]);
          // or show a modal
        }
        if (err.status === 403) {
          console.log("no success. error from server: ", err.status, err.error)
          // redirect to the login route
          console.log("weitere action erforderlich! chech ob token abgelaufen bzw im local storage?!")
          //this.router.navigate(['login', { tokenExpired: true}]);
          // or show a modal
        }
      }
    }
    )
    );
  }
}
