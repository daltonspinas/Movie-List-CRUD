import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// might need this vvv
//@Injectable({
//  providedIn: 'root'
//})

@Injectable()
export class MovieListsService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:50484/api/MovieLists';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get() {
    // Get all MovieList data
    return this.http.get(this.accessPointUrl, { headers: this.headers });
  }

  public getOne(id) {
    // Get a single MovieList
    return this.http.get(this.accessPointUrl + '/' + id, { headers: this.headers });
  }

  public add(payload) {
    return this.http.post(this.accessPointUrl, payload, { headers: this.headers });
  }

  public addMovie(movieListId, payload) {
    return this.http.put(this.accessPointUrl + '/' + movieListId + '/add-movie', payload, { headers: this.headers });
  }

  public removeMovie(movieListId, payload) {
    return this.http.put(this.accessPointUrl + '/' + movieListId + '/remove-movie', payload, { headers: this.headers });
  }

  public remove(payload) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, { headers: this.headers });
  }

  public update(payload) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, { headers: this.headers });
  }
}
