import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import {MovieListsService} from './movie-lists.service'
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { OneListComponent } from './one-list/one-list.component';
import { AddListFormComponent } from './add-list-form/add-list-form.component';
import { MoviesService } from './movies.service';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    SearchBarComponent,
    SingleMovieComponent,
    NavbarComponent,
    OneListComponent,
    AddListFormComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    
  ],
  providers: [MovieListsService, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
