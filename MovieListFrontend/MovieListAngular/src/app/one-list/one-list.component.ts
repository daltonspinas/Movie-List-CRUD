import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieListsService } from '../movie-lists.service';
import {MoviesService} from '../movies.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MovieAPIService } from '../movie-api.service';


@Component({
  selector: 'app-one-list',
  templateUrl: './one-list.component.html',
  styleUrls: ['./one-list.component.css']
})
export class OneListComponent implements OnInit {
  public movies: Array<any>;
  public singleList: any;
  public newListName: string;
  public id: number;

  constructor(private movieListsService: MovieListsService, private movieAPIService: MovieAPIService, private route: ActivatedRoute, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.movieListsService.getOne(this.id).subscribe((data: any) => {
      this.singleList = data;
      console.log(this.singleList.movies[0])
    });
  }

  ngOnInit() {
  }


  async deleteList() {
   await this.movieListsService.remove(this.singleList).subscribe();
    this.router.navigate(['/list-view']);
  }

  setName(evt) {
    this.newListName = evt;
  }

   async deleteMovie(movie) {
   await this.movieListsService.removeMovie(this.singleList.id, movie).subscribe();
   await  this.movieListsService.getOne(this.id).subscribe((data: any) => {
       this.singleList = data;
     });
  }

  renameList(name) {
    this.singleList.name = name;
    this.updateList(this.singleList);
    this.newListName = ''
  }

  updateList(newList) {
    this.movieListsService.update(newList).subscribe();
  }
}
