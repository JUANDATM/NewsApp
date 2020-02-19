import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHealines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) {  }



  getTopHeadlines(){
    return this.http.get<RespuestaTopHealines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0cc2afa1fd334aea8a67da6138b80980`)
  }



}
