import { Component, OnInit } from '@angular/core';
import { MovieListsService } from '../movie-lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  public movieLists: Array<any>;

  constructor(private movieListsService: MovieListsService, private router: Router) {
    movieListsService.get().subscribe((data: any) => {
      this.movieLists = data;
      return this.movieLists
    });
  }

  ngOnInit() {
   
  }


  sendTo(path) {
    this.router.navigate([`${path}`])
  }

}
