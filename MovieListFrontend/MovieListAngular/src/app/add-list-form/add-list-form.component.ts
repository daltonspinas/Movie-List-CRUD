import { Component, OnInit } from '@angular/core';
import { MovieListsService } from '../movie-lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list-form',
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.css']
})
export class AddListFormComponent implements OnInit {
  public listName: string;
  constructor(private movieListsService: MovieListsService, private router: Router) {
    
  }

  ngOnInit() {
  }

  setListName(evt) {
    this.listName = evt;
  }

  createList() {
                                                      //need to have the subscribe to work!
    this.movieListsService.add({ name: this.listName }).subscribe()
    this.sendTo()
  }

  sendTo() {
    this.router.navigate([`/list-view`])
  }
}
