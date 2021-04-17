import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl =  environment.baseUrl;


  constructor(private http: HttpClient) { }

  login(user:User){
    return this.http.post(this.baseUrl + '/utilisateurs/authentification', user);
  }

  registration(object:any){
    return this.http.post(this.baseUrl+'/utilisateurs',object)

  }

  changePassword(object:any){
    return this.http.post(this.baseUrl+'/utilisateurs/changepassword',object)
  }



}
