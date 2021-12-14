import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string = '';
  private jwtToken$: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
  private APIURL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');

    if (fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  // Get all todos
  getAllTodos(): Observable<any> {
    return this.http.get(`${this.APIURL}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  login(username: string, password: string) {
    this.http.post(`${this.APIURL}/auth/login`, {username, password})
      // @ts-ignore
      .subscribe( (res: {token: string}) => {
        this.token = res.token;
        if ( this.token ) {
          this.toast.success('Login successul, redirecting now...', 'Login', {
            timeOut: 700,
            positionClass: 'toast-top-center'
          }).onHidden.toPromise().then( () => {
            this.jwtToken$.next(this.token);
            localStorage.setItem('act', btoa(this.token));
            this.router.navigateByUrl('/').then();
          });
        }
      }, (err: HttpErrorResponse)  => console.log(err.message) );
  }


}
