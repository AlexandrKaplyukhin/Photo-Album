import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token)
  private API_URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) {
    const fetchedToken = localStorage.getItem('act')

    if(fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token)
    }
   }



  get jwtUserToken(): Observable<string>{
    return this.jwtToken$.asObservable();
  }

getAllUsers(): Observable<any>{
  return this.http.get(`${this.API_URL}/auth`, {
    headers:{
      Authorization: `Bearer ${this.token}`
    }
  });
}

login(login: string, password:string){
  this.http.post(`${this.API_URL}/auth/login`, {login, password})
  // @ts-ignore
  .subscribe((res: { token: string }) => {
    this.token = res.token;
    if(this.token){
      this.toast.success('Login successful','', {
        timeOut:600,
        positionClass: 'toast-top-center'
      }).onHidden.toPromise().then(() => {
        this.jwtToken$.next(this.token);
        localStorage.setItem('act',btoa(this.token));
        this.router.navigateByUrl('/').then();
      });
    }
  }, (err: HttpErrorResponse) => console.log(err.message));
}
}
