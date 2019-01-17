import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    private tokenExpiredSource = new BehaviorSubject<boolean>(false);
    tokenExpired = this.tokenExpiredSource.asObservable();

    constructor(private http: HttpClient, private router: Router,) { }
    
    isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable()
      }
  
    login(email: string, password: string) {
        return this.http.post<any>('http://localhost/auth/login', { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    console.log(user.token);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.token);
                    this.isLoginSubject.next(true);
                }
                return user;
            }));
      }
  
      logout() : void{
          // remove user from local storage to log user out
          localStorage.removeItem('currentUser');
          this.isLoginSubject.next(false);
          console.log("before login routing: ")
          this.router.navigate(['/login']);
      }
  
      isTokenExpired(bool){
        this.tokenExpiredSource.next(bool);
      }

      private hasToken() : boolean{
        return !!localStorage.getItem('currentUser')
      }

    
}