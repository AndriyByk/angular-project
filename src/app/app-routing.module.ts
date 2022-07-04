import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MoviesPageComponent} from "./pages/movies-page/movies-page.component";
import {MovieDetailsPageComponent} from "./pages/movie-details-page/movie-details-page.component";
import {MovieInfoComponent} from "./pages/movie-info/movie-info.component";

const routes: Routes = [
  {path : '', component: MoviesPageComponent, children :
      [{path: ':id', component: MovieDetailsPageComponent,
        // children: [{path: ':id/details', component: MovieInfoComponent}]
  }]},
  {path: ':id/details', component: MovieInfoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
