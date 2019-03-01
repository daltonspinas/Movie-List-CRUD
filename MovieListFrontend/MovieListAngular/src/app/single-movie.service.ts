import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieService {

  private headers: HttpHeaders;
  // Hide API key as a secret in production
  private apiKey: string = '9cd08027bbf448624620eb7eba83d53d';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get(id) {
    // Get a single movie
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`
    return this.http.get(url, { headers: this.headers });

  }
}
