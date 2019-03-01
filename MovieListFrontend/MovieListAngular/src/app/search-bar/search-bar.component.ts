import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../movie-api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent implements OnInit {

  private searchString: string = ''
  private movies: any;
 
  constructor(private movieAPIService: MovieAPIService, private router: Router) {
  
   
  }

  ngOnInit() {
  }

  setString(evt) {
    this.searchString = evt;
    if (this.searchString.length >= 3) {
      this.fetchTitles(this.searchString);
    }
  }

  fetchTitles() {
    this.movieAPIService.get(this.searchString).subscribe((data: any) => {
      this.movies = data.results.slice(0, 5);
    });
  }

  goToMovie() {
    this.fetchTitles(this.searchString);
    let id = this.movies[0].id
    this.router.navigate([`/single-movie/${id}`])
  }


}
