import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) { }


  canActivate(route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot){

    const authenticated: boolean = this.auth.isLoggedIn();

    if (authenticated) {

      // check if route is restricted by role
      if (route.data.roles) {
        const roles = localStorage.getItem(environment.ROLE) && JSON.parse(localStorage.getItem(environment.ROLE));
        let found = false;
        roles && roles.forEach(element => {
          if (route.data.roles.indexOf(element) > -1) {
            found = true;
          }
        });
        if (!found) {
          // role not authorised so redirect to home page

          if (roles.indexOf("ROLE_ADMINISTRATEUR") > -1) {
            this.router.navigate(['/products']);
            return false;
          }

          else if (roles.indexOf("ROLE_CLIENT") > -1) {
            this.router.navigate(['/artilces']);
            return false;
          }

          else {
            this.router.navigate(['/']);
            return false;
          }
        }
      }

      // authorised so return true
      return true;
    }


    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;

  }

}
