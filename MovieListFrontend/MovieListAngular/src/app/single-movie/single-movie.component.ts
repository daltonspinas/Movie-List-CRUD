import { Component, OnInit } from '@angular/core';
import { SingleMovieService } from '../single-movie.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { MovieListsService } from '../movie-lists.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {

  public movieLists: Array<any>
  public movie: any;
  private id: string = '';

  constructor(private singleMovieService: SingleMovieService, private route: ActivatedRoute, private router: Router, private movieListsService: MovieListsService) {
    // forces component to update when url/route changes
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    movieListsService.get().subscribe((data: any) => {
      this.movieLists = data;
      return this.movieLists
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchMovie(this.id)
  }


  fetchMovie(id) {
    this.singleMovieService.get(id).subscribe((data: any) => {
      this.movie = data;
      this.movie.poster_path = `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
    });
  }

  createMovie(movie) {
    const strippedMovie = { title: movie.title, plot: movie.overview, poster: movie.poster_path }
    return strippedMovie;
    
  }


  addMovie(movie) {
    const listId = <HTMLSelectElement>document.getElementById("select-list")
    const id = Number(listId.selectedOptions[0].value);
    const oneList = this.movieLists.filter(el => el.id === id)[0];
    this.movieListsService.addMovie(id, this.createMovie(movie)).subscribe();
    this.router.navigate(['/list-view'])

  }


  addToList(movie) {
    // What should this id be? MovieListId
    const listId = <HTMLSelectElement>document.getElementById("select-list")
    const id =  Number(listId.selectedOptions[0].value);
    //we have captured the id for the list we want to add the movie to
 
    const oneList = this.movieLists.filter(el => el.id === id)[0];
    this.movieListsService.remove(oneList)
    oneList.movies.push(this.createMovie(movie));
    this.movieListsService.add({name: oneList.name, movies: oneList.movies}).subscribe()
   
    
  }

}
