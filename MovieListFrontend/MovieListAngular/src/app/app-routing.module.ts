import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import {SingleMovieComponent} from './single-movie/single-movie.component'
import { OneListComponent } from './one-list/one-list.component';
import { AddListFormComponent } from './add-list-form/add-list-form.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [{ path: 'list-view', component: ListViewComponent },
  { path: 'single-movie/:id', component: SingleMovieComponent }, { path: 'one-list/:id', component: OneListComponent },
  { path: 'add-list-form', component: AddListFormComponent }, { path: '', component: LandingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
