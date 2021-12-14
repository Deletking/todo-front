import { ApiService } from './../services/api.services';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private apiservice: ApiService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiservice.jwtUserToken.pipe(
      map( (result) => !!result),
      tap( (result) => {
        if(!result) {
          this.router.navigateByUrl('/login').then();
          return result;
        }
        return result;
      })
    );
  }
}
