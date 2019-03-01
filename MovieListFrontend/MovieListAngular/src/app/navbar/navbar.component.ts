import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListsService } from '../movie-lists.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public movieLists: Array<any>;

  constructor(private movieListsService: MovieListsService, private router: Router) {
    movieListsService.get().subscribe((data: any) => {
      return this.movieLists = data;
    });
  }
  
  ngOnInit() {
  }

  sendTo(path) {
    this.router.navigate([`${path}`])
  }
}
