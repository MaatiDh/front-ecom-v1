import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {
  }

  getAllArticles(recherche) {
    return this.http.get(this.baseUrl + '/article?recherche='+recherche);
  }

  postArticles(object: any) {
    return this.http.post(this.baseUrl + '/article/saveAll', object)

  }

  putArticle(id, object: any) {
    return this.http.put(this.baseUrl + '/article/' + id, object)
  }

  deleteArticle(id) {
    return this.http.delete(this.baseUrl + '/article/' + id)
  }


}
