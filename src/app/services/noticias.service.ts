import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHealines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinespaage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {  }

private ejecutarQuery<T>(query: string) {
  query = apiUrl + query;

  return this.http.get(query, {headers});
}

  getTopHeadlines() {
    this.headlinespaage ++;
   // return this.http.get<RespuestaTopHealines>(`/top-headlines?country=us&category=business&apiKey=0cc2afa1fd334aea8a67da6138b80980`)
    return this.ejecutarQuery<RespuestaTopHealines>(`/top-headlines?country=mx&page=${this.headlinespaage}`);
  }
  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
  //  return this.http.get(`/top-headlines?country=de&category=business&apiKey=0cc2afa1fd334aea8a67da6138b80980`);
    return this.ejecutarQuery<RespuestaTopHealines>(`/top-headlines?country=mx&category=${categoria}&pages=${this.categoriaPage}`);
  }



}
