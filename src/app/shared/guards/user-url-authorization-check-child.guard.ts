import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserUrlAuthorizationCheckService } from '../../helper/user-url-authorization-check.service';

@Injectable({
  providedIn: 'root'
})
export class UserUrlAuthorizationCheckChildGuard implements CanActivateChild {
  constructor(private userUrlAuthCheckService: UserUrlAuthorizationCheckService, private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log(state.url.replace(/\d+/g, ''))

    return this.userUrlAuthCheckService.getUrlPermissionVerify(state.url.replace(/\d+/g, '')).toPromise().then(
      res => {
        return true;
      },
      err => {
        if (err.status == 401) {
          this.router.navigate(['/401']);
          return false;
        }
      }
    );
  }
}