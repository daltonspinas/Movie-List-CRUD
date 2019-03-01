import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  private headers: HttpHeaders;
  // Hide API key as a secret in production
  private apiKey: string = '9cd08027bbf448624620eb7eba83d53d';
  private baseUrl: string = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=`
  private pageUrl: string = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`
  private firstHalf: string = `https://api.themoviedb.org/3/movie/{movie_id}`
  private secondHalf: string = `? api_key = ${this.apiKey}& language=en - US`

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get(query) {
    // Get movie titles based on title
    return this.http.get(this.baseUrl + query, { headers: this.headers });
  }

  public getOne(id) {
    // Get one movie based on id
    return this.http.get(this.firstHalf + id + this.secondHalf, { headers: this.headers });
  }

  public getPage() {
    // Get movie titles based on random page
    let max = 30;
    let page = Math.floor(Math.random() * Math.floor(max));
    return this.http.get(this.pageUrl + page, { headers: this.headers });
  }
}
