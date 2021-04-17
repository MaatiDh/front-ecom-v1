import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean;

  constructor(private readonly router: Router) {
    this.checkAuthentication();
   }

  isLoggedIn(): boolean  {
    if(localStorage.getItem("ROLE_CLIENT"))
      return true
    else
      return false;
  }

   checkAuthentication(): void {
    const token: string = localStorage.getItem(environment.TOKEN_NAME);
    const role: string[] = localStorage.getItem(environment.ROLE) &&
      JSON.parse(localStorage.getItem(environment.ROLE));
    const userId: string = localStorage.getItem('ROLE_CLIENT');
    token ? this.signIn(userId, token, role) : this.signOut();
  }

  signIn(userId: string, token: string, role: string[]): void {
    localStorage.setItem(environment.TOKEN_NAME, token);
    localStorage.setItem(environment.ROLE, JSON.stringify(role));
    localStorage.setItem("ROLE_CLIENT", userId);
    this.loggedIn= true;

  }
  signOut(): void {
    localStorage.removeItem(environment.TOKEN_NAME);
    localStorage.removeItem(environment.ROLE);
    localStorage.removeItem("ROLE_CLIENT");
    this.loggedIn=false;
    this.router.navigate(['']);
  }

}
