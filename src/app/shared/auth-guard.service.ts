import { Injectable } from '@angular/core';
import {UserService} from '../shared/user.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _userSvc:UserService,private _router: Router) {
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if(this._userSvc.isLoggedIn && this._userSvc.userInfo.role === "admin")
    {
      return true;
    }else if(this._userSvc.isLoggedIn){
      if(url === "/admin"){
        url = "/";
      }
      this._router.navigate([url]);
    }else{
      this._userSvc.redirectUrl = url;
      this._router.navigate(['/login']);
      return false;
    }
  }
}
