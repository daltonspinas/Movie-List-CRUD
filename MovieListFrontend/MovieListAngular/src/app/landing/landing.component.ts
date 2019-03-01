import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../movie-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  private movies: Array<any>;

  constructor(private movieAPIService: MovieAPIService, private router: Router) {
    movieAPIService.getPage().subscribe((data: any) => {
      this.movies = data
      console.log(this.movies)
    });
  }

  ngOnInit() {
  }

  sendTo(id) {
  this.router.navigate([`/single-movie/${id}`])
  }

}
