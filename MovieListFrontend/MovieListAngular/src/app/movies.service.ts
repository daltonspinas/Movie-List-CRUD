import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class MoviesService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:50484/api/Movies';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public get() {
    // Get all Movie data
    return this.http.get(this.accessPointUrl, { headers: this.headers });

  }

  public getOne(id) {
    // Get one movie
    return this.http.get(this.accessPointUrl + '/' + id, { headers: this.headers });

  }

  public add(payload) {
    return this.http.post(this.accessPointUrl, payload, { headers: this.headers });
  }

  public remove(payload) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, { headers: this.headers });
  }

  public update(payload) {
    console.log(payload)
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, { headers: this.headers });
  }
}
