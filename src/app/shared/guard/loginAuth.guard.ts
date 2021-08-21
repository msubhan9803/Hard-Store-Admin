import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private router: Router) {


  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('EST_Token') != null) {
      if (!this.tokenExpired(localStorage.getItem('EST_Token'))) {
        this.router.navigate(['/dashboard/default']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }
}
